const { map, padStart, flatten } = require('lodash');

const vaccinationTitles = [
  '3 måneder',
  '5 måneder',
  '12 måneder',
  '15 måneder',
  '4 år',
  '5 år',
  '12 år'
];

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

function formatEmail(reminder, groupId) {
  return {
    subject: `Påmindelse om vaccination af ${reminder.name}`,
    email: reminder.email,
    message: `Dette er en påmindelse om, at dit barn ${
      reminder.name
    } skal have sin ${
      vaccinationTitles[groupId]
    }s vaccination. Du skal selv bestille tid hos lægen. Læs mere på https://www.sundhed.dk/borger/patienthaandbogen/boern/undersoegelser/boerneundersoegelser/
Med venlig hilsen BørnePåmindelser.dk`
  };
}

function getEmailsToSend(startDate, admin) {
  const promises = getDates(startDate).map(date =>
    getRemindersByDate(date, admin)
  );
  return Promise.all(promises)
    .then(groups => {
      return flatten(
        groups.map((group, groupId) => {
          return group.map(reminder => formatEmail(reminder, groupId));
        })
      );
    })
    .catch(e => {
      console.log(e);
    });
}

module.exports = {
  getEmailsToSend,
  formatReminders,
  getDates,
  vaccinationTitles
};
