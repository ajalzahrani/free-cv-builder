import React from 'react';
import { educationType } from '~/components/types';

type InputEducationProps = {
  education: educationType;
  onUpdateEducation: (updatedEducation: educationType) => void;
};

export default function InputEducation({ education, onUpdateEducation }: InputEducationProps) {
  const [isEditing, setIsEditing] = React.useState<boolean>(education.institution.length === 0 ? true : false);

  const [updatedEducation, setUpdatedEducation] = React.useState<educationType>(education);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedEducation((prevEducation: any) => ({
      ...prevEducation,
      [name]: value,
    }));
  };

  const handleUpdateEducation = () => {
    onUpdateEducation(updatedEducation);
    setIsEditing(false);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{education.institution}</h3>
        {!isEditing && (
          <button className="text-blue-500 hover:text-blue-700" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="mt-2">
          <label className="block font-bold mt-2 mb-2" htmlFor="institution">
            Institution
          </label>
          <input
            type="text"
            id="institution"
            name="institution"
            value={updatedEducation.institution}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="degree">
            Degree
          </label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={updatedEducation.degree}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="from">
            From
          </label>
          <input
            type="text"
            id="from"
            name="from"
            value={updatedEducation.from}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="to">
            To
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value={updatedEducation.to}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="to">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={updatedEducation.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleUpdateEducation}
            >
              Save
            </button>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <p className="text-red-700">ENTERY ID: {education.id}</p>
          <p className="text-gray-700">{education.institution}</p>
          <p className="text-gray-700">{education.degree}</p>
          <p className="text-gray-700">{education.location}</p>
          <p className="text-gray-700">
            {education.from} - {education.to}
          </p>
          <p className="text-gray-700">{education.description}</p>
        </div>
      )}
    </div>
  );
}
