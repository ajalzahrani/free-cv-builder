import React from 'react';
import { skillType } from '~/components/Types';

type InputSkillProps = {
  skill: skillType;
  onUpdateSkill: (updatedSkill: skillType) => void;
  onCancel: () => void;
  onDeleteSkill: (id: string) => void;
};

export default function InputSkill({ skill, onUpdateSkill, onCancel, onDeleteSkill }: InputSkillProps) {
  const [isEditing, setIsEditing] = React.useState<boolean>(skill.title.length === 0 ? true : false);

  const [updatedSkill, setUpdatedSkill] = React.useState<skillType>(skill);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedSkill((prevSkill: any) => ({
      ...prevSkill,
      [name]: value,
    }));
  };

  const handleUpdateSkill = () => {
    onUpdateSkill(updatedSkill);
    setIsEditing(false);
  };

  const handleCancelSkill = () => {
    setIsEditing(false);
    onCancel();
  };

  return (
    <div className="builders-element">
      <div className="section-title">
        <h3 className="text-lg font-bold">{skill.title}</h3>
        {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
      </div>
      {isEditing ? (
        <div className="builders-input">
          <label className="block font-bold mt-2 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedSkill.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleUpdateSkill}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => onDeleteSkill(skill.id)}
            >
              Delete
            </button>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => handleCancelSkill()}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          {/* <p className="text-red-700">ENTRY ID: {skill.id}</p> */}
          {/* <p className="text-gray-700">{skill.title}</p> */}
        </div>
      )}
    </div>
  );
}
