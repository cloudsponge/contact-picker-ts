export type Address = {
  contry: string;
  addressLine: string[];
  region: string;
  city: string;
  dependentLocality: string;
  postalCode: string;
  sortingCode: string;
  organization: string;
  recipient: string;
  phoneNumber: string;
}

export type Contact = {
  email: string[];
  name: string[];
  tel: string[];
  address: Address[]
  icon: Blob[];
}

export type ContactManagerProp = keyof Contact;
export type ContactManagerProps = ContactManagerProp[];
export type ContactManagerOptions = { multiple?: boolean };

export interface ContactsManager {
  getProperties: () => Promise<ContactManagerProps>
  select: (
    properties: ContactManagerProps,
    options?: ContactManagerOptions
  ) => Promise<Contact[]>
};

export interface IExtra {
  conf?: {
    errors?: { silence?: boolean }
    props?: ContactManagerProp[]
    options?: ContactManagerOptions
  }
  callback?: (contacts?: Contact[]) => void
};

export interface Contacts extends ContactsManager {
  ContactsManager: ContactsManager
};
