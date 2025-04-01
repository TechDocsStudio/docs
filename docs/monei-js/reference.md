---
id: reference
title: MONEI JS Reference
sidebar_label: Reference
description: You can use monei.js’ APIs to tokenize customer information and collect sensitive card data using customizable MONEI Components.
---

This reference documents every object and method available in MONEI’s browser-side JavaScript library, monei.js.

You can use monei.js’ APIs to integrate prebuilt Components for different payment methods into your own checkout flows across desktop and mobile.

## Including monei.js

Include the **monei.js** script on the checkout page of your site — it should always be loaded directly from `https://js.monei.com`, rather than included in a bundle or hosted yourself.

```html
<script src="https://js.monei.com/v2/monei.js"></script>
```

### Using monei.js as a module

We also provide an npm package that makes it easier to load and use monei.js as a module.

```shell script
npm i @monei-js/components
```

## `monei` object

The monei object is your entrypoint to the rest of the monei.js SDK.

## `CardInput` Component

CardInput is a customizable Component used to collect sensitive card information in your payment forms.

### Create an instance of the CardInput Component.

```js
const cardInput = monei.CardInput({
  paymentId: 'af6029f80f5fc73a8ad2753eea0b1be0',
  ...otherOptions
});

// render Component on the page
cardInput.render('#card_input_container');
```

### CardInput options

