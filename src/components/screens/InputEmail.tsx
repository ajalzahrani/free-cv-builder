import React, { useEffect, useState } from 'react';
import { emailDraftType, emailFormType, headerType } from '~/components/types';
import DraftCardPreivew from '../DraftCardPreivew';
import EmailTemplate from './EmailTemplate';
import DraftCard from '../DraftCard';
import email_drafts from '~/store/EmailTamplates';
import useStore from '~/store/RepoLocalStorage';

type InputContactProps = {
  email: emailFormType;
  onUpdateEmail: (updatedEmail: emailFormType) => void;
  onCancel: () => void;
  onDeleteEmail: (id: string) => void;
  onShowTemplate: (id: emailFormType['id']) => void;
};

const InputEmail: React.FC<InputContactProps> = ({ email, onUpdateEmail, onCancel, onDeleteEmail, onShowTemplate }) => {
  const [isEditing, setIsEditing] = useState<boolean>(email.title.length === 0 ? true : false);
  const [updatedEmail, setUpdatedEmail] = useState<emailFormType>(email);

  const [showDialog, setShowDialog] = React.useState(false);
  const [dialogData, setDialgoData] = React.useState('');

  const contacts = useStore((state) => state.contacts);
  const headers = useStore((state) => state.headers);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedEmail((prevEmail: any) => ({
      ...prevEmail,
      [name]: value,
    }));
  };

  const handleCancelEmail = () => {
    setIsEditing(false);
    onCancel();
  };

  const handleSaveEmail = () => {
    handleSelectEmailTamplate({ type: 'email', data: updatedEmail.message });
    setUpdatedEmail((prevEmail: emailFormType) => {
      const updatedEmail = { ...prevEmail };
      onUpdateEmail(updatedEmail);
      return updatedEmail;
    });
    setIsEditing(false);
  };

  const handlePreviewCard = (arg0: { data: any }): void => {
    setShowDialog(true);
    setDialgoData(arg0.data);
  };

  const handleSelectEmailTamplate = (arg0: { type: string; data: any }): void => {
    setUpdatedEmail((prevEmail: any) => {
      const updatedEmail = {
        ...prevEmail,
        message: updateMessage(arg0.data, prevEmail),
      };
      return updatedEmail;
    });
  };

  const updateMessage = (message: string, updatedEmail: any) => {
    // Update message string with input fields values
    const updatedMessage = message
      .replace(/#to_name#/g, updatedEmail.name || 'Hiring Manager')
      .replace(/#from_name#/g, headers[0].name)
      .replace(/#from_phone#/g, contacts[0].phone)
      .replace(/#from_email#/g, contacts[0].email)
      .replace(/#from_linkedin#/g, contacts[0].linkedin || '')
      .replace(/#position#/g, updatedEmail.position)
      .replace(/#company#/g, updatedEmail.company);

    return updatedMessage;
  };

  useEffect(() => {
    setUpdatedEmail((prevEmail: any) => ({
      ...prevEmail,
      message: updateMessage(prevEmail.message, prevEmail),
    }));
  }, [updatedEmail.name, updatedEmail.position, updatedEmail.company, headers, contacts]);

  return (
    <div className="border rounded-lg mt-4 p-4 mb-4">
      {/* {showDialog && <DraftCardPreivew onClose={() => setShowDialog(false)} data={dialogData} />} */}
      {showDialog && <EmailTemplate onClose={() => setShowDialog(false)} email={dialogData} />}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{email.title}</h3>
        <button
          className="text-blue-500 hover:text-blue-700 mr-2 py-1 px-3 rounded bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
          onClick={() => onShowTemplate(updatedEmail.id)}
        >
          Show
        </button>
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
          <label className="block font-bold mt-2 mb-2" htmlFor="to">
            To
          </label>
          <input
            placeholder="email@emailcompany.com"
            type="text"
            id="to"
            name="to"
            value={updatedEmail.to}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="name">
            Interviewer Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedEmail.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="position">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={updatedEmail.position}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label className="block font-bold mt-2 mb-2" htmlFor="company">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={updatedEmail.company}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="message">
            Email Message
          </label>
          {email_drafts.map((draft, id) => (
            <div className="mt-4" key={id}>
              {
                <DraftCard
                  section={{ draft: draft, title: draft.substring(0, 20) }}
                  onShow={() => handlePreviewCard({ data: draft })}
                  onAdd={() => handleSelectEmailTamplate({ type: 'email', data: draft })}
                />
              }
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleSaveEmail}
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
          <p className="text-gray-700">Description: {email.description}</p>

          <p className="text-gray-700">
            Sender: {headers[0].name} ({contacts[0].email})
          </p>
          <p className="text-gray-700">Subject: {email.subject}</p>
          <p className="text-gray-700">
            Receiver: {email.name} ({email.to})
          </p>
          <p className="text-gray-700">Position: {email.position}</p>
          <p className="text-gray-700">Company: {email.company.length === 0 ? '' : email.company}</p>
          <p className="text-gray-700">Is Sent: {email.isSent ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default InputEmail;
