import React from 'react';
import { headerType } from '~/components/Types';

type InputHeaderProps = {
  header: headerType;
  onUpdateHeader: (updatedHeader: headerType) => void;
  onCancel: () => void;
  onDeleteHeader: (id: string) => void;
};

export default function InputHeader({ header, onUpdateHeader, onCancel, onDeleteHeader }: InputHeaderProps) {
  const [isEditing, setIsEditing] = React.useState<boolean>(header.name.length === 0 ? true : false);

  const [updatedHeader, setUpdatedHeader] = React.useState<headerType>(header);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedHeader((prevHeader: any) => ({
      ...prevHeader,
      [name]: value,
    }));
  };

  const handleUpdateHeader = () => {
    onUpdateHeader(updatedHeader);
    setIsEditing(false);
  };

  const handleDeleteSkill = () => {
    if (onDeleteHeader) {
      onDeleteHeader(header.id);
    }
  };

  const handleCancelHeader = () => {
    setIsEditing(false);
    onCancel();
  };

  return (
    <div className="builders-element">
      <div className="section-title">
        <h3 className="text-2xl font-bold">{header.name}</h3>

        {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
      </div>
      {isEditing ? (
        <div className="builders-input">
          <label className="block font-bold mt-2 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedHeader.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedHeader.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="pitch">
            Pitch
          </label>
          <textarea
            id="pitch"
            name="pitch"
            value={updatedHeader.pitch}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleUpdateHeader}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => handleDeleteSkill()}
            >
              Delete
            </button>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => handleCancelHeader()}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          {/* <p className="text-red-700">ENTRY ID: {header.id}</p> */}
          {/* <h2 className="text-2xl font-bold">{header.name}</h2> */}
          <h3 className="text-lg font-bold">{header.title}</h3>
          <p className="text-gray-700">{header.pitch}</p>
        </div>
      )}
    </div>
  );
}
