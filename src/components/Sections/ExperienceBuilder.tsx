import React, { useEffect, useState } from 'react';
import { experienceType } from '~/components/Types';
import { produce } from 'immer';
import InputExperience from './InputExperience';
import { section } from '~/components/Types';
import UUID from '../Shared/UUID';
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
  experinceTasks: [
    { description: 'Developed and maintained web applications using React and Node.js.' },
    { description: 'Developed and maintained web applications using C# and SQL.' },
  ],
};

export default function ExperienceBuilder(section: section) {
  // const [experiences, updateExperiences] = React.useState<experienceType[]>([experience]);
  const { experiences, updateExperiences } = useStore();
  const [isAddingExperience, setIsAddingExperience] = React.useState<boolean>(false);

  useEffect(() => {
    if (experiences.length === 0) {
      handleGetExperiences();
      return;
    }
  }, []);

  // write a function to call api and get headers and set them in state
  const handleGetExperiences = async () => {
    const response = await fetch('http://localhost:3000/experiences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 1 }),
    });

    if (response.ok) {
      let data = await response.json();

      updateExperiences(data);
    } else {
      // Handle login failure
      const errorData = await response.json();
      console.error('API call failed: ', errorData);
      alert('Retrieve data failed. Please check again.');
    }
  };

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
            experinceTasks: [],
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
          <div className="section-title">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div className="section-title">
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
            </div>
          </div>
          {/* <div>{renderTextInput()}</div> */}
          <div>{renderExperience()}</div>
        </div>
      </div>
    </div>
  );
}
