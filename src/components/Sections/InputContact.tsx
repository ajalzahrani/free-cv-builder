import React, { useState } from 'react';
import { contactType } from '~/components/types';

type InputContactProps = {
  contact: contactType;
  onUpdateContact: (updatedContact: contactType) => void;
  onCancel: () => void;
  onDeleteContact?: (id: string) => void;
};

const InputContact: React.FC<InputContactProps> = ({ contact, onUpdateContact, onCancel, onDeleteContact }) => {
  const [isEditing, setIsEditing] = useState<boolean>(contact.name.length === 0 ? true : false);

  const [updatedContact, setUpdatedContact] = useState<contactType>(contact);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedContact((prevContact: any) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleUpdateContact = () => {
    onUpdateContact(updatedContact);
    setIsEditing(false);
  };

  const handleDeleteContact = () => {
    if (onDeleteContact) {
      onDeleteContact(contact.id);
    }
  };

  return (
    <div className="border rounded-lg mt-4 p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{contact.name}</h3>
        {!isEditing && (
          <button className="text-blue-500 hover:text-blue-700" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="mt-2">
          <label className="block font-bold mt-2 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedContact.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={updatedContact.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={updatedContact.phone}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="website">
            Website
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={updatedContact.website}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={updatedContact.address}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleUpdateContact}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => handleDeleteContact()}
            >
              Delete
            </button>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => onCancel()}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          {/* <p className="text-gray-700">{contact.name}</p> */}
          {onDeleteContact && (
            <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteContact()}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InputContact;
