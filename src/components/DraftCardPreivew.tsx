import React from 'react';

type Props = {
  onClose: () => void;
  children?: React.ReactNode;
  data: any;
};

const MAX_TEXT_LENGTH = 50;

const DraftCardPreivew: React.FC<Props> = ({ onClose, children, data }) => {
  const renderProperties = () => {
    return Object.entries(data).map(([key, value]) => (
      <div key={key}>
        <span className="font-bold">{key}: </span>
        {/* check if value is array if is array then apply max_text_lenght to each element */}

        <span>{value}</span>
      </div>
    ));
  };
  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 bg-opacity-50 z-50"
      style={{ width: '400px' }}
      onClick={onClose}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 overflow-y-auto">{renderProperties()}</div>
    </div>
  );
};

export default DraftCardPreivew;

/**
 * 
 *     <div
      className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg shadow-lg p-4">{renderProperties()}</div>
    </div>
 */
