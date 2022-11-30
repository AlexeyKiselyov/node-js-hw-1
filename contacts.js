const uniqid = require("uniqid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function writeContacts(contacts) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.log(error.message);
  }
}

// -------------ContactsFunctions--------------------

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  const id = Number.isFinite(contactId) ? JSON.stringify(contactId) : contactId;
  const contacts = await listContacts();
  const contact = contacts.find((cont) => cont.id === id);
  return contact || null;
}

async function removeContact(contactId) {
  const id = Number.isFinite(contactId) ? JSON.stringify(contactId) : contactId;
  const contacts = await listContacts();
  const contactForDeleteId = contacts.findIndex((contact) => contact.id === id);
  if (contactForDeleteId === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(contactForDeleteId, 1);
  await writeContacts(contacts);
  return removeContact;
}

async function addContact(name, email, phone) {
  const newContact = { id: uniqid(), name, email, phone };
  const contacts = await listContacts();
  const newContacts = [...contacts, newContact];
  await writeContacts(newContacts);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
