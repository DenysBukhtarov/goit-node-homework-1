const contactsActions = require("./contacts");

const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: Рефакторить

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsActions.listContacts();
      console.table(allContacts);
      break;

    case "get":
        const oneContact = await contactsActions.getContactById(id);
        console.table(oneContact);
      break;

    case "add":
        const addedContact = await contactsActions.addContact({ name, email, phone });
        console.table(addedContact);
      break;

    case "remove":
        const deleteContact = await contactsActions.removeContact(id);
        console.table(deleteContact);
      break;

    default:
    console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
