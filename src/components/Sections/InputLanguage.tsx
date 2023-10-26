import React from 'react';
import { languageType } from '~/components/types';

type InputLanguageProps = {
  language: languageType;
  onUpdateLanguage: (updatedLanguage: languageType) => void;
  onCancel: () => void;
  onDeleteLanguage?: (id: string) => void;
};

export default function InputLanguage({ language, onUpdateLanguage, onCancel, onDeleteLanguage }: InputLanguageProps) {
  const [isEditing, setIsEditing] = React.useState<boolean>(language.title.length === 0 ? true : false);

  const [updatedLanguage, setUpdatedLanguage] = React.useState<languageType>(language);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedLanguage((prevLanguage: any) => ({
      ...prevLanguage,
      [name]: value,
    }));
  };

  const handleUpdateLanguage = () => {
    onUpdateLanguage(updatedLanguage);
    setIsEditing(false);
  };

  const handleDeleteLanguage = () => {
    if (onDeleteLanguage) {
      onDeleteLanguage(language.id);
    }
  };

  return (
    <div className="mt-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{language.title}</h3>
        {!isEditing && (
          <button className="text-blue-500 hover:text-blue-700" onClick={() => setIsEditing(true)}>
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
            value={updatedLanguage.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={updatedLanguage.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleUpdateLanguage}
            >
              Save
            </button>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => onCancel()}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          {/* <p className="text-red-700">ENTRY ID: {language.id}</p> */}
          <p className="text-gray-700">{language.description}</p>
          {onDeleteLanguage && (
            <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteLanguage()}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
