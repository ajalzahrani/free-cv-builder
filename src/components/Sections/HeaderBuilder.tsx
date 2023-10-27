import React from 'react';
import { sectionType, headerType } from '~/components/types';
import { produce } from 'immer';
import InputHeader from './InputHeader';
import UUID from '../shared/UUID';

const title = 'Headers';

const header: headerType = {
  id: UUID(),
  name: 'John Doe',
  title: 'Software Engineer',
  pitch: 'I am a software engineer with 5 years of experience.',
};

export default function HeaderBuilder({ section }: { section: sectionType }) {
  const [headers, setHeaders] = React.useState<headerType[]>([header]);
  const [isAddingHeader, setIsAddingHeader] = React.useState<boolean>(false);

  const handleAddHeader = () => {
    setIsAddingHeader(true);
  };

  const updateHeader = (header: headerType) => {
    const index = headers.findIndex((hd) => hd.id === header.id);
    if (index !== -1) {
      // Update existing header
      const newData = produce(headers, (draft) => {
        draft[index] = header;
      });
      setHeaders(newData);
    } else {
      // Add new header
      const newData = produce(headers, (draft) => {
        draft.push(header);
      });
      setHeaders(newData);
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
    setHeaders(newData);
  };

  const renderHeaders = () => {
    const rows = [];
    for (let i = 0; i < headers.length; i++) {
      rows.push(
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
      rows.push(
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
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => {
              handleAddHeader();
            }}
          >
            Add
          </button>
          <div>{renderHeaders()}</div>
        </div>
      </div>
    </div>
  );
}
