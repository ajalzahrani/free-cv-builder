import React, { useState } from 'react';
import { contactType } from '~/components/types';

type InputContactProps = {
  contact: contactType;
  onUpdateContact: (updatedContact: contactType) => void;
  onCancel: () => void;
  onDeleteContact: (id: string) => void;
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

  const handleCancelContact = () => {
    setIsEditing(false);
    onCancel();
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
          <div className="flex justify-between">
            <div className="w-full">
              <label className="block font-bold mt-2 mb-2" htmlFor="linkedin">
                Linkedin
              </label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                value={updatedContact.linkedin}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full">
              <label className="block font-bold mt-2 mb-2 ml-2" htmlFor="twitter">
                twitter
              </label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                value={updatedContact.twitter}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 ml-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-full">
              <label className="block font-bold mt-2 mb-2" htmlFor="facebook">
                Facebook
              </label>
              <input
                type="text"
                id="facebook"
                name="facebook"
                value={updatedContact.facebook}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full">
              <label className="block font-bold mt-2 mb-2 ml-2" htmlFor="github">
                Github
              </label>
              <input
                type="text"
                id="github"
                name="github"
                value={updatedContact.github}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full ml-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleUpdateContact}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => onDeleteContact(contact.id)}
            >
              Delete
            </button>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => handleCancelContact()}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          {/* <p className="text-red-700">ENTERY ID: {experience.id}</p> */}

          {/* <p className="text-gray-700">{contact.name}</p> */}
          <p className="text-gray-700">{contact.email}</p>
          <p className="text-gray-700">
            {contact.phone} - {contact.website}
          </p>
          <p className="text-gray-700">{contact.address}</p>
          <p className="text-gray-700">{contact.twitter}</p>
          <p className="text-gray-700">{contact.facebook}</p>
          <p className="text-gray-700">{contact.linkedin}</p>
          <p className="text-gray-700">{contact.github}</p>
        </div>
      )}
    </div>
  );
};

export default InputContact;
