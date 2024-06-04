import React, { useEffect } from 'react';
import { educationType, section } from '~/components/types';
import { produce } from 'immer';
import UUID from '../shared/UUID';
import InputEducation from './InputEducation';
import useStore from '../../store/RepoLocalStorage';

const title = 'Academic Education';

const education: educationType = {
  id: UUID(),
  institution: 'MIT',
  degree: 'Bachelor of Science',
  location: 'San Francisco, CA',
  from: 'January 2019',
  to: 'Present',
  description: 'Developed and maintained web applications using React and Node.js.',
};

export default function EducationBuilder(section: section) {
  const [educations, updateEducations] = React.useState<educationType[]>([education]);
  // const { educations, updateEducations } = useStore();
  const [isAddingEducation, setIsAddingEducation] = React.useState<boolean>(false);

  useEffect(() => {
    handleGetEducations();
  }, []);

  // write a function to call api and get headers and set them in state
  const handleGetEducations = async () => {
    const response = await fetch('http://localhost:3000/educations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 1 }),
    });

    if (response.ok) {
      let data = await response.json();

      updateEducations(data);
    } else {
      // Handle login failure
      const errorData = await response.json();
      console.error('API call failed: ', errorData);
      alert('Retrieve data failed. Please check again.');
    }
  };

  const handleAddEducation = () => {
    setIsAddingEducation(true);
  };

  const updateEducation = (education: educationType) => {
    const index = educations.findIndex((edu) => edu.id === education.id);
    if (index !== -1) {
      // Update existing education
      const newData = produce(educations, (draft) => {
        draft[index] = education;
      });
      updateEducations(newData);
    } else {
      // Add new education
      const newData = produce(educations, (draft) => {
        draft.push(education);
      });
      updateEducations(newData);
    }
  };

  const handleSaveEducation = (education: educationType) => {
    updateEducation(education);
    setIsAddingEducation(false);
  };

  const handleCancelEducation = () => {
    setIsAddingEducation(false);
  };

  const handleDeleteEducation = (id: string) => {
    const newData = produce(educations, (draft) => {
      const index = draft.findIndex((edu) => edu.id === id);
      if (index !== -1) draft.splice(index, 1);
      else handleCancelEducation();
    });
    updateEducations(newData);
  };

  const renderEducation = () => {
    const rows = [];
    for (let i = 0; i < educations.length; i++) {
      rows.push(
        <InputEducation
          key={i}
          education={educations[i]}
          onUpdateEducation={(updatedEducation: educationType) => updateEducation(updatedEducation)}
          onCancel={handleCancelEducation}
          onDeleteEducation={(id: string) => handleDeleteEducation(id)}
        />,
      );
    }
    if (isAddingEducation) {
      rows.push(
        <InputEducation
          key="new"
          education={{ id: UUID(), institution: '', degree: '', location: '', from: '', to: '', description: '' }}
          onUpdateEducation={(newEducation: educationType) => handleSaveEducation(newEducation)}
          onCancel={handleCancelEducation}
          onDeleteEducation={(id: string) => handleDeleteEducation(id)}
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
              handleAddEducation();
            }}
          >
            Add
          </button>
          {/* <div>{renderTextInput()}</div> */}
          <div>{renderEducation()}</div>
        </div>
      </div>
    </div>
  );
}
