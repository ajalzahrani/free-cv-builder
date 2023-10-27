import React from 'react';
import { sectionType, skillType } from '~/components/types';
import { produce } from 'immer';
import InputSkill from './InputSkill';
import UUID from '../shared/UUID';

const title = 'Skills';

const skill: skillType = {
  id: UUID(),
  title: 'React',
};

export default function SkillBuilder({ section }: { section: sectionType }) {
  const [skills, setSkills] = React.useState<skillType[]>([skill]);
  const [isAddingSkill, setIsAddingSkill] = React.useState<boolean>(false);

  const handleAddSkill = () => {
    setIsAddingSkill(true);
  };

  const updateSkill = (skill: skillType) => {
    const index = skills.findIndex((sk) => sk.id === skill.id);
    if (index !== -1) {
      // Update existing skill
      const newData = produce(skills, (draft) => {
        draft[index] = skill;
      });
      setSkills(newData);
    } else {
      // Add new skill
      const newData = produce(skills, (draft) => {
        draft.push(skill);
      });
      setSkills(newData);
    }
  };

  const handleSaveSkill = (skill: skillType) => {
    updateSkill(skill);
    setIsAddingSkill(false);
  };

  const handleCancelSkill = () => {
    setIsAddingSkill(false);
  };

  const handleDeleteSkill = (id: string) => {
    const newData = produce(skills, (draft) => {
      const index = draft.findIndex((sk) => sk.id === id);
      if (index !== -1) draft.splice(index, 1);
      else handleCancelSkill();
    });
    setSkills(newData);
  };

  const renderSkills = () => {
    const rows = [];
    for (let i = 0; i < skills.length; i++) {
      rows.push(
        <InputSkill
          key={i}
          skill={skills[i]}
          onUpdateSkill={(updatedSkill: skillType) => updateSkill(updatedSkill)}
          onCancel={() => handleCancelSkill()}
          onDeleteSkill={(id: string) => handleDeleteSkill(id)}
        />,
      );
    }
    if (isAddingSkill) {
      rows.push(
        <InputSkill
          key="new"
          skill={{ id: UUID(), title: '' }}
          onUpdateSkill={(newSkill: skillType) => handleSaveSkill(newSkill)}
          onCancel={() => setIsAddingSkill(false)}
          onDeleteSkill={(id: string) => handleDeleteSkill(id)}
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
              handleAddSkill();
            }}
          >
            Add
          </button>
          <div>{renderSkills()}</div>
        </div>
      </div>
    </div>
  );
}
