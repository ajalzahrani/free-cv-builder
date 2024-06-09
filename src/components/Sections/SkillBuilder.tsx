import React, { useEffect } from 'react';
import { sectionType, skillType } from '~/components/Types';
import { produce } from 'immer';
import InputSkill from './InputSkill';
import UUID from '../Shared/UUID';
import useStore from '../../store/RepoLocalStorage';
import { callCreate, callUpdate, callDelete, callFindAll } from '../../api/api-sections';

const title = 'Skills';

const skill: skillType = {
  id: UUID(),
  title: 'React',
};

export default function SkillBuilder({ section }: { section: sectionType }) {
  // const [skills, updateSkills] = React.useState<skillType[]>([skill]);
  const { skills, updateSkills } = useStore();
  const [isAddingSkill, setIsAddingSkill] = React.useState<boolean>(false);

  useEffect(() => {
    // handleGetSkills();
    if (skills.length === 0) {
      handleGetSkills_v2();
      return;
    }
  }, []);

  const handleGetSkills_v2 = async () => {
    const data = await callFindAll('http://localhost:3000/api/cv/skills', section);
    updateSkills(data);
  };

  // write a function to call api and get headers and set them in state
  // const handleGetSkills = async () => {
  //   const response = await fetch('http://localhost:3000/api/cv/skills', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ userId: 1 }),
  //   });

  //   if (response.ok) {
  //     let data = await response.json();

  //     updateSkills(data);
  //   } else {
  //     // Handle retrive data failure
  //     const errorData = await response.json();
  //     console.error('API call failed: ', errorData);
  //     alert('Retrieve data failed. Please check again.');
  //   }
  // };

  const handleCreateSkill = async (skill: skillType) => {
    const response = await fetch('http://localhost:3000/api/cv/skill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: skill.title, userId: 1 }),
    });

    if (response.ok) {
      alert('Create data successfully');
    } else {
      // Handle create failure
      const errorData = await response.json();
      console.error('API call failed: ', errorData);
      alert('Create data failed. Please check again.');
    }
  };

  const handleUpdateSkill = async (skill: skillType) => {
    const response = await fetch('http://localhost:3000/api/cv/skill', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: skill.id, title: skill.title, userId: 1 }),
    });

    if (response.ok) {
      alert('Update data successfully');
    } else {
      // Handle update failure
      const errorData = await response.json();
      console.error('API call failed: ', errorData);
      alert('Update data failed. Please check again.');
    }
  };

  // const handleDeleteSkill = async (id: string) => {
  //   const response = await fetch('http://localhost:3000/api/cv/skill', {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ id, userId: 1 }),
  //   });

  //   if (response.ok) {
  //     alert('Delete data successfully');
  //   } else {
  //     // Handle delete failure
  //     const errorData = await response.json();
  //     console.error('API call failed: ', errorData);
  //     alert('Delete data failed. Please check again.');
  //   }
  // };

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
      updateSkills(newData);
      handleUpdateSkill(skill); // make update api call
    } else {
      // Add new skill
      const newData = produce(skills, (draft) => {
        draft.push(skill);
      });
      updateSkills(newData);
      callCreate('http://localhost:3000/api/cv/skill', {
        id: skill.id,
        title: skill.title,
      }); // make create api call
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
    updateSkills(newData);
  };

  const renderSkills = () => {
    const rows = [];
    for (let i = 0; i < skills.length; i++) {
      rows.unshift(
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
      rows.unshift(
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
          <div className="section-title">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => {
                handleAddSkill();
              }}
            >
              Add
            </button>
          </div>
          <div>{renderSkills()}</div>
        </div>
      </div>
    </div>
  );
}
