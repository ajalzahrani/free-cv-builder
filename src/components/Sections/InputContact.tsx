import React, { useState } from 'react';
import { contactType } from '~/components/Types';

type InputContactProps = {
  contact: contactType;
  onUpdateContact: (updatedContact: contactType) => void;
  onCancel: () => void;
  onDeleteContact: (id: string) => void;
};

const InputContact: React.FC<InputContactProps> = ({ contact, onUpdateContact, onCancel, onDeleteContact }) => {
  const [isEditing, setIsEditing] = useState<boolean>(contact.title.length === 0 ? true : false);

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
    <div className="builders-element">
      <div className="section-title">
        <h3 className="text-lg font-bold">{contact.title}</h3>
        {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
      </div>
      {isEditing ? (
        <div className="builders-input">
          <label className="block font-bold mt-2 mb-2" htmlFor="title">
            Title
          </label>
          <input type="text" id="title" name="title" value={updatedContact.title} onChange={handleInputChange} />
          <label className="block font-bold mt-2 mb-2" htmlFor="email">
            Email
          </label>
          <input type="text" id="email" name="email" value={updatedContact.email} onChange={handleInputChange} />
          <label className="block font-bold mt-2 mb-2" htmlFor="phone">
            Phone
          </label>
          <input type="text" id="phone" name="phone" value={updatedContact.phone} onChange={handleInputChange} />
          <label className="block font-bold mt-2 mb-2" htmlFor="website">
            Website
          </label>
          <input type="text" id="website" name="website" value={updatedContact.website} onChange={handleInputChange} />
          <label className="block font-bold mt-2 mb-2" htmlFor="address">
            Address
          </label>
          <input type="text" id="address" name="address" value={updatedContact.address} onChange={handleInputChange} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
        <div className="">
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
