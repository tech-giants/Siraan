# Work with Apple Pay & Google Pay

## Google Pay

### Server and telephone requirements.
1. The server must use https
2. Android version is not lower than 8.0

### Scheme of work
1. You sign up at https://services.google.com/fb/forms/googlepayAPIenable/ and select 1 from the payment processor.
2. Add “Pay via Google” button
3. The user presses the button
4. A window is displayed with a choice of map and a confirmation button.
5. After confirming the payment, Google Pay itself goes to the registered payment processor (for example, Stripe) and returns the payment token to the application
6. The application sends a token to our server confirming that the payment was successful.
7. After the response of our server, we show the client a window with a successful payment.

See files with the scheme for more details.

### Available payment processors
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

### Where the money goes
The money goes to the payment processor and is withdawn via the processor.

### Integration
Integration is quite complicated and requires manual verification of the application.
It is necessary to integrate everything, build apk and send it for validation.


## Apple Pay

### Server and telephone requirements.
1. The server must be https
2. iOS 10 or newer
3. Apple Developer Account

### Scheme of work
1. In the developer account, you need to register a Merchant ID, create a Merchant Identity Certificate and Payment Processing Certificate and verify the domains on which Apple Pay will be used.
https://developer.apple.com/account/ios/certificate/create
2. Add the “Pay” button; the button should look according to the style guide https://developer.apple.com/design/human-interface-guidelines/apple-pay/buttons-and-marks/buttons/
3. The user presses the button
4. A window is displayed with a choice of map and a confirmation button.
5. After confirming the payment, you receive the token and send the token to your payment processor by yourself.
6. After answering the payment processor, we show the client a window with a successful payment.

### Where the money goes
The money goes to the payment processor and is withdawn via the processor.


### Integration
Integration is complicated because you need to sign everything with certificates.
The application as well as the payment processor requires uploading these certificates.
