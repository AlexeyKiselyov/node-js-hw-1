import { nanoid } from "nanoid";
import fs from "fs/promises";

/*
 * Раскомментируй и запиши значение
 */
const contactsPath = "./db/contacts.json";

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
// listContacts();

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const parsedContacts = JSON.parse(data);
      const contact = parsedContacts.filter((cont) => cont.id === contactId);
      console.log(...contact);
    })
    .catch((error) => console.log(error.message));
}
// getContactById("10");

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
// removeContact("10");

async function addContact(name, email, phone) {
  const newContact = { id: nanoid(), name, email, phone };
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const newContacts = [...JSON.parse(contacts), newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  } catch (error) {
    console.log(error.massege);
  }
}
// addContact("Sam", "sam@ukr.net.ua", "(777) 777-7777");

export { listContacts, getContactById, removeContact, addContact };
