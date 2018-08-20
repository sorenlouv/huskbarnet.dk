const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const adminRef = require('firebase-admin');
const { getEmailsToSend } = require('./getRemindersHelpers');
adminRef.initializeApp();

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email, // Google Cloud env vars
    pass: functions.config().gmail.password // Google Cloud env vars
  }
});

function sendEmail(emailReminder) {
  const mailOptions = {
    from: '"HuskBarnet.dk" <boernepaamindelser@gmail.com>',
    to: emailReminder.email,
    subject: emailReminder.subject,
    text: emailReminder.message
  };

  return mailTransport
    .sendMail(mailOptions)
    .then(() => console.log(mailOptions))
    .catch(error =>
      console.error(
        'There was an error while sending the email:',
        emailReminder,
        mailOptions,
        error
      )
    );
}

exports.getReminders = functions.https.onRequest((req, res) => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const date = req.query.date || todayDate;
  const sendemails = Boolean(req.query.sendemails);

  getEmailsToSend(date, adminRef)
    .then(emails => {
      console.log(emails);
      if (sendemails) {
        return Promise.all(emails.map(sendEmail)).then(() => {
          return res.send(`Send ${emails.length} emails`);
        });
      } else {
        return res.send(emails);
      }
    })
    .catch(e => {
      res.send(e);
    });
});
