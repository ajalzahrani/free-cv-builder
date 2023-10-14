import React from 'react';
import Input from './micro-components/Input';
import { inputType } from '~/components/micro-components/Input';
import { experienceType, sectionDataType, sectionType } from '~/components/types';
import { produce } from 'immer';
import InputExperience from './Sections/InputExperience';

type sectionBuilderType = {
  title: string;
  type?: sectionType;
  textObject: inputType;
};

const textObjects = {
  title: '',
  id: 0,
  status: true,
  updateText: () => {},
};
const title = 'Experience';

const experience: experienceType = {
  title: 'Software Engineer',
  company: 'ABC Company',
  location: 'San Francisco, CA',
  from: 'January 2019',
  to: 'Present',
  description: 'Developed and maintained web applications using React and Node.js.',
};

export default function SectionBuilder() {
  const [exp, setExp] = React.useState<experienceType[]>([experience]);
  const [isAddingExperience, setIsAddingExperience] = React.useState<boolean>(false);
  const [sectionData, setSectionData] = React.useState<string[]>([]);

  const updateExperience = (experience: experienceType) => {
    const index = exp.findIndex((exp) => exp.title === experience.title);
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

  const handleAddExperience = () => {
    setIsAddingExperience(true);
  };

  const handleCancelAddExperience = () => {
    setIsAddingExperience(false);
  };

  const handleSaveExperience = (experience: experienceType) => {
    updateExperience(experience);
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
          experience={{ title: '', company: '', location: '', from: '', to: '', description: '' }}
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
              // setIsAddingExperience(true);
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

// const renderTextInput = () => {
//   const rows = [];
//   for (let i = 0; i < exp.length; i++) {
//     rows.push(
//       <Input
//         key={i}
//         id={i}
//         title={exp[i].title}
//         status={false}
//         updateText={(id: number, text: string) => updateExperience(id, text)}
//       />,
//     );
//   }
//   return <>{rows}</>;
// };
