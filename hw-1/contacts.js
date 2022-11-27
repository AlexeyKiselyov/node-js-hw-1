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
// getContactById("3");

async function removeContact(contactId) {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const newContacts = JSON.parse(contacts).filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath,JSON.stringify(newContacts));
}
// removeContact("10");

function addContact(name, email, phone) {
  // ...твой код
}
