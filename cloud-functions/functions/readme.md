# Firebase Setup

### Install Firebase CLI tools

```
curl -sL https://firebase.tools | bash
```

### Login to Firebase

```
firebase login
```

# set email and password as env values

```
firebase functions:config:set smtp.email="info@huskbarnet.dk" smtp.password="..."
```

# View environment values

```
firebase functions:config:get
```

# Deploy:

```
firebase deploy --only functions
```

# Test email function

https://us-central1-doctor-reminders.cloudfunctions.net/testEmail?secret_token=...

https://us-central1-doctor-reminders.cloudfunctions.net/getReminders?secret_token=...

# Cron jobs

Sent from https://cron-job.org/
