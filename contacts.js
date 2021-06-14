const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

const list = async () => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

async function listContacts() {
  try {
    console.table(await list());
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await list();

    const contact = contacts.find(({ id }) => id === Number(contactId));

    console.table(contact);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await list();

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );

    const newContacts = fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts)
    );

    listContacts();
    return newContacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await list();

    // Правильная последовательность id работает только в случае с правильным порядком элементов
    const newContact = {
      id: contacts.length + 1,
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    const newContacts = await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts)
    );
    listContacts();
    return newContacts;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
