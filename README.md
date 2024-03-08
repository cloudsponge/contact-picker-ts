# Contact Picker

A simple utility to pick contacts using the Contacts API in the browser.

## Installation

```
npm install contact-picker-ts
```

## Usage ESM

Check if Contacts API is supported:

```js
import { isSupported } from 'contact-picker-ts';

if (isSupported()) {
  // Contacts API supported
}
```

Get available properties:

```js
import { getProperties } from 'contact-picker-ts';

const props = await getProperties();
```

Bind picker to button:

```js
import { clickBind } from 'contact-picker-ts';

const button = document.getElementById('pick-contact');

clickBind(button, {
  callback: contacts => {
    // contacts selected
  }
});
```

## Usage CJS

Check if Contacts API is supported:

```js
const contactPicker = require('contact-picker-ts');

if (contactPicker.isSupported()) {
  // Contacts API supported
}
```

Get available properties:

```js
const contactPicker = require('contact-picker-ts');

const props = await contactPicker.getProperties();
```

Bind picker to input:

```js
const contactPicker = require('contact-picker-ts');

const input = document.getElementById('pick-contact-input');

contactPicker.eventBind(input, 'focus', {
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

### eventBind(element, event ,options)

Binds contact picker invocation to an element's event.

- element - The element to bind the event handler to
- event - The event to trigger the action
- options - Options like callback
  - callback - Callback when contacts are selected

### clickBind(element, options)

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

## References

https://www.cloudsponge.com/blog/mobile-address-book-and-contact-picker-api-experiment/

## Browser Compatibility

The Contacts API is supported in modern browsers.

https://caniuse.com/contacts-api

## License

MIT
