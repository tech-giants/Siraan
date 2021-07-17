# Настройки Push notification

Push notifications для ios и android работают через [https://firebase.google.com](https://firebase.google.com) 

PS/ гугл проксирует отправку нотификаций в apple (apns)

# Настройка Android
1. Нужно зарегестрироваться на firebase.google.com и создать проект.
2. В проекте создайте новое приложение для андройд. В качестве названия указываем bundleId (com.simtech.multivendor)
3. Жмем далее и скачиваем файл google-services.json и сохраняем его в android/app
4. Переходим в настройки приложения во вкладку Cloud messaging и копируем "Устаревший ключ сервера"
5. Тестируем отправку
```js
fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=Устаревший ключ сервера'
    },
    body: JSON.stringify({
        "to":"ТОКЕН ИЗ ПРИЛОЖЕНИЯ",
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

# Настройка IOS
1. В проекте (firebase) создайте новое приложение для ios. В качестве названия указываем bundleId (com.simtech.native)
2. Скачиваем GoogleService-Info.plist и сохраняем в ios/csnative
3. На сайте https://developer.apple.com/account/ios/authkey/ создаем новый ключ и скачиваем его локально. Так же во время генерации ключа запомните Key ID
4. Идем на страницу https://developer.apple.com/account/ios/identifier/bundle находим свое приложение и запоминаем Prefix
5. В firebase созданном ранее приложении для ios идем в настройки затем на вкладку cloud messaging
6. Загружаем ключ APNS где указываем файл из шага (3), key id и Prefix.
7. Тестируем 

```js
fetch("https://fcm.googleapis.com/fcm/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "key=Устаревший ключ сервера"
  },
  body: JSON.stringify({
    to: "ТОКЕН ИЗ ПРИЛОЖЕНИЯ",
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