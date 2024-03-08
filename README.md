# Contact Picker

A simple utility to pick contacts using the Contacts API in the browser.

## Installation

```
npm install contact-picker
```

## Usage ESM

Check if Contacts API is supported:

```js
import { isSupported } from 'contact-picker';

if (isSupported()) {
  // Contacts API supported
}
```

Get available properties:

```js
import { getProperties } from 'contact-picker';

const props = await getProperties();
```

Bind picker to button:

```js
import { bindTo } from 'contact-picker';

const button = document.getElementById('pick-contact');

bindTo(button, {
  callback: contacts => {
    // contacts selected
  }
});
```

## Usage CJS

Check if Contacts API is supported:

```js
const contactPicker = require('contact-picker');

if (contactPicker.isSupported()) {
  // Contacts API supported
}
```

Get available properties:

```js
const contactPicker = require('contact-picker');

const props = await contactPicker.getProperties();
```

Bind picker to button:

```js
const contactPicker = require('contact-picker');

const button = document.getElementById('pick-contact');

contactPicker.bindTo(button, {
  callback: contacts => {
    // contacts selected
  }
});
```

## API

### isSupported()

Checks if Contacts API is supported in the browser.

Returns true or false.

### getProperties()

Gets the available contact properties that can be requested.

Returns a Promise resolving to an array of property keys like ['name', 'email'].

### bindTo(element, options)

Binds contact picker invocation to an element's click event.

- element - The element to bind the click handler to
- options - Options like callback
  - callback - Callback when contacts are selected

### getContacts(options)

Directly invokes the contact picker API to get contacts.

- options - Options like properties, callback etc.
  - props - Contact properties to request
  - options - Picker options like multiple
  - callback - Callback when contacts are selected

Returns a Promise resolving to the array of selected contacts.

## Browser Compatibility

The Contacts API is supported in modern browsers.

https://caniuse.com/contacts-api

## License

MIT
