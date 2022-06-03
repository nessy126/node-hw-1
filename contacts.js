const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, './db/contacts.json')

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

const listContacts = async () => {
  console.log("listContacts");
  const list = JSON.parse(await fs.readFile(contactsPath))
  return list;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(contact => contact.id === contactId)
  if (!contact) {
    return null;
  }
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(contact => contact.id === contactId)
  if (index === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(index, 1)

  await updateContacts(contacts)

  return removedContact;
}

const addContact = async (name, email, phone) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  }

  const contacts = await listContacts();
  contacts.push(newContact)
  updateContacts(contacts)
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}