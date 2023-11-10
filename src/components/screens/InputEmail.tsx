import React, { useState } from 'react';
import { emailFormType } from '~/components/types';

type InputContactProps = {
  email: emailFormType;
  onUpdateEmail: (updatedEmail: emailFormType) => void;
  onCancel: () => void;
  onDeleteEmail: (id: string) => void;
};

const InputEmail: React.FC<InputContactProps> = ({ email, onUpdateEmail, onCancel, onDeleteEmail }) => {
  const [isEditing, setIsEditing] = useState<boolean>(email.title.length === 0 ? true : false);

  const [updatedEmail, setUpdatedEmail] = useState<emailFormType>(email);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedEmail((prevContact: any) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleUpdateEmail = () => {
    onUpdateEmail(updatedEmail);
    setIsEditing(false);
  };

  const handleCancelEmail = () => {
    setIsEditing(false);
    onCancel();
  };

  return (
    <div className="border rounded-lg mt-4 p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{email.title}</h3>
        {!isEditing && (
          <button
            className="text-blue-500 hover:text-blue-700 py-1 px-3 rounded bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="mt-2">
          <label className="block font-bold mt-2 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedEmail.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={updatedEmail.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="sender">
            Sender
          </label>
          <input
            type="text"
            id="sender"
            name="sender"
            value={updatedEmail.sender.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="receiver">
            Receiver
          </label>
          <input
            type="text"
            id="receiver"
            name="receiver"
            value={updatedEmail.receiver.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="subject">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={updatedEmail.subject}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleUpdateEmail}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => onDeleteEmail(email.id)}
            >
              Delete
            </button>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => handleCancelEmail()}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <p className="text-gray-700">{email.description}</p>
          <p className="text-gray-700">
            Sender: {email.sender.name} ({email.sender.email})
          </p>
          <p className="text-gray-700">
            Receiver: {email.receiver.name} ({email.receiver.email})
          </p>
          <p className="text-gray-700">
            Company: {email.receiver.company} {email.receiver.company}
          </p>
          <p className="text-gray-700">Subject: {email.subject}</p>
          <p className="text-gray-700">Is Sent: {email.isSent ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default InputEmail;
