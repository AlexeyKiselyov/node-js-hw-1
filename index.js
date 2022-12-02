const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contactById = await getContactById(id);
      console.table(contactById);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const removeCont = await removeContact(id);
      console.table(removeCont);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
