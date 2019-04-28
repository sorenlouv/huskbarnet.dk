const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const adminRef = require('firebase-admin');
const { getEmailsToSend } = require('./getRemindersHelpers');
adminRef.initializeApp();

const mailTransport = nodemailer.createTransport({
  pool: true,
  host: 'mail.gandi.net',
  port: 587, // starttls
  secure: false, // For port 587 or 25 keep it false
  auth: {
    user: functions.config().smtp.email, // Google Cloud env vars
    pass: functions.config().smtp.password // Google Cloud env vars
  }
});

function sendEmail(emailReminder) {
  const mailOptions = {
    from: '"HuskBarnet.dk" <info@huskbarnet.dk>',
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

// verify that caller is allowed to invoke function
function isSecretTokenValid(secretToken) {
  return functions.config().email.secret_token === secretToken;
}

exports.getReminders = functions.https.onRequest((req, res) => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const date = req.query.date || todayDate;
  const sendemails = Boolean(req.query.sendemails);
  const secretToken = req.query.secret_token;

  if (!isSecretTokenValid(secretToken)) {
    console.log('Supplied token was invalid', secretToken);
    res.send('Invalid Token ' + secretToken);
    return;
  }

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

exports.testEmail = functions.https.onRequest((req, res) => {
  const secretToken = req.query.secret_token;

  if (!isSecretTokenValid(secretToken)) {
    console.log('Supplied token was invalid', secretToken);
    res.send('Invalid Token ' + secretToken);
    return;
  }

  const mailOptions = {
    from: '"HuskBarnet.dk" <info@huskbarnet.dk>',
    to: 'sorenlouv@gmail.com',
    subject: 'This is a test email',
    text: 'Hello from huskbarnet.dk'
  };

  return mailTransport
    .sendMail(mailOptions)
    .then(() => {
      res.send('Success');
      console.log(mailOptions);
    })
    .catch(error => {
      res.send('Failed');
      console.error(
        'There was an error while sending the email:',
        mailOptions,
        error
      );
    });
});
