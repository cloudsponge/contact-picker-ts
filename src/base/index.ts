import type { ContactManagerProps, Contacts, IExtra } from './types';

declare global {
  interface Navigator {
    contacts?: Contacts;
  }
}

/**
 * Checks if the contact picker is using HTTPS protocol.
 *
 * @param opts - The configuration options.
 * @returns Whether HTTPS is being used.
 */
function isHttps(opts: IExtra['conf']['errors']): boolean {
  if (!opts || typeof opts !== 'object') {
    throw new Error('Invalid opts parameter');
  }

  if (window.location.protocol === 'https:') return true;
  if (opts?.silence !== true) console.error('HTTPS is required, please refresh the page using HTTTPs protocol.');
  return false;
}

/**
 * Gets contacts from the device's contacts list.
 *
 * @param conf - Configuration options.
 * @param conf.props - Contact properties to select. Default ['name', 'email', 'tel', 'address', 'icon'].
 * @param conf.options - Contact picker options. Default {multiple: true}.
 * @param callback - Callback function to handle the results.
 * @returns Promise resolving to the selected contacts, or calls the callback.
 */
export async function getContacts(conf?: IExtra['conf'], callback?: IExtra['callback']) {
  if (conf && typeof conf !== 'object') {
    throw new Error('Invalid conf parameter');
  }

  if (callback && typeof callback !== 'function') {
    throw new Error('Invalid callback parameter');
  }

  if (!isSupported({ silence: conf?.errors?.silence || true })) return;

  const props = conf?.props || await getProperties();
  const options = conf?.options || { multiple: true };

  const contacts = await navigator.contacts.select(props, options);

  if (callback) return callback(contacts);
  return contacts;
}

/**
 * Checks if the contact picker API is supported by the current browser.
 *
 * @param opts - Options to control error handling.
 * @returns True if contact picker is supported, false otherwise.
 */
export function isSupported(opts: IExtra['conf']['errors'] = { silence: true }): boolean {
  if (!opts || typeof opts !== 'object') {
    throw new Error('Invalid opts parameter');
  }

  if ('contacts' in navigator && 'ContactsManager' in window) return true;
  if (opts?.silence !== true) console.error('Contact Picker API not supported for this browser.');
  return false;
}

/**
 * Binds the contact picker API to the provided element, with optional configuration.
 * Checks for HTTPS and browser support, then adds a event handler to get contacts.
 * Passes configuration and callback to getContacts() helper.
 */
export function eventBind(el: HTMLElement, event: string, extra: IExtra): void {
  const silence = !!extra?.conf?.errors?.silence;
  isHttps({ silence });
  isSupported({ silence });
  el.addEventListener(event, async () => await getContacts(extra?.conf, extra?.callback));
}

/**
 * Binds the contact picker API to the provided element, with optional configuration.
 * Checks for HTTPS and browser support, then adds a click handler to get contacts.
 * Passes configuration and callback to getContacts() helper.
 */
export function clickBind(el: HTMLElement, extra: IExtra): void {
  return eventBind(el, 'click', extra);
}

/**
 * Gets the supported Contact Picker properties for the current browser.
 * Checks that the API is supported before getting properties.
 * Returns a Promise resolving to the supported properties.
 */
export async function getProperties(): Promise<ContactManagerProps> {
  isSupported();
  return await navigator.contacts.getProperties();
}

export default { getProperties, isSupported, eventBind, clickBind, getContacts };
