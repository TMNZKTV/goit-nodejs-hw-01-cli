const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(data);
    console.table(parsedContacts);
    return parsedContacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(data);

    const contact = parsedContacts.find(
      ({ id }) => id.toString() === contactId
    );
    console.table(contact);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(data).filter(
      ({ id }) => id.toString() !== contactId
    );

    const newContacts = await fs.writeFile(
      contactsPath,
      JSON.stringify(parsedContacts)
    );

    listContacts();
    return newContacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(data);

    const newContact = {
      id: parsedContacts.length + 1,
      name,
      email,
      phone,
    };

    parsedContacts.push(newContact);

    const newContacts = await fs.writeFile(
      contactsPath,
      JSON.stringify(parsedContacts)
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
