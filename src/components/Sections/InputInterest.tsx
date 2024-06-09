import React from 'react';
import { interestType } from '~/components/Types';

type InputInterestProps = {
  interest: interestType;
  onUpdateInterest: (updatedInterest: interestType) => void;
  onCancel: () => void;
  onDeleteInterest: (id: string) => void;
};

export default function InputInterest({ interest, onUpdateInterest, onCancel, onDeleteInterest }: InputInterestProps) {
  const [isEditing, setIsEditing] = React.useState<boolean>(interest.title.length === 0 ? true : false);

  const [updatedInterest, setUpdatedInterest] = React.useState<interestType>(interest);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedInterest((prevInterest: any) => ({
      ...prevInterest,
      [name]: value,
    }));
  };

  const handleUpdateInterest = () => {
    onUpdateInterest(updatedInterest);
    setIsEditing(false);
  };

  const handleCancelInterest = () => {
    setIsEditing(false);
    onCancel();
  };

  return (
    <div className="builders-element">
      <div className="section-title">
        <h3 className="text-lg font-bold">{interest.title}</h3>
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
            value={updatedInterest.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={updatedInterest.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleUpdateInterest}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => onDeleteInterest(interest.id)}
            >
              Delete
            </button>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => handleCancelInterest()}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          {/* <p className="text-red-700">ENTRY ID: {interest.id}</p> */}
          <p className="text-gray-700">{interest.description}</p>
        </div>
      )}
    </div>
  );
}
