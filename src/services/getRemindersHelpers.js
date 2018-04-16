const { map, padStart, flatten } = require('lodash');

function createDate(startDate, months, years) {
  const date = new Date(startDate);
  date.setMonth(date.getMonth() + months);
  date.setFullYear(date.getFullYear() + years);
  return formatDate(date);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${padStart(month, 2, 0)}-${padStart(day, 2, 0)}`;
}

function getDates(startDate, IN_FUTURE = false) {
  const d = IN_FUTURE ? 1 : -1;
  return [
    createDate(startDate, d * 3, 0), // 3 months
    createDate(startDate, d * 5, 0), // 5 months
    createDate(startDate, d * 12, 0), // 12 months
    createDate(startDate, d * 15, 0), // 15 months
    createDate(startDate, 0, d * 4), // 4 years
    createDate(startDate, 0, d * 5), // 5 years
    createDate(startDate, 0, d * 12) // 12 years
  ];
}

function formatReminders(snapshotValue) {
  const emailReminders = flatten(
    map(snapshotValue, reminder =>
      map(reminder.emails, email => {
        return Object.assign({}, reminder, { email });
      })
    )
  );
  return emailReminders;
}

function getRemindersByDate(date, admin) {
  return admin
    .database()
    .ref('/reminders')
    .orderByChild('dateOfBirth')
    .equalTo(date)
    .once('value')
    .then(res => formatReminders(res.val()));
}

function formatMessage(reminder, groupId) {
  return `Dette er en påmindelse om, at dit barn ${
    reminder.name
  } snart skal have sin (${groupId}) vaccination. ${reminder.email}`;
}

function getReminderMessages(startDate, admin) {
  const promises = getDates(startDate).map(date =>
    getRemindersByDate(date, admin)
  );
  return Promise.all(promises)
    .then(groups => {
      return groups.map((group, groupId) => {
        return group.map(reminder => formatMessage(reminder, groupId));
      });
    })
    .catch(e => {
      console.log(e);
    });
}

module.exports = {
  getReminderMessages,
  formatReminders,
  getDates
};
