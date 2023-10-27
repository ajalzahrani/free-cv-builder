import React from 'react';
import { sectionType, contactType } from '~/components/types';
import { produce } from 'immer';
import InputContact from './InputContact';
import UUID from '../shared/UUID';

const title = 'Contacts';

const contact: contactType = {
  id: UUID(),
  name: 'Contact 1',
  email: 'example@xyz.com',
  phone: '000-111-2222',
  website: 'example.com',
  address: 'Somewhere in the world',
  social: [],
};

export default function ContactBuilder({ section }: { section: sectionType }) {
  const [contacts, setContacts] = React.useState<contactType[]>([contact]);
  const [isAddingContact, setIsAddingContact] = React.useState<boolean>(false);

  const handleAddContact = () => {
    setIsAddingContact(true);
  };

  const updateContact = (contact: contactType) => {
    const index = contacts.findIndex((ct) => ct.id === contact.id);
    if (index !== -1) {
      // Update existing contact
      const newData = produce(contacts, (draft) => {
        draft[index] = contact;
      });
      setContacts(newData);
    } else {
      // Add new contact
      const newData = produce(contacts, (draft) => {
        draft.push(contact);
      });
      setContacts(newData);
    }
  };

  const handleSaveContact = (contact: contactType) => {
    updateContact(contact);
    setIsAddingContact(false);
  };

  const handleCancelContact = () => {
    setIsAddingContact(false);
  };

  const handleDeleteContact = (id: string) => {
    const newData = produce(contacts, (draft) => {
      const index = draft.findIndex((ct) => ct.id === id);
      if (index !== -1) draft.splice(index, 1);
      else handleCancelContact();
    });
    setContacts(newData);
  };

  const renderContacts = () => {
    const rows = [];
    for (let i = 0; i < contacts.length; i++) {
      rows.push(
        <InputContact
          key={i}
          contact={contacts[i]}
          onUpdateContact={(updatedContact: contactType) => updateContact(updatedContact)}
          onCancel={() => handleCancelContact()}
          onDeleteContact={(id: string) => handleDeleteContact(id)}
        />,
      );
    }
    if (isAddingContact) {
      rows.push(
        <InputContact
          key="new"
          contact={{ id: UUID(), name: '', email: '', phone: '', website: '', address: '', social: [] }}
          onUpdateContact={(newContact: contactType) => handleSaveContact(newContact)}
          onCancel={() => setIsAddingContact(false)}
          onDeleteContact={(id: string) => handleDeleteContact(id)}
        />,
      );
    }
    return rows;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => {
              handleAddContact();
            }}
          >
            Add
          </button>
          <div>{renderContacts()}</div>
        </div>
      </div>
    </div>
  );
}
