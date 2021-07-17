# Работа c Apple pay & Google Pay

## Google Pay

###  Требования к серверу и телефону.
1. На сервере должен быть https
2. Версия андройда не ниже 8.0

### Схема работы
1. Вы регистрируетесь на https://services.google.com/fb/forms/googlepayAPIenable/ и выбираете 1 из payment processor.
2. Добавляете кнопку “Оплатить через Google”
3. Пользователь нажимает на кнопку
4. Показывается окошко с выбором карты и кнопкой подверждения.
5. После подтверждения оплаты Google pay сам идет на зарегестрированный payment processor (например stripe)  и возвращает token оплаты в приложение
6. Приложение отправляет токен на наш сервер в подтверждении того что оплата прошла успешно.
7. После ответа нашего сервера мы показывает клиенту окно с успешной оплатой.

Детальней см. файлы мо схемой.

### Доступные payment processors
ACI
Adyen
Braintree
Checkout.com
Cybersource
CloudPayments
Datatrans
EBANX
First Data
Global Payments
IMSolutions
Paysafe
Payture
Przelewy24
Sberbank
Stripe
Vantiv
Worldpay

### Кому уходят деньги
Все деньги уходят в payment processor и выводится тоже через него.

### Интеграция
Интеграция достаточно запутанная и требует ручной проверки приложения.
Нужно все заинтегрировать собрать apk и отправить его на валидацию.



## Apple Pay

###  Требования к серверу и телефону.
1. На сервере должен быть https
2. iOS начиная от 10
3. Девелоперский аккаунт Apple

### Схема работы
1. В developer account  yужно зарегистрировать Merchant ID, создать сертификаты Merchant Identity Certificate и Payment Processing Certificate и верифицировать домены, на которых будет использоваться Apple Pay
https://developer.apple.com/account/ios/certificate/create
2. Добавляете кнопку “Pay” кнопка должна выглядеть согластно style guide https://developer.apple.com/design/human-interface-guidelines/apple-pay/buttons-and-marks/buttons/
3. Пользователь нажимает на кнопку
4. Показывается окошко с выбором карты и кнопкой подверждения.
5. После подтверждения оплаты вы получаете токен и отправляете токен в ваш payment processor сами.
6. После ответа payment processor мы показывает клиенту окно с успешной оплатой.

### Кому уходят деньги
Все деньги уходят в payment processor и выводится тоже через него.

### Интеграция
Интеграция сложная так как нужно все подписывать сертификатами.
Свое приложение а так же payment processor требует загрузку этих сертификатов.
