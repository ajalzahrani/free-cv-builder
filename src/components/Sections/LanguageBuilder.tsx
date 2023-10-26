import React from 'react';
import { sectionType, languageType } from '~/components/types';
import { produce } from 'immer';
import InputLanguage from './InputLanguage';
import UUID from '../shared/UUID';

const title = 'Languages';

const language: languageType = {
  id: UUID(),
  title: 'Spanish',
  description: 'Fluent',
};

export default function LanguageBuilder({ section }: { section: sectionType }) {
  const [languages, setLanguages] = React.useState<languageType[]>([language]);
  const [isAddingLanguage, setIsAddingLanguage] = React.useState<boolean>(false);

  const handleAddLanguage = () => {
    setIsAddingLanguage(true);
  };

  const updateLanguage = (language: languageType) => {
    const index = languages.findIndex((lang) => lang.id === language.id);
    if (index !== -1) {
      // Update existing language
      const newData = produce(languages, (draft) => {
        draft[index] = language;
      });
      setLanguages(newData);
    } else {
      // Add new language
      const newData = produce(languages, (draft) => {
        draft.push(language);
      });
      setLanguages(newData);
    }
  };

  const handleSaveLanguage = (language: languageType) => {
    updateLanguage(language);
    setIsAddingLanguage(false);
  };

  const handleCancelLanguage = () => {
    setIsAddingLanguage(false);
  };

  const handleDeleteLanguage = (id: string) => {
    const newData = produce(languages, (draft) => {
      const index = draft.findIndex((lang) => lang.id === id);
      draft.splice(index, 1);
    });
    setLanguages(newData);
  };

  const renderLanguages = () => {
    const rows = [];
    for (let i = 0; i < languages.length; i++) {
      rows.push(
        <InputLanguage
          key={i}
          language={languages[i]}
          onUpdateLanguage={(updatedLanguage: languageType) => updateLanguage(updatedLanguage)}
          onCancel={() => handleCancelLanguage()}
          onDeleteLanguage={(id: string) => handleDeleteLanguage(id)}
        />,
      );
    }
    if (isAddingLanguage) {
      rows.push(
        <InputLanguage
          key="new"
          language={{ id: UUID(), title: '', description: '' }}
          onUpdateLanguage={(newLanguage: languageType) => handleSaveLanguage(newLanguage)}
          onCancel={() => setIsAddingLanguage(false)}
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
              handleAddLanguage();
            }}
          >
            Add
          </button>
          <div>{renderLanguages()}</div>
        </div>
      </div>
    </div>
  );
}
