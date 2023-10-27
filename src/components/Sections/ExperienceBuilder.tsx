import React from 'react';
import { experienceType } from '~/components/types';
import { produce } from 'immer';
import InputExperience from './InputExperience';
import { section } from '~/components/types';
import UUID from '../shared/UUID';
import useStore from '../../store/RepoLocalStorage';

const title = 'Work Experience';

const experience: experienceType = {
  id: UUID(),
  title: 'Software Engineer',
  company: 'ABC Company',
  location: 'San Francisco, CA',
  from: 'January 2019',
  to: 'Present',
  description: '',
  tasks: [
    'Developed and maintained web applications using React and Node.js.',
    'Developed and maintained web applications using C# and SQL.',
  ],
};

export default function ExperienceBuilder(section: section) {
  // const [exp, setExp] = React.useState<experienceType[]>([experience]);
  const { experiences, updateExperiences } = useStore();
  const [isAddingExperience, setIsAddingExperience] = React.useState<boolean>(false);

  const handleAddExperience = () => {
    setIsAddingExperience(true);
  };

  const handleUpdateExpierance = (experience: experienceType) => {
    const index = experiences.findIndex((exp) => exp.id === experience.id);
    if (index !== -1) {
      // Update existing experience
      const newData = produce(experiences, (draft) => {
        draft[index] = experience;
      });
      updateExperiences(newData);
    } else {
      // Add new experience
      const newData = produce(experiences, (draft) => {
        draft.push(experience);
      });
      updateExperiences(newData);
    }
  };

  const handleSaveExperience = (experience: experienceType) => {
    handleUpdateExpierance(experience);
    setIsAddingExperience(false);
  };

  // const handleCancelAddExperience = () => {
  //   setIsAddingExperience(false);
  // };

  const handleDeleteExperience = (id: string) => {
    const newData = produce(experiences, (draft) => {
      const index = draft.findIndex((exp) => exp.id === id);
      if (index !== -1) {
        draft.splice(index, 1);
      } else {
        handleCancelExperience();
      }
    });
    updateExperiences(newData);
  };

  const handleCancelExperience = () => {
    setIsAddingExperience(false);
  };

  const renderExperience = () => {
    const rows = [];
    for (let i = 0; i < experiences.length; i++) {
      rows.push(
        <InputExperience
          key={i}
          experience={experiences[i]}
          onUpdateExperience={(updatedExperience: experienceType) => handleSaveExperience(updatedExperience)}
          onCancel={handleCancelExperience}
          onDeleteExperience={(id: string) => handleDeleteExperience(id)}
        />,
      );
    }
    if (isAddingExperience) {
      rows.push(
        <InputExperience
          key="new"
          experience={{
            id: UUID(),
            title: '',
            company: '',
            location: '',
            from: '',
            to: '',
            description: '',
            tasks: [],
          }}
          onUpdateExperience={(newExperience: experienceType) => handleSaveExperience(newExperience)}
          onCancel={handleCancelExperience}
          onDeleteExperience={(id: string) => handleDeleteExperience(id)}
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
              handleAddExperience();
            }}
          >
            Add
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
            onClick={() => {
              console.log(experiences);
            }}
          >
            Print
          </button>
          {/* <div>{renderTextInput()}</div> */}
          <div>{renderExperience()}</div>
        </div>
      </div>
    </div>
  );
}
