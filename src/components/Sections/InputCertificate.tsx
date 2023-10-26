import React from 'react';
import { certificateType } from '~/components/types';

type InputCertificationProps = {
  certificate: certificateType;
  onUpdateCertificate: (updatedCertificate: certificateType) => void;
};

export default function InputCertificate({ certificate, onUpdateCertificate }: InputCertificationProps) {
  const [isEditing, setIsEditing] = React.useState<boolean>(certificate.title.length === 0 ? true : false);

  const [updatedCertificate, setupdatedCertificate] = React.useState<certificateType>(certificate);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setupdatedCertificate((prevCertification: any) => ({
      ...prevCertification,
      [name]: value,
    }));
  };

  const handleUpdateCertificate = () => {
    onUpdateCertificate(updatedCertificate);
    setIsEditing(false);
  };

  // old 67
  // new 37

  return (
    <div className="mt-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{certificate.title}</h3>
        {!isEditing && (
          <button className="text-blue-500 hover:text-blue-700" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="mt-2">
          <label className="block font-bold mt-2 mb-2" htmlFor="to">
            <p className="text-red-700">{certificate.id}</p>
          </label>
          <label className="block font-bold mt-2 mb-2" htmlFor="description">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedCertificate.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={updatedCertificate.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="company">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={updatedCertificate.company}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="link">
            Link
          </label>
          <input
            type="text"
            id="link"
            name="link"
            value={updatedCertificate.link}
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
            value={updatedCertificate.from}
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
            value={updatedCertificate.to}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleUpdateCertificate}
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
          {/* <p className="text-red-700">ENTERY ID: {certificate.id}</p> */}
          <p className="text-gray-700">{certificate.title}</p>
          <p className="text-gray-700">{certificate.company}</p>
          <p className="text-gray-700">
            {certificate.from} - {certificate.to}
          </p>
          <p className="text-gray-700">{certificate.description}</p>
        </div>
      )}
    </div>
  );
}
