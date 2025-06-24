# Tabby checkout example app React Native 📱

Use [our SDK](https://www.npmjs.com/package/tabby-react-native-sdk) to integrate our snippets in your app.

## How to run the example app?

1. `npm i`
2. `cd ios && pod install`
3. `npm run start:rc`
4. Open XCode, let project to be indexed, run with "Play" button
5. set `android/local.properties` sdk path like sdk.dir=/Users/your_username/Library/Android/sdk
6. Open Android Studio, let project to sync, run with "Play" button
7. Define your `tabbyApiKey` as a constant and follow **Impelemtation** steps above

## Snippets usage

### TabbyProductPageSnippet

```typescript jsx
import React from "react";
import { TabbyProductPageWidget } from "tabby-react-native-sdk";

<TabbyProductPageWidget
  price={"340.00"}
  currency={"AED"}
  lang={"ar"} // or "en"
  installmentsCount={4}
  // Ask your Tabby account manager for your merchant code
  merchantCode={"your_merchant_code"} 
  // Ask your Tabby account manager for your API key
  publicKey={apiKey}
/>
```

### TabbyPaymentWebView

```typescript jsx
import React from "react";
import { TabbyPaymentWebView } from "tabby-react-native-sdk";

<TabbyPaymentWebView
    onBack={
      // Your navigation back function
    }
    url={
      // Url from Tabby available product
    }
    onResult={
      // Your onResult function
    } 
  />
```