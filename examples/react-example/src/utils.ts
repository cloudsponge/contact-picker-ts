export type Contact = {
  email: string[];
  name: string[];
  tel: string[];
  address: {
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
  }[];
  icon: Blob[];
}

export interface csEmail {
  address: string;
  type: string; // Depends on address book source
}

export interface csPhone {
  number: string;
  type: string; // Depends on address book source
}

export interface csAddress {
  formatted?: string; // Full address with line breaks
  street?: string;
  city?: string;
  region?: string;
  country?: string;
  postal_code?: string;
  type?: string; // Depends on address book source
}

export interface csContact {
  first_name: string;
  last_name: string;
  email: csEmail[];
  phone: csPhone[];
  address?: csAddress[] | undefined;
  job_title?: string;
  companies?: string[];
  groups?: string[];
  dob?: string; // YYYY-MM-DD
  birthday?: string; // MM-DD
}

export function cloudspongeContactsParser(contacts: Contact[]): csContact[] {
  return contacts.map((contact: Contact): csContact => {
    // Extract first Valid Name
    const csName = contact.name.find(nm => nm != null && nm.trim() !== "") || "";

    //Formatting Emails array
    const csEmails = contact.email.map(email => ({ address: email, type: "" }));

    //Formatting Phones array
    const csPhones = contact.tel.map(phone => ({ number: phone, type: "" }));

    //Formatting Addresses array
    const csAddress = contact.address.map(address => ({
      formatted: address.addressLine.join("\r\n"),
      street: address.addressLine[0].split("\n")[0],
      city: address.city,
      region: address.region,
      country: address.contry,
      postal_code: address.postalCode,
      type: ""
    }));

    // Return Cloudsponge Contacts 
    return {
      first_name: csName.split(" ").slice(0)[0],
      last_name: csName.split(" ").slice(-1)[0],
      email: csEmails,
      phone: csPhones,
      address: csAddress,
      job_title: "",
      companies: [],
      groups: [],
      dob: "",
      birthday: ""
    };
  });
}
