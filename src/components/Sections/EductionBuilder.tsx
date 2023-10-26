import React from 'react';
import { educationType, sectionDataType, sectionType } from '~/components/types';
import { produce } from 'immer';
import { section } from '~/components/types';
import UUID from '../micro-components/UUID';
import InputEducation from './InputEducation';

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
  const [edu, setEdu] = React.useState<educationType[]>([education]);
  const [isAddingEducation, setIsAddingEducation] = React.useState<boolean>(false);

  const handleAddEducation = () => {
    setIsAddingEducation(true);
  };

  const updateEducation = (education: educationType) => {
    const index = edu.findIndex((edu) => edu.id === education.id);
    if (index !== -1) {
      // Update existing education
      const newData = produce(edu, (draft) => {
        draft[index] = education;
      });
      setEdu(newData);
    } else {
      // Add new education
      const newData = produce(edu, (draft) => {
        draft.push(education);
      });
      setEdu(newData);
    }
  };

  const handleSaveEducation = (education: educationType) => {
    updateEducation(education);
    setIsAddingEducation(false);
  };

  const handleCancelEducation = () => {
    setIsAddingEducation(false);
  };

  const renderEducation = () => {
    const rows = [];
    for (let i = 0; i < edu.length; i++) {
      rows.push(
        <InputEducation
          key={i}
          education={edu[i]}
          onUpdateEducation={(updatedEducation: educationType) => updateEducation(updatedEducation)}
        />,
      );
    }
    if (isAddingEducation) {
      rows.push(
        <InputEducation
          key="new"
          education={{ id: UUID(), institution: '', degree: '', location: '', from: '', to: '', description: '' }}
          onUpdateEducation={(newEducation: educationType) => handleSaveEducation(newEducation)}
        />,
      );
    }
    return rows;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6 py-4">
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
