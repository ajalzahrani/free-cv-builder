import React, { useEffect, useState } from 'react';
import { sectionType, headerType } from '~/components/Types';
import { produce } from 'immer';
import InputHeader from './InputHeader';
import UUID from '../Shared/UUID';
import useStore from '../../store/RepoLocalStorage';

const title = 'Headers';

const header: headerType = {
  id: UUID(),
  name: 'John Doe',
  title: 'Software Engineer',
  pitch: 'I am a software engineer with 5 years of experience.',
};

export default function HeaderBuilder({ section }: { section: sectionType }) {
  const { headers, updateHeaders } = useStore();
  // const [headers, updateHeaders] = useState<headerType[]>([header]); // Add null check here();
  const [isAddingHeader, setIsAddingHeader] = useState<boolean>(false);

  const handleAddHeader = () => {
    setIsAddingHeader(true);
  };

  useEffect(() => {
    // check if headers exist
    if (headers.length === 0) {
      handleGetHeaders();
      return;
    }
  }, []);

  // write a function to call api and get headers and set them in state
  const handleGetHeaders = async () => {
    const response = await fetch('http://localhost:3000/headers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 1 }),
    });

    if (response.ok) {
      const data = await response.json();

      updateHeaders(data);
    } else {
      // Handle login failure
      const errorData = await response.json();
      console.error('API call failed: ', errorData);
      alert('Retrieve data failed. Please check again.');
    }
  };

  const updateHeader = (header: headerType) => {
    const index = headers.findIndex((hd) => hd.id === header.id);
    if (index !== -1) {
      // Update existing header
      const newData = produce(headers, (draft) => {
        draft[index] = header;
      });
      updateHeaders(newData);
    } else {
      // Add new header
      const newData = produce(headers, (draft) => {
        draft.push(header);
      });
      updateHeaders(newData);
    }
  };

  const handleSaveHeader = (header: headerType) => {
    updateHeader(header);
    setIsAddingHeader(false);
  };

  const handleCancelHeader = () => {
    setIsAddingHeader(false);
  };

  const handleDeleteHeader = (id: string) => {
    const newData = produce(headers, (draft) => {
      const index = draft.findIndex((hd) => hd.id === id);
      if (index !== -1) {
        draft.splice(index, 1);
      } else {
        handleCancelHeader();
      }
    });
    updateHeaders(newData);
  };

  const renderHeaders = () => {
    const rows = [];
    // if (!headers) return null; // Add null check here
    // console.log(headers.length);
    for (let i = 0; i < headers.length; i++) {
      rows.unshift(
        <InputHeader
          key={i}
          header={headers[i]}
          onUpdateHeader={(updatedHeader: headerType) => updateHeader(updatedHeader)}
          onCancel={() => handleCancelHeader()}
          onDeleteHeader={(id: string) => handleDeleteHeader(id)}
        />,
      );
    }
    if (isAddingHeader) {
      rows.unshift(
        <InputHeader
          key="new"
          header={{ id: UUID(), name: '', title: '', pitch: '' }}
          onUpdateHeader={(newHeader: headerType) => handleSaveHeader(newHeader)}
          onCancel={() => setIsAddingHeader(false)}
          onDeleteHeader={(id: string) => handleDeleteHeader(id)}
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
              onClick={() => {
                handleAddHeader();
              }}
            >
              Add
            </button>
          </div>
          <div>{renderHeaders()}</div>
        </div>
      </div>
    </div>
  );
}
