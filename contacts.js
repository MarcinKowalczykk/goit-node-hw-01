const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function readContactsFile() {
  const data = fs.readFileSync(contactsPath, 'utf-8');
  return JSON.parse(data);
}

function writeContactsFile(contacts) {
  const data = JSON.stringify(contacts, null, 2);
  fs.writeFileSync(contactsPath, data);
}

function listContacts() {
  const contacts = readContactsFile();
  console.table(contacts);
}

function getContactById(contactId) {
  const contacts = readContactsFile();
  const contact = contacts.find((c) => c.id === contactId);
  console.log(contact);
}

function removeContact(contactId) {
  let contacts = readContactsFile();
  contacts = contacts.filter((c) => c.id !== contactId);
  writeContactsFile(contacts);
  console.log('Contact removed successfully');
}

function addContact(name, email, phone) {
  const contacts = readContactsFile();
  const newContact = {
    id: generateId(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  writeContactsFile(contacts);
  console.log('Contact added successfully');
}

function generateId() {
  return Math.random().toString(36).substr(2, 10);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
