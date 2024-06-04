import React, { useEffect } from 'react';
import { certificateType } from '~/components/types';
import { produce } from 'immer';
import InputCertificate from './InputCertificate';
import { section } from '~/components/types';
import UUID from '../shared/UUID';
import useStore from '../../store/RepoLocalStorage';

const title = 'Certificattions';

const certificate: certificateType = {
  // generate id of strings of numbers
  id: UUID(),
  title: 'AWS Certified Solutions Architect - Associate',
  description: 'Certification for AWS Solutions Architect - Associate',
  company: 'Amazon Web Services',
  link: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
  from: 'January 2020',
  to: 'Present',
};

export default function CertificateBuilder(section: section) {
  const [certificates, updateCertificates] = React.useState<certificateType[]>([certificate]);
  // const { certificates, updateCertificates } = useStore();
  const [isAddingCertificate, setIsAddingCertificate] = React.useState<boolean>(false);

  useEffect(() => {
    handleGetCertificates();
  }, []);

  // write a function to call api and get headers and set them in state
  const handleGetCertificates = async () => {
    const response = await fetch('http://localhost:3000/certificates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 1 }),
    });

    if (response.ok) {
      let data = await response.json();

      updateCertificates(data);
    } else {
      // Handle login failure
      const errorData = await response.json();
      console.error('API call failed: ', errorData);
      alert('Retrieve data failed. Please check again.');
    }
  };

  const handleAddCertificate = () => {
    setIsAddingCertificate(true);
  };

  const updateCertificate = (certificate: certificateType) => {
    const index = certificates.findIndex((cert) => cert.id === certificate.id);
    if (index !== -1) {
      // Update existing certificate
      const newData = produce(certificates, (draft) => {
        draft[index] = certificate;
      });
      updateCertificates(newData);
    } else {
      // Add new certificate
      const newData = produce(certificates, (draft) => {
        draft.push(certificate);
      });
      updateCertificates(newData);
    }
  };

  const handleSaveCertificate = (certificate: certificateType) => {
    updateCertificate(certificate);
    setIsAddingCertificate(false);
  };

  const handleCancelCertificate = () => {
    setIsAddingCertificate(false);
  };

  const handleDeleteCertificate = (id: string) => {
    const newData = produce(certificates, (draft) => {
      const index = draft.findIndex((cert) => cert.id === id);
      if (index !== -1) {
        draft.splice(index, 1);
      } else {
        handleCancelCertificate();
      }
    });
    updateCertificates(newData);
  };

  const renderCertificate = () => {
    const rows = [];
    for (let i = 0; i < certificates.length; i++) {
      rows.push(
        <InputCertificate
          key={i}
          certificate={certificates[i]}
          onUpdateCertificate={(updatedCertificate: certificateType) => updateCertificate(updatedCertificate)}
          onDeleteCertificate={(id: string) => handleDeleteCertificate(id)}
          onCancel={() => handleCancelCertificate()}
        />,
      );
    }
    if (isAddingCertificate) {
      rows.push(
        <InputCertificate
          key="new"
          certificate={{
            id: UUID(),
            title: '',
            company: '',
            from: '',
            to: '',
            description: '',
            link: '',
          }}
          onUpdateCertificate={(newCertificate: certificateType) => handleSaveCertificate(newCertificate)}
          onDeleteCertificate={(id: string) => handleDeleteCertificate(id)}
          onCancel={() => handleCancelCertificate()}
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
              handleAddCertificate();
            }}
          >
            Add
          </button>
          {/* <div>{renderTextInput()}</div> */}
          <div>{renderCertificate()}</div>
        </div>
      </div>
    </div>
  );
}
