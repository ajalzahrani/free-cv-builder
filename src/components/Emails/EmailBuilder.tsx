import React, { useState } from 'react';
import { emailFormType } from '../Types';
import { produce } from 'immer';
import InputEmail from './InputEmail';
import UUID from '../Shared/UUID';
import useStore from '../../store/RepoLocalStorage';
import EmailTemplate from './EmailTemplate';

const title = 'Emails';

const email: emailFormType[] = [];

export default function EmailBuilder() {
  const [emails, updateEmails] = useState<emailFormType[]>([]);
  const [isAddingEmail, setIsAddingEmail] = useState<boolean>(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [dialogData, setDialgoData] = React.useState<string>('');

  const handleAddEmail = () => {
    setIsAddingEmail(true);
  };

  const updateEmail = (email: emailFormType) => {
    const index = emails.findIndex((em) => em.id === email.id);
    if (index !== -1) {
      // Update existing email
      const newData = produce(emails, (draft) => {
        draft[index] = email;
      });
      updateEmails(newData);
    } else {
      // Add new email
      const newData = produce(emails, (draft) => {
        draft.push(email);
      });
      updateEmails(newData);
    }
  };

  const handleSaveEmail = (email: emailFormType) => {
    updateEmail(email);
    setIsAddingEmail(false);
  };

  const handleCancelEmail = () => {
    setIsAddingEmail(false);
  };

  const handleDeleteEmail = (id: string) => {
    const newData = produce(emails, (draft) => {
      const index = draft.findIndex((em) => em.id === id);
      if (index !== -1) draft.splice(index, 1);
      else handleCancelEmail();
    });
    updateEmails(newData);
  };

  const handleShowTemplate = (id: string): void => {
    setShowDialog(true);
    const email = emails.find((email) => email.id === id);
    setDialgoData(email?.message || '');
  };

  const renderEmails = () => {
    const rows = [];
    for (let i = 0; i < emails.length; i++) {
      rows.push(
        <InputEmail
          key={i}
          email={emails[i]}
          onUpdateEmail={(updatedEmail: emailFormType) => updateEmail(updatedEmail)}
          onCancel={() => handleCancelEmail()}
          onDeleteEmail={(id: string) => handleDeleteEmail(id)}
          onShowTemplate={(id: any) => handleShowTemplate(id)}
        />,
      );
    }
    if (isAddingEmail) {
      rows.push(
        <InputEmail
          key="new"
          email={{
            id: UUID(),
            title: '',
            description: '',
            name: '',
            to: '',
            company: '',
            subject: '',
            position: '',
            message: '',
            isSent: false,
          }}
          onUpdateEmail={(newEmail: emailFormType) => handleSaveEmail(newEmail)}
          onCancel={() => setIsAddingEmail(false)}
          onDeleteEmail={(id: string) => handleDeleteEmail(id)}
          onShowTemplate={(id: any) => handleShowTemplate(id)}
        />,
      );
    }
    return rows;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {showDialog && <EmailTemplate onClose={() => setShowDialog(false)} email={dialogData} />}
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => {
              handleAddEmail();
            }}
          >
            Add
          </button>

          <div>{renderEmails()}</div>
        </div>
      </div>
    </div>
  );
}
