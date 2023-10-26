import React from 'react';
import { experienceType, sectionDataType, sectionType } from '~/components/types';
import { produce } from 'immer';
import InputExperience from './InputExperience';
import { section } from '~/components/types';
import UUID from '../micro-components/UUID';

const title = 'Professional Experience';

const experience: experienceType = {
  id: UUID(),
  title: 'Software Engineer',
  company: 'ABC Company',
  location: 'San Francisco, CA',
  from: 'January 2019',
  to: 'Present',
  description: 'Developed and maintained web applications using React and Node.js.',
};

export default function ExperienceBuilder(section: section) {
  const [exp, setExp] = React.useState<experienceType[]>([experience]);
  const [isAddingExperience, setIsAddingExperience] = React.useState<boolean>(false);

  const handleAddExperience = () => {
    setIsAddingExperience(true);
  };

  const updateExperience = (experience: experienceType) => {
    const index = exp.findIndex((exp) => exp.id === experience.id);
    if (index !== -1) {
      // Update existing experience
      const newData = produce(exp, (draft) => {
        draft[index] = experience;
      });
      setExp(newData);
    } else {
      // Add new experience
      const newData = produce(exp, (draft) => {
        draft.push(experience);
      });
      setExp(newData);
    }
  };

  const handleSaveExperience = (experience: experienceType) => {
    updateExperience(experience);
    setIsAddingExperience(false);
  };

  const handleCancelAddExperience = () => {
    setIsAddingExperience(false);
  };

  const renderExperience = () => {
    const rows = [];
    for (let i = 0; i < exp.length; i++) {
      rows.push(
        <InputExperience
          key={i}
          experience={exp[i]}
          onUpdateExperience={(updatedExperience: experienceType) => updateExperience(updatedExperience)}
        />,
      );
    }
    if (isAddingExperience) {
      rows.push(
        <InputExperience
          key="new"
          experience={{ id: UUID(), title: '', company: '', location: '', from: '', to: '', description: '' }}
          onUpdateExperience={(newExperience: experienceType) => handleSaveExperience(newExperience)}
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
              handleAddExperience();
            }}
          >
            Add
          </button>
          {/* <div>{renderTextInput()}</div> */}
          <div>{renderExperience()}</div>
        </div>
      </div>
    </div>
  );
}
