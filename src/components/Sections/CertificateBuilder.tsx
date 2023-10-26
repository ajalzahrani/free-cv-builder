import React from 'react';
import { certificateType, sectionDataType, sectionType } from '~/components/types';
import { produce } from 'immer';
import InputCertificate from './InputCertificate';
import { section } from '~/components/types';
import UUID from '../micro-components/UUID';

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
  const [cert, setCert] = React.useState<certificateType[]>([certificate]);
  const [isAddingCertificate, setIsAddingCertificate] = React.useState<boolean>(false);

  const handleAddCertificate = () => {
    setIsAddingCertificate(true);
  };

  const updateCertificate = (certificate: certificateType) => {
    const index = cert.findIndex((cert) => cert.id === certificate.id);
    if (index !== -1) {
      // Update existing certificate
      const newData = produce(cert, (draft) => {
        draft[index] = certificate;
      });
      setCert(newData);
    } else {
      // Add new certificate
      const newData = produce(cert, (draft) => {
        draft.push(certificate);
      });
      setCert(newData);
    }
  };

  const handleSaveCertificate = (certificate: certificateType) => {
    updateCertificate(certificate);
    setIsAddingCertificate(false);
  };

  const handleCancelCertificate = () => {
    setIsAddingCertificate(false);
  };

  const renderCertificate = () => {
    const rows = [];
    for (let i = 0; i < cert.length; i++) {
      rows.push(
        <InputCertificate
          key={i}
          certificate={cert[i]}
          onUpdateCertificate={(updatedCertificate: certificateType) => updateCertificate(updatedCertificate)}
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
            location: '',
            from: '',
            to: '',
            description: '',
            link: '',
          }}
          onUpdateCertificate={(newCertificate: certificateType) => handleSaveCertificate(newCertificate)}
        />,
      );
    }
    return rows;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6 py-4">
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
