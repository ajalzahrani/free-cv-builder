import React, { useEffect } from 'react';
import { committeeType, sectionType } from '~/components/Types';
import { produce } from 'immer';
import InputCommittee from './InputCommittee';
import UUID from '../Shared/UUID';
import useStore from '../../store/RepoLocalStorage';

const title = 'Committees';

const committee: committeeType = {
  id: UUID(),
  title: 'Project 1',
  date: 'January 2019',
  role: 'Description of Project 1',
  responsibility: 'Responsibility of Project 1',
};

export default function CommitteeBuilder({ section }: { section: sectionType }) {
  // const [committees, updateCommittees] = React.useState<committeeType[]>([committee]);
  const { committees, updateCommittees } = useStore();
  const [isAddingCommittee, setIsAddingCommittee] = React.useState<boolean>(false);

  useEffect(() => {
    if (committees.length === 0) {
      handleGetCommittees();
      return;
    }
  }, []);

  // write a function to call api and get headers and set them in state
  const handleGetCommittees = async () => {
    const response = await fetch('http://localhost:3000/committees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 1 }),
    });

    if (response.ok) {
      let data = await response.json();

      updateCommittees(data);
    } else {
      // Handle login failure
      const errorData = await response.json();
      console.error('API call failed: ', errorData);
      alert('Retrieve data failed. Please check again.');
    }
  };

  const handleAddProject = () => {
    setIsAddingCommittee(true);
  };

  const updateCommittee = (committee: committeeType) => {
    const index = committees.findIndex((comite) => comite.id === committee.id);
    if (index !== -1) {
      // Update existing committee
      const newData = produce(committees, (draft) => {
        draft[index] = committee;
      });
      updateCommittees(newData);
    } else {
      // Add new committee
      const newData = produce(committees, (draft) => {
        draft.push(committee);
      });
      updateCommittees(newData);
    }
  };

  const handleSaveCommittee = (committee: committeeType) => {
    updateCommittee(committee);
    setIsAddingCommittee(false);
  };

  const handleCancelProject = () => {
    setIsAddingCommittee(false);
  };

  const handleDeleteCommittee = (id: string) => {
    const newData = produce(committees, (draft) => {
      const index = draft.findIndex((proj) => proj.id === id);
      if (index !== -1) {
        draft.splice(index, 1);
      } else {
        handleCancelProject();
      }
    });
    updateCommittees(newData);
  };

  const renderCommittees = () => {
    const rows = [];
    for (let i = 0; i < committees?.length; i++) {
      rows.unshift(
        <InputCommittee
          key={i}
          committee={committees[i]}
          onUpdateCommittee={(updatedCommittee: committeeType) => updateCommittee(updatedCommittee)}
          onCancel={handleCancelProject}
          onDeleteCommittee={(id: string) => handleDeleteCommittee(id)}
        />,
      );
    }
    if (isAddingCommittee) {
      rows.unshift(
        <InputCommittee
          key="new"
          committee={{ id: UUID(), title: '', role: '', date: '', responsibility: '' }}
          onUpdateCommittee={(newCommittee: committeeType) => handleSaveCommittee(newCommittee)}
          onCancel={handleCancelProject}
          onDeleteCommittee={(id: string) => handleDeleteCommittee(id)}
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
                handleAddProject();
              }}
            >
              Add
            </button>
          </div>
          <div>{renderCommittees()}</div>
        </div>
      </div>
    </div>
  );
}
