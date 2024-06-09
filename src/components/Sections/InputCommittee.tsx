import React from 'react';
import { committeeType } from '~/components/Types';

type InputCommitteeProps = {
  committee: committeeType;
  onUpdateCommittee: (updateCommittee: committeeType) => void;
  onCancel: () => void;
  onDeleteCommittee: (id: string) => void;
};

export default function InputProject({
  committee,
  onUpdateCommittee,
  onCancel,
  onDeleteCommittee,
}: InputCommitteeProps) {
  const [isEditing, setIsEditing] = React.useState<boolean>(committee.title.length === 0 ? true : false);

  const [updatedCommittee, setUpdatedCommittee] = React.useState<committeeType>(committee);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedCommittee((prevCommittee: any) => ({
      ...prevCommittee,
      [name]: value,
    }));
  };

  const handleUpdateCommittee = () => {
    onUpdateCommittee(updatedCommittee);
    setIsEditing(false);
  };

  const handleCancelCommittee = () => {
    setIsEditing(false);
    onCancel();
  };

  return (
    <div className="builders-element">
      <div className="section-title">
        <h3 className="text-lg font-bold">{committee.title}</h3>
        {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
      </div>
      {isEditing ? (
        <div className="builders-input">
          <label className="block font-bold mt-2 mb-2" htmlFor="title">
            Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedCommittee.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="role">
            Role
          </label>
          <textarea
            id="role"
            name="role"
            value={updatedCommittee.role}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="link">
            Date
          </label>
          <input
            type="text"
            id="link"
            name="link"
            value={updatedCommittee.date}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="link">
            Responsibilities
          </label>
          <input
            type="text"
            id="link"
            name="link"
            value={updatedCommittee.responsibility}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleUpdateCommittee}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => onDeleteCommittee(committee.id)}
            >
              Delete
            </button>
            <button className="text-gray-500 hover:text-gray-700" onClick={handleCancelCommittee}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          {/* <p className="text-red-700">ENTRY ID: {project.id}</p> */}
          <p className="text-gray-700">{committee.responsibility}</p>
          <p className="text-gray-700">{committee.role}</p>
          <p className="text-gray-700">{committee.date}</p>
        </div>
      )}
    </div>
  );
}
