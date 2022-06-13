const argv = require("yargs").argv;
const contactsFunctions = require("./contacts")

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
        const allContacts = await contactsFunctions.listContacts()
        console.log(allContacts);
        break;

      case "get":
        const oneContact = await contactsFunctions.getContactById(id)
        console.log(oneContact);
        break;

      case "add":
        const newContact = await contactsFunctions.addContact(name, email, phone)
        console.log(newContact);
        break;

      case "remove":
        const removedContact = await contactsFunctions.removeContact(id);
        console.log(removedContact);
        break;

      default:
        console.log("\x1B[31m Unknown action type!");
    }
  } catch (err) {
    error.message = "listContacts error";
    throw new Error(err.message)
  }
}

const actionIndex = process.argv.findIndex(item => item === "--action")
if (actionIndex === -1) {
  const action = process.argv[actionIndex + 1]
  invokeAction({action})
}

invokeAction(argv);

