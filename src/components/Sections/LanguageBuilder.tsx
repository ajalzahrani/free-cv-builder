import React, { useEffect } from 'react';
import { sectionType, languageType } from '~/components/Types';
import { produce } from 'immer';
import InputLanguage from './InputLanguage';
import UUID from '../Shared/UUID';
import useStore from '../../store/RepoLocalStorage';

const title = 'Languages';

const language: languageType = {
  id: UUID(),
  title: 'Spanish',
  description: 'Fluent',
};

export default function LanguageBuilder({ section }: { section: sectionType }) {
  // const [languages, updateLanguages] = React.useState<languageType[]>([language]);
  const { languages, updateLanguages } = useStore();
  const [isAddingLanguage, setIsAddingLanguage] = React.useState<boolean>(false);

  useEffect(() => {
    if (languages.length === 0) {
      handleGetLanguages();
      return;
    }
  }, []);

  // write a function to call api and get headers and set them in state
  const handleGetLanguages = async () => {
    const response = await fetch('http://localhost:3000/api/cv/languages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 1 }),
    });

    if (response.ok) {
      let data = await response.json();

      updateLanguages(data);
    } else {
      // Handle login failure
      const errorData = await response.json();
      console.error('API call failed: ', errorData);
      alert('Retrieve data failed. Please check again.');
    }
  };

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
      updateLanguages(newData);
    } else {
      // Add new language
      const newData = produce(languages, (draft) => {
        draft.push(language);
      });
      updateLanguages(newData);
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
      if (index !== -1) draft.splice(index, 1);
      else handleCancelLanguage();
    });
    updateLanguages(newData);
  };

  const renderLanguages = () => {
    const rows = [];
    for (let i = 0; i < languages.length; i++) {
      rows.unshift(
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
      rows.unshift(
        <InputLanguage
          key="new"
          language={{ id: UUID(), title: '', description: '' }}
          onUpdateLanguage={(newLanguage: languageType) => handleSaveLanguage(newLanguage)}
          onCancel={() => setIsAddingLanguage(false)}
          onDeleteLanguage={(id: string) => handleDeleteLanguage(id)}
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
            <h2>{title}</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => {
                handleAddLanguage();
              }}
            >
              Add
            </button>
          </div>

          <div>{renderLanguages()}</div>
        </div>
      </div>
    </div>
  );
}