- **paymentId** `string` - A payment ID provided by MONEI in [create payment](/apis/rest/payments-create/) request. Generated payment token will be bound to this payment.
- **accountId** `string` - Your MONEI account ID. Required if you're initializing card input with account ID. Instead of passing **paymentId** you can initialize a card input with the **accountId** and **sessionId** (optional). Generate a payment token before you create the payment itself.
- **sessionId** `string` - Unique session ID in your system. Provide a different **sessionId** for each customer. Use this parameter to ensure that the customer who generated the token is the same as the one making the payment. Only required if you pass a token to your server. If you provide a **sessionId** when initializing MONEI Component you will need to provide the same value when you [create a payment](/apis/rest/schemas/payment/) on your server.
- **style** `object` - Customize the appearance of this Component using CSS properties passed in a [Style](#cardinput-style-object) object.
- **language** `string` - The [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code represents the desired component language. Supported locales include `en`, `es`, `ca`, `pt`, `de`, `it`, `fr`, `nl`, `et`, `fi`, `lv`, `no`, `pl` and `ru`. By default, MONEI smartly detects the correct language for the buyer based on their geolocation and browser preferences.
- **placeholders** `object` - Customize input placeholders
  - **cardNumber** `string` - Card number placeholder. Default: "Card number"
  - **expiryDate** `string`- Expiry date placeholder. Default: "MM/YY"
  - **cvc** `string` - CVC placeholder. Default: "CVC"
- **errorMessages** `object` - Customize error messages
  - **emptyCardNumber** `string` - Default: "Enter a card number"
  - **invalidCardNumber** `string` - Default: "Card number is invalid"
  - **emptyExpiryDate** `string` - Default: "Enter an expiry date"
  - **monthOutOfRange** `string` - Default: "Expiry month must be between 01 and 12"
  - **yearOutOfRange** `string` - Default: "Expiry year cannot be in the past"
  - **dateOutOfRange** `string` - Default: "Expiry date cannot be in the past"
  - **invalidExpiryDate** `string` - Default: "Expiry date is invalid"
  - **emptyCVC** `string` - Default: "Enter a CVC"
  - **invalidCVC** `string` - Default: "CVC is invalid"
- **onFocus:() => void** `function` - Callback function that is called when card input is focused
- **onBlur:() => void** `function` - Callback function that is called when card input is blurred
- **onLoad:() => void** `function` - Callback function that is called when card input is fully loaded
- **onEnter:() => void** `function` - Callback function that is called when user presses **Enter** key on the keyboard inside card input.
- **onChange:(event: CardInputOnChangeEvent) => void** `function` - Callback function that is called on every user input. Used for real-time validation.
  - **event.isTouched** `boolean` - Indicates if card input was touched.
  - **event.focused** `string` - Indicates what input is focused. Possible values: `cardNumber`, `expiryDate`, `cvc`
  - **cardType** `string` - Detected card type.
  - **error** `string` - Card input error. Use this attribute to show an error to a user.
- **onError: (error: Error) => void** `function` - Callback function that is called when there is an error.

### CardInput Style object

components are styled using a Style object. It consists of CSS properties nested under objects for any of the following variants:

- **base** `object` - base Component style
- **loading** `object` - base Component style when Component is loading
- **invalid** `object` - applied when the Component has invalid input
- **input** `object` - applied to individual inputs
- **cardNumber** `object` - applied to card number input
- **expiryDate** `object` - applied to expiry date input
- **cvc** `object` - applied to cvc input
- **icon** `object` - applied to icon

The following pseudo-classes and pseudo-elements can also be styled using a nested object inside of a variant:

- `:focus`
- `:hover`
- `::placeholder`
- `::selection`
- `:-webkit-autofill`

```js
const style = {
  base: {
    height: '44px',
    padding: '8px 12px'
  },
  loading: {
    backgroundColor: '#F4F4F4'
  },
  input: {
    color: '#8961a5',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#848589'
    },
    '-webkit-autofill': {
      backgroundColor: '#FAFFBD'
    }
  },
  invalid: {
    color: '#fa755a'
  }
};

const cardInput = monei.CardInput({
  paymentId: 'af6029f80f5fc73a8ad2753eea0b1be0',
  style: style,
  ...otherOptions
});

// render Component on the page
cardInput.render('#card_input_container');
```

## `createToken` function

Use this function to generate payment token.

:::note
Payment tokens generated by monei.js Components expire as soon as they are used or 5 days after creation.
:::

Pass an instance of CardInput Component.

```typescript
declare const createToken: (Component: MoneiComponent) => Promise<{
  token?: string; // payment token
  error?: string; // validation error
}>;
```

Example:

```js
monei
  .createToken(cardInput) // pass a reference to an instance of your CardInput Component
  .then(function (result) {
    console.log(result);
    if (result.error) {
      // Inform the user if there was an error.
    } else {
      // Confirm payment using the token.
      moneiTokenHandler(result.token);
    }
  })
  .catch(function (error) {
    // Something went wrong while generating token
    console.log(error);
  });
```

## `PayPal` Component

PayPal is a customizable Component that renders a PayPal payment button.

### Create an instance of the PayPal Component.

```js
const paypal = monei.PayPal({
  paymentId: 'af6029f80f5fc73a8ad2753eea0b1be0',
  onSubmit(result) {
    if (result.error) {
      // Inform the user if there was an error.
    } else {
      // Confirm payment using the token.
      moneiTokenHandler(result.token);
    }
  },
  onError(error) {
    console.log(error);
  },
  ...otherOptions
});

// render Component on the page
paypal.render('#paypal_container');
```

### PayPal options

- **paymentId** `string` - A payment ID provided by MONEI in [create payment](/apis/rest/payments-create/) request. Generated payment token will be bound to this payment.
- **accountId** `string` - Your MONEI account ID. Required if you're initializing the Component with account ID. Instead of passing **paymentId** you can initialize the Component with the **accountId** and **sessionId** (optional). Generate a payment token before you create the payment itself.
- **sessionId** `string` - Unique session ID in your system. Provide a different **sessionId** for each customer. Use this parameter to ensure that the customer who generated the token is the same as the one making the payment. Only required if you pass a token to your server. If you provide a **sessionId** when initializing MONEI Component you will need to provide the same value when you [create a payment](/apis/rest/schemas/payment/) on your server.
- **amount** `positive integer` - Amount intended to be collected by this payment. A positive integer representing how much to charge in the smallest currency unit (e.g., 100 cents to charge 1.00 USD). Required if you initialize a Component with **accountId**. You'll need to pass the same value when creating the payment.
- **currency** `string` - Three-letter [ISO currency code](https://en.wikipedia.org/wiki/ISO_4217), in uppercase. Must be a supported currency. Required if you initialize a Component with **accountId**. You'll need to pass the same value when creating the payment.
- **transactionType** `string` - Controls when the funds will be captured. Required if you initialize a Component with **accountId**. You'll need to pass the same value when creating the payment.
  - **SALE** - `default`. MONEI automatically captures funds when the customer authorizes the payment.
  - **AUTH** - Place a hold on the funds when the customer authorizes the payment, but don’t capture the funds until later.
- **language** `string` - The language of the Component. By default, MONEI smartly detects the correct language for the buyer based on their geolocation and browser preferences. It is recommended to pass this parameter only if you need the PayPal button to render in the same language as the rest of your site. [List of supported languages](https://developer.paypal.com/docs/checkout/reference/customize-sdk/#locale).
- **style** `object` - Customize the appearance of [PayPal button](https://developer.paypal.com/docs/archive/checkout/how-to/customize-button/#button-styles).
  - **height** `string` - By default, the button adapts to the size of its container element. To customize the button width, alter the width of the container element. To customize the button height, set the style.height option to a value from `25` to `55`.
  - **shape** `string` - Set button shape. Possible values: `rect`, `pill`
  - **color** `string` - Set button color. Possible values: `gold`, `blue`, `silver`, `white`, `black`
  - **layout** `string` - Determine the button layout when multiple buttons are available Possible values: `vertical`, `horizontal`
  - **label** `string`- Set button label. Possible values: `checkout`, `credit`, `pay`, `buynow`, `paypal`, `installment`
- **onLoad:(isSupported: boolean) => void** `function` - Callback function that is called when paypal is fully loaded. If this payment method is not supported, the Component will not show up, and `onLoad` callback will be triggered with `isSupported: false`
- **onBeforeOpen:() => boolean** `function` - Callback function that is called before the PayPal window is opened. If the function returns `false`, the PayPal window will not be opened.
- **onSubmit:(result: \{token?: string; error?: string}) => void** `function` - Callback function that is called when customer approves the payment.
  - **result.token** `string` - Payment token
  - **result.error** `string` - Payment error. Use this attribute to show an error to a user.
- **onError: (error: Error) => void** `function` - Callback function that is called when there is an error.

## `PaymentRequest` Component

PaymentRequest is a customizable Component that renders a Google Pay or Apple Pay payment button depending on the browser and operating system of the user.

### Create an instance of the PaymentRequest Component.

```js
const paymentRequest = monei.PaymentRequest({
  paymentId: 'af6029f80f5fc73a8ad2753eea0b1be0',
  onSubmit(result) {
    if (result.error) {
      // Inform the user if there was an error.
    } else {
      // Confirm payment using the token.
      moneiTokenHandler(result.token);
    }
  },
  onError(error) {
    console.log(error);
  },
  ...otherOptions
});

// render Component on the page
paymentRequest.render('#payment_request');
```

### PaymentRequest options

- **paymentId** `string` - A payment ID provided by MONEI in [create payment](/apis/rest/payments-create/) request. Generated payment token will be bound to this payment.
- **accountId** `string` - Your MONEI account ID. Required if you're initializing the Component with account ID. Instead of passing **paymentId** you can initialize the Component with the **accountId** and **sessionId** (optional). Generate a payment token before you create the payment itself.
- **sessionId** `string` - Unique session ID in your system. Provide a different **sessionId** for each customer. Use this parameter to ensure that the customer who generated the token is the same as the one making the payment. Only required if you pass a token to your server. If you provide a **sessionId** when initializing MONEI Component you will need to provide the same value when you [create a payment](/apis/rest/schemas/payment/) on your server.
- **amount** `positive integer` - Amount intended to be collected by this payment. A positive integer representing how much to charge in the smallest currency unit (e.g., 100 cents to charge 1.00 USD). Required if you initialize a Component with **accountId**. You'll need to pass the same value when creating the payment.
- **currency** `string` - Three-letter [ISO currency code](https://en.wikipedia.org/wiki/ISO_4217), in uppercase. Must be a supported currency. Required if you initialize a Component with **accountId**. You'll need to pass the same value when creating the payment.
- **language** `string` - The [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code represents the desired button language. Supported locales include `en`, `es`, `ca`, `pt`, `de`, `it`, `fr`, `nl`, `et`, `fi`, `lv`, `no`, `pl` and `ru`.
- **style** `object` - Customize the appearance of Google Pay button.
  - **height** `string` - By default, the button adapts to the size of its container element. To customize the button width, alter the width of the container element. To customize the button height, set the style.height option to a value from `25` to `55`.
  - **type** `string` - Set button type. Possible values:
    - **buy** - "Buy with Google Pay / Apple Pay" button.
    - **donate** - "Donate with Google Pay / Apple Pay" button.
    - **plain** - button without additional text (default).
  - **color** `string` - Set button color. Possible values: `default`, `black`, `white`
- **onLoad:(isSupported: boolean) => void** `function` - Callback function that is called when payment request is fully loaded. If this payment method is not supported, the Component will not show up, and `onLoad` callback will be triggered with `isSupported: false`
- **onBeforeOpen:() => boolean** `function` - Callback function that is called before the payment window is opened. If the function returns `false`, the payment window will not be opened.
- **onSubmit:(result: \{token?: string; error?: string}) => void** `function` - Callback function that is called when customer approves the payment.
  - **result.token** `string` - Payment token
  - **result.error** `string` - Payment error. Use this attribute to show an error to a user.
- **onError: (error: Error) => void** `function` - Callback function that is called when there is an error.

## `Bizum` Component

Bizum is a customizable Component that renders a Bizum payment button.

### Create an instance of the Bizum Component.

```js
const bizum = monei.Bizum({
  paymentId: 'af6029f80f5fc73a8ad2753eea0b1be0',
  onSubmit(result) {
    if (result.error) {
      // Inform the user if there was an error.
    } else {
      // Confirm payment using the token.
      moneiTokenHandler(result.token);
    }
  },
  onError(error) {
    console.log(error);
  },
  ...otherOptions
});

// render Component on the page
bizum.render('#bizum');
```

### Bizum options

- **paymentId** `string` - A payment ID provided by MONEI in [create payment](/apis/rest/payments-create/) request. Generated payment token will be bound to this payment.
- **accountId** `string` - Your MONEI account ID. Required if you're initializing the Component with account ID. Instead of passing **paymentId** you can initialize the Component with the **accountId** and **sessionId** (optional). Generate a payment token before you create the payment itself.
- **sessionId** `string` - Unique session ID in your system. Provide a different **sessionId** for each customer. Use this parameter to ensure that the customer who generated the token is the same as the one making the payment. Only required if you pass a token to your server. If you provide a **sessionId** when initializing MONEI Component you will need to provide the same value when you [create a payment](/apis/rest/schemas/payment/) on your server.
- **amount** `positive integer` - Amount intended to be collected by this payment. A positive integer representing how much to charge in the smallest currency unit (e.g., 100 cents to charge 1.00 USD). Required if you initialize a Component with **accountId**. You'll need to pass the same value when creating the payment.
- **currency** `string` - Three-letter [ISO currency code](https://en.wikipedia.org/wiki/ISO_4217), in uppercase. Must be a supported currency. Required if you initialize a Component with **accountId**. You'll need to pass the same value when creating the payment.
- **language** `string` - The [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code represents the desired button language. Supported locales include `en`, `es`, `ca`, `pt`, `de`, `it`, `fr`, `nl`, `et`, `fi`, `lv`, `no`, `pl` and `ru`.
- **style** `object` - Customize the appearance of Google Pay button.
  - **height** `string` - By default, the button adapts to the size of its container element. To customize the button width, alter the width of the container element. To customize the button height, set the style.height option to a value from `25` to `55`.
  - **type** `string` - Set button type. Possible values:
    - **pay** - "Pay with Bizum" button.
    - **plain** - button without additional text (default).
- **onLoad:(isSupported: boolean) => void** `function` - Callback function that is called when payment request is fully loaded. If this payment method is not supported, the Component will not show up, and `onLoad` callback will be triggered with `isSupported: false`
- **onBeforeOpen:() => boolean** `function` - Callback function that is called before the Bizum window is opened. If the function returns `false`, the payment window will not be opened.
- **onSubmit:(result: \{token?: string; error?: string}) => void** `function` - Callback function that is called when customer approves the payment.
  - **result.token** `string` - Payment token
  - **result.error** `string` - Payment error. Use this attribute to show an error to a user.
- **onError: (error: Error) => void** `function` - Callback function that is called when there is an error.

## `Cofidis` Component

Cofidis is a customizable Component that renders a Cofidis payment button.

### Create an instance of the Cofidis Component.

```js
const cofidis = monei.Cofidis({
  paymentId: 'af6029f80f5fc73a8ad2753eea0b1be0',
  onSubmit(result) {
    // Redirect the customer to the Cofidis payment page
    window.location.assign(result.redirectUrl);
  },
  onError(error) {
    console.log(error);
  },
  ...otherOptions
});

// render Component on the page
cofidis.render('#cofidis');
```

### Cofidis options

- **accountId** `string` - Your MONEI account ID.
- **language** `string` - The [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code represents the desired button language. Supported locales include `en`, `es`, `ca`, `pt`, `de`, `it`, `fr`, `nl`, `et`, `fi`, `lv`, `no`, `pl` and `ru`.
- **style** `object` - Customize the appearance of Google Pay button.
  - **height** `string` - By default, the button adapts to the size of its container element. To customize the button width, alter the width of the container element. To customize the button height, set the style.height option to a value from `25` to `55`.
- **onLoad:(isSupported: boolean) => void** `function` - Callback function that is called when payment request is fully loaded. If this payment method is not supported, the Component will not show up, and `onLoad` callback will be triggered with `isSupported: false`
- **onBeforeOpen:() => boolean** `function` - Callback function that is called before the Cofidis window is opened. If the function returns `false`, the payment window will not be opened.
- **onSubmit:(result: \{redirectUrl: string}) => void** `function` - Callback function that is called when customer approves the payment.
  - **result.redirectUrl** `string` - Cofidis payment page redirect url
- **onError: (error: Error) => void** `function` - Callback function that is called when there is an error.

## `CofidisWidget` Component

Cofidis Widget is a customizable Component that renders a Cofidis commercial conditions.

### Create an instance of the Cofidis Widget Component.

```js
const cofidisWidget = monei.CofidisWidget({
  accountId: '2975bcfa-7bbc-422d-af48-c66759d87b69',
  amount: 100,
  onError(error) {
    console.log(error);
  },
  ...otherOptions
});

// render Component on the page
cofidisWidget.render('#cofidis_widget');
```

### CofidisWidget options

- **paymentId** `string` - A payment ID provided by MONEI in [create payment](/apis/rest/payments-create/) request. Generated payment token will be bound to this payment.
- **amountInt** `positive integer` - The amount used as a base to calculate load conditions. A positive integer in the smallest currency unit (e.g., 100 cents to charge 1.00 USD).
- **amount** `positive float` (required if **amountInt** is not specified) - The amount used as a base to calculate load conditions.
- **language** `string` - The [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code represents the desired button language. Supported locales include `en`, `es`, `ca`, `pt`, `de`, `it`, `fr`, `nl`, `et`, `fi`, `lv`, `no`, `pl` and `ru`.
- **hint** `boolean` - if true will display a hint "More information" below the button. Default: `true`.
- **style** `object` - Customize the appearance of Google Pay button.
  - **base** `object` - base Component style
  - **link** `object` - link style
  - **amount** `object` - amount style
- **onLoad:() => void** `function` - Callback function that is called when payment request is fully loaded.
- **onError: (error: Error) => void** `function` - Callback function that is called when there is an error.

### CofidisWidget instance methods

- **redner: (container: string | DOMElement) => void** - renders the widget to the container DOM element
- **updateProps: (options: CofidisWidgetProps) => void ** - updates the widget with new options (use this method to update amount)

## `CofidisPay` Component

Cofidis Pay is a customizable Component that renders a Cofidis Pay payment button.

### Create an instance of the Cofidis Pay Component.

```js
const cofidisPay = monei.CofidisPay({
  paymentId: 'af6029f80f5fc73a8ad2753eea0b1be0',
  onSubmit(result) {
    // Redirect the customer to the Cofidis payment page
    window.location.assign(result.redirectUrl);
  },
  onError(error) {
    console.log(error);
  },
  ...otherOptions
});

// render Component on the page
cofidisPay.render('#cofidis');
```

### CofidisPay options

- **accountId** `string` - Your MONEI account ID.
- **language** `string` - The [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code represents the desired button language. Supported locales include `en`, `es`, `ca`, `pt`, `de`, `it`, `fr`, `nl`, `et`, `fi`, `lv`, `no`, `pl` and `ru`.
- **style** `object` - Customize the appearance of Google Pay button.
  - **height** `string` - By default, the button adapts to the size of its container element. To customize the button width, alter the width of the container element. To customize the button height, set the style.height option to a value from `25` to `55`.
- **onLoad:(isSupported: boolean) => void** `function` - Callback function that is called when payment request is fully loaded. If this payment method is not supported, the Component will not show up, and `onLoad` callback will be triggered with `isSupported: false`
- **onBeforeOpen:() => boolean** `function` - Callback function that is called before the Cofidis Pay window is opened. If the function returns `false`, the payment window will not be opened.
- **onSubmit:(result: \{redirectUrl: string}) => void** `function` - Callback function that is called when customer approves the payment.
  - **result.redirectUrl** `string` - Cofidis payment page redirect url
- **onError: (error: Error) => void** `function` - Callback function that is called when there is an error.

## `CofidisPayWidget` Component

Cofidis Pay Widget is a customizable Component that renders a Cofidis Pay commercial conditions.

### Create an instance of the Cofidis Pay Widget Component.

```js
const cofidisPayWidget = monei.CofidisPayWidget({
  accountId: '2975bcfa-7bbc-422d-af48-c66759d87b69',
  amount: 100,
  onError(error) {
    console.log(error);
  },
  ...otherOptions
});

// render Component on the page
cofidisPayWidget.render('#cofidis_widget');
```

### CofidisPayWidget options

- **paymentId** `string` - A payment ID provided by MONEI in [create payment](/apis/rest/payments-create/) request. Generated payment token will be bound to this payment.
- **amountInt** `positive integer` - The amount used as a base to calculate load conditions. A positive integer in the smallest currency unit (e.g., 100 cents to charge 1.00 USD).
- **amount** `positive float` (required if **amountInt** is not specified) - The amount used as a base to calculate load conditions.
- **language** `string` - The [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code represents the desired button language. Supported locales include `en`, `es`, `ca`, `pt`, `de`, `it`, `fr`, `nl`, `et`, `fi`, `lv`, `no`, `pl` and `ru`.
- **hint** `boolean` - if true will display a hint "More information" below the button. Default: `true`.
- **style** `object` - Customize the appearance of Google Pay button.
  - **base** `object` - base Component style
  - **link** `object` - link style
  - **amount** `object` - amount style
- **onLoad:() => void** `function` - Callback function that is called when payment request is fully loaded.
- **onError: (error: Error) => void** `function` - Callback function that is called when there is an error.

### CofidisPayWidget instance methods

- **redner: (container: string | DOMElement) => void** - renders the widget to the container DOM element
- **updateProps: (options: CofidisPayWidgetProps) => void ** - updates the widget with new options (use this method to update amount)

## `confirmPayment` function

After you generate the **paymentToken** using one of the Components, use this function to confirm the payment passing the obtained `paymentToken`. It will automatically show a popup window with a 3D Secure confirmation screen if required.

You can also use this function without a **paymentToken** attribute. It will show a payment popup window.

You can provide additional customer information in parameters.

```typescript
declare const confirmPayment: (params: ConfirmPaymentParams) => Promise<PaymentResult>;
```

### Confirm payment params

- **paymentId** ` string` `required` - A payment ID provided by MONEI in [create payment](/apis/rest/payments-create/) request
- **paymentToken** `string` - A payment token generated by monei.js. If **paymentToken** is present the popup window will open directly to a 3D Secure confirmation screen (if needed).
- **generatePaymentToken** `boolean` - If set to true a permanent token that represents a payment method used in the payment will be generated.
- **fullscreen** `boolean` - Set this parameter to true to open a fullscreen confirmation window.
- **language** `string` - Two-letter language code ([ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1)). Supported locales include `en`, `es`, `ca`, `pt`, `de`, `it`, `fr`, `nl`, `et`, `fi`, `lv`, `no`, `pl` and `ru`. If provided overrides browser detected user language.
- **allowedPaymentMethods** `string[]` - List of allowed payment methods. If provided overrides payment methods allowed in the payment. Supported payment methods: `card`, `googlePay`,`clickToPay`, `bizum`, `paypal`.
- **customDomain** `string` - Custom domain to use for the payment popup window. If you have custom domain configured this option is required for the popup window to work.

Check [confirm payment](/apis/rest/payments-confirm/) for the full list of parameters.

### Payment result

- **id** `string` - Unique identifier for the payment.
- **status** `string` - The status of the payment.
- **amount** `positive integer` - Amount intended to be collected by this payment. A positive integer representing how much to charge in the smallest currency unit (e.g., 100 cents to charge 1.00 USD).
- **currency** `string` - Three-letter [ISO currency code](https://en.wikipedia.org/wiki/ISO_4217), in uppercase.
- **accountId** `string` - MONEI account ID.
- **orderId** `string` - An order ID from your system. A unique identifier that can be used to reconcile the payment with your internal system.
- **statusCode** `string` - Payment status code.
- **statusMessage** `string` - Human readable status message, can be displayed to a user.
- **nextAction** `object` - If present, this property tells you what actions you need to take in order for your customer to fulfill a payment using the provided source.
  - **type** `string`
  - **mustRedirect** `boolean`
  - **redirectUrl** `string`

Check [payment object](/apis/rest/schemas/payment/) for the full description of each field

Example:

```js
monei
  .confirmPayment({
    paymentId: 'af6029f80f5fc73a8ad2753eea0b1be0',
    paymentToken: 'fe6786e08ded3191cf2f623e120a0bacda715bf2',
    ...otherOptions
  })
  .then(function (result) {
    // Payment result
    console.log(result);
  })
  .catch(function (error) {
    // Something went wrong while confirming payment
    console.log(error);
  });
```
