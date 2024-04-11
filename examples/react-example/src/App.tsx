import { useEffect } from 'react';
import './App.css';
import { Contact, cloudspongeContactsParser } from './utils';
import { clickBind, eventBind } from '@cloudsponge/contact-picker-ts';

function App() {
  useEffect(() => {
    // This parser will transform the contacts and return it in an
    // array using the cloudsponge format structure
    const contactsParser = (contacts: Contact[]) => {
      // Transformation of Contacts Picker API contacts to Cloudsponge Contacts type
      const csContacts = cloudspongeContactsParser(contacts);

      // Appending contacts parsed to results element in the page
      const results = document.getElementById('results') as HTMLElement;
      results.innerHTML = JSON.stringify(csContacts, null, 2);
    };

    // This parser will get the array of contacts, extract the email addresses array
    // in th end it returns and array of arrays with we flat and join into a string
    // separated by commas, and append to the input field
    const contactsParserInput = (contacts: Contact[]) => {
      // Appending contacts parsed to results element in the page
      const results = document.getElementById('myInput') as HTMLInputElement;
      results.value = contacts
        .map(contact => contact.email)
        .flat(Infinity)
        .join(', ');
    };

    // get Button Element to bind 'click' event
    const el = document.getElementById('myContacts');

    // get Input Element to bind 'focus' event
    const el2 = document.getElementById('myInput');

    // bind Click event
    clickBind(el, {
      conf: { errors: { silence: true } },
      callback: contactsParser
    });

    // bind generic event (focus)
    eventBind(el2, 'focus', {
      conf: { errors: { silence: true } },
      callback: contactsParserInput
    });
  }, []);

  return (
    <>
      <h2>contact-picker-ts</h2>
      <div className="card">
        <label htmlFor="myInput">Contacts Input</label>
        <input id="myInput" type="text" />
      </div>

      <div className="card">
        <button id="myContacts">Show Contacts</button>
      </div>
      <div>
        <pre id="results"></pre>
      </div>
      <hr />
    </>
  );
}

export default App;
