import React, { useState, useEffect } from 'react';
import { sectionType, contactType } from '~/components/Types';
import { produce } from 'immer';
import InputContact from './InputContact';
import UUID from '../Shared/UUID';
import useStore from '../../store/RepoLocalStorage';

const title = 'Contacts';

const contact: contactType = {
  id: UUID(),
  title: 'Contact 1',
  email: 'example@xyz.com',
  phone: '000-111-2222',
  website: 'example.com',
  address: 'Somewhere in the world',
  facebook: 'https://www.facebook.com/',
  twitter: 'https://twitter.com/',
  linkedin: 'https://www.linkedin.com/',
  github: 'https://www.github.com/',
};

export default function ContactBuilder({ section }: { section: sectionType }) {
  // const [contacts, updateContacts] = React.useState<contactType[]>([contact]);
  const { contacts, updateContacts } = useStore();
  const [isAddingContact, setIsAddingContact] = React.useState<boolean>(false);

  const handleAddContact = () => {
    setIsAddingContact(true);
  };

  useEffect(() => {
    if (contacts.length === 0) {
      handleGetContacts();
      return;
    }
  }, []);

  // write a function to call api and get headers and set them in state
  const handleGetContacts = async () => {
    const response = await fetch('http://localhost:3000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 1 }),
    });

    if (response.ok) {
      const data = await response.json();

      updateContacts(data);
    } else {
      // Handle login failure
      const errorData = await response.json();
      console.error('API call failed: ', errorData);
      alert('Retrieve data failed. Please check again.');
    }
  };

  const updateContact = (contact: contactType) => {
    const index = contacts.findIndex((ct) => ct.id === contact.id);
    if (index !== -1) {
      // Update existing contact
      const newData = produce(contacts, (draft) => {
        draft[index] = contact;
      });
      updateContacts(newData);
    } else {
      // Add new contact
      const newData = produce(contacts, (draft) => {
        draft.push(contact);
      });
      updateContacts(newData);
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
    updateContacts(newData);
  };

  const renderContacts = () => {
    const rows = [];
    for (let i = 0; i < contacts.length; i++) {
      rows.unshift(
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
      rows.unshift(
        <InputContact
          key="new"
          contact={{
            id: UUID(),
            title: '',
            email: '',
            phone: '',
            website: '',
            address: '',
            facebook: '',
            twitter: '',
            linkedin: '',
            github: '',
          }}
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
          <div className="section-title">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => {
                handleAddContact();
              }}
            >
              Add
            </button>
          </div>
          <div>{renderContacts()}</div>
        </div>
      </div>
    </div>
  );
}
