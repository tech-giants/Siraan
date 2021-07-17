# Push notification settings

Push notifications for ios and android work via [https://firebase.google.com](https://firebase.google.com)

PS / Google proxies sending notifications to Apple (apns)

# Configuring Android
1. You need to register on firebase.google.com and create a project.
2. In the project, create a new application for android. Specify bundleId (com.simtech.multivendor) as the name
3. Click next, download the google-services.json file and save it to android/app
4. Go to the settings of the application in the Cloud messaging tab and copy the "Outdated Server Key"
5. Test the sending
```js
fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=OUTDATED SERVER KEY'
    },
    body: JSON.stringify({
        "to":"TOKEN FROM THE APP",
        "data": {
            "custom_notification": {
            "body": "test body",
            "title": "test title",
            "targetScreen": "product/248",
            "icon": "ic_notification",
            "sound": "default",
            "show_in_foreground": true
            }
        }
    })
}).then((result) => console.log(result, 'res'));
```

# Configuring for IOS
1. In the project (firebase) create a new application for ios. Specify bundleId (com.simtech.native) as the name
2. Download GoogleService-Info.plist and save to ios/csnative
3. On the site https://developer.apple.com/account/ios/authkey/ create a new key and download it locally. Also during key generation, remember Key ID
4. Go to the page https://developer.apple.com/account/ios/identifier/bundle, find the application and remember the Prefix
5. In the firebase application created earlier for ios, go to the settings, then to the Cloud messaging tab
6. Download the APNS key where we specify the file from step (3), key id and Prefix.
7. Test the sending:

```js
fetch("https://fcm.googleapis.com/fcm/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "key=OUTDATED SERVER KEY"
  },
  body: JSON.stringify({
    to: "TOKEN FROM THE APP",
    "notification":{
      "title": "Simple FCM Client",
      "body": "Click me to go to detail",
      "sound": "default"
    },
    data: {
      targetScreen: 'product/248'
    },
    "priority": 10
  })
})
  .then(result => console.log(result, "res"));
```
