const argv = require("yargs").argv;

const { processArgv } = require("yargs/build");
const contacts = require("./contacts")
console.log(contacts);

const invokeAction = async ({
  action,
  id,
  name,
  email,
  phone
}) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts()
        console.log(allContacts);
        break;

      case "get":
        const oneContact = await contacts.getContactById(id)
        console.log(oneContact);
        break;

      case "add":
        const newContact = await contacts.addContact(name, email, phone)
        console.log(newContact);
        break;

      case "remove":
        const removedContact = await contacts.removeContact(id);
        console.log(removedContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (err) {
    error.message = "listContacts error";
    throw new Error(err.message)
  }
}

// const actionIndex = process.argv.findIndex(item => item === "--action")
// if (actionIndex === -1) {
//   const action = process.argv[actionIndex + 1]
//   invokeAction({action})
// }

invokeAction(argv);

