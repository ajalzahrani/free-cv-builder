import React from 'react';
import { interestType } from '~/components/types';
import { produce } from 'immer';
import InputInterest from './InputInterest';
import UUID from '../shared/UUID';

const title = 'Interests';

const interest: interestType = {
  id: UUID(),
  title: 'React',
  description: '',
};

export default function InterestBuilder() {
  const [interests, setInterests] = React.useState<interestType[]>([interest]);
  const [isAddingInterest, setIsAddingInterest] = React.useState<boolean>(false);

  const handleAddInterest = () => {
    setIsAddingInterest(true);
  };

  const updateInterest = (interest: interestType) => {
    const index = interests.findIndex((int) => int.id === interest.id);
    if (index !== -1) {
      // Update existing interest
      const newData = produce(interests, (draft) => {
        draft[index] = interest;
      });
      setInterests(newData);
    } else {
      // Add new interest
      const newData = produce(interests, (draft) => {
        draft.push(interest);
      });
      setInterests(newData);
    }
  };

  const handleSaveInterest = (interest: interestType) => {
    updateInterest(interest);
    setIsAddingInterest(false);
  };

  const handleCancelInterest = () => {
    setIsAddingInterest(false);
  };

  const handleDeleteInterest = (id: string) => {
    const newData = produce(interests, (draft) => {
      const index = draft.findIndex((int) => int.id === id);
      draft.splice(index, 1);
    });
    setInterests(newData);
  };

  const renderInterests = () => {
    const rows = [];
    for (let i = 0; i < interests.length; i++) {
      rows.push(
        <InputInterest
          key={i}
          interest={interests[i]}
          onUpdateInterest={(updatedInterest: interestType) => updateInterest(updatedInterest)}
          onCancel={() => handleCancelInterest()}
          onDeleteInterest={(id: string) => handleDeleteInterest(id)}
        />,
      );
    }
    if (isAddingInterest) {
      rows.push(
        <InputInterest
          key="new"
          interest={{ id: UUID(), title: '', description: '' }}
          onUpdateInterest={(newInterest: interestType) => handleSaveInterest(newInterest)}
          onCancel={() => setIsAddingInterest(false)}
          onDeleteInterest={(id: string) => handleDeleteInterest(id)}
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
              handleAddInterest();
            }}
          >
            Add
          </button>
          <div>{renderInterests()}</div>
        </div>
      </div>
    </div>
  );
}
