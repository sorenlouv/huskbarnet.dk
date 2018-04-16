const { getReminderMessages } = require('./getRemindersHelpers');

const { map } = require('lodash');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.getReminders = functions.https.onRequest((req, res) => {
  const date = req.query.date || '2017-12-22';

  getReminderMessages(date, admin)
    .then(reminderMessages => {
      return res.send(reminderMessages);
    })
    .catch(e => {
      res.send(e);
    });
});
