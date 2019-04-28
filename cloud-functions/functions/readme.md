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

https://us-central1-doctor-reminders.cloudfunctions.net/testEmail

# Cron jobs

Sent from https://cron-job.org/
