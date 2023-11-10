import React, { useEffect, useState } from 'react';
import { emailDraftType, emailFormType } from '~/components/types';
import DraftCardPreivew from '../DraftCardPreivew';
import DraftCard from '../DraftCard';
import { email_drafts } from '~/store/EmailTamplates';

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
  const [dialogData, setDialgoData] = React.useState({});
  const [selectedCards, setSelectedCards] = React.useState<emailDraftType>({} as emailDraftType);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedEmail((prevEmail: any) => ({
      ...prevEmail,
      [name]: value,
    }));
  };

  const handlePreviewCard = (arg0: { data: any }): void => {
    setShowDialog(true);
    setDialgoData(arg0.data);
  };

  const handleUpdateEmail = () => {
    onUpdateEmail(updatedEmail);
    setIsEditing(false);
  };

  const handleCancelEmail = () => {
    setIsEditing(false);
    onCancel();
  };

  const handleCardSelection = (arg0: { type: string; data: emailDraftType }): void => {
    setSelectedCards(arg0.data);
  };

  const handleUpdateUpdatedEmail = () => {
    setUpdatedEmail((prevEmail: any) => ({
      ...prevEmail,
      ...selectedCards,
    }));
  };

  useEffect(() => {
    handleUpdateUpdatedEmail();
  }, [selectedCards.message]);

  return (
    <div className="border rounded-lg mt-4 p-4 mb-4">
      {showDialog && <DraftCardPreivew onClose={() => setShowDialog(false)} data={dialogData} />}
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
          <label className="block font-bold mt-2 mb-2" htmlFor="to">
            To
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value={updatedEmail.to}
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
          <label className="block font-bold mt-2 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedEmail.name}
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
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={updatedEmail.message}
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

          {email_drafts.map((draft) => (
            <div className="mt-2" key={draft.id}>
              {
                <DraftCard
                  section={draft}
                  onShow={() => handlePreviewCard({ data: draft })}
                  onAdd={() => handleCardSelection({ type: 'email', data: draft })}
                />
              }
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-2">
          <p className="text-gray-700">{email.description}</p>
          <p className="text-gray-700">
            Sender: {email.name} ({email.to})
          </p>
          <p className="text-gray-700">
            Receiver: {email.name} ({email.to})
          </p>
          <p className="text-gray-700">
            Company: {email.company} {email.company}
          </p>
          <p className="text-gray-700">Subject: {email.subject}</p>
          <p className="text-gray-700">Is Sent: {email.isSent ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default InputEmail;
