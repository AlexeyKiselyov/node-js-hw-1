const uniqid = require('uniqid');
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const parsedContacts = JSON.parse(data);
      const contact = parsedContacts.find((cont) => cont.id === contactId);
      console.log(contact||null);
    })
    .catch((error) => console.log(error.message));
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const newContacts = JSON.parse(contacts).filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  } catch (error) {
    console.log(error.massege);
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: uniqid(), name, email, phone };
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const newContacts = [...JSON.parse(contacts), newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  } catch (error) {
    console.log(error.massege);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
