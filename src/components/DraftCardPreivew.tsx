import React from 'react';

type Props = {
  onClose: () => void;
  children?: React.ReactNode;
  data: any;
};

const MAX_TEXT_LENGTH = 50;

const DraftCardPreivew: React.FC<Props> = ({ onClose, children, data }) => {
  const renderProperties = () => {
    if (Array.isArray(data)) {
      {
        data.map((item) => {
          return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="w-96 bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
                <div className="text-black text-lg font-bold mb-2">Your Modal Title</div>
                <div className="bg-white rounded-lg p-4 shadow-inner overflow-y-auto">{renderProperties()}</div>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => onClose()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        });
      }
    } else {
      return Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <span className="font-bold">{key}: </span>
          {/* check if value is array if is array then apply max_text_lenght to each element */}

          <span>{value}</span>
        </div>
      ));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-96 bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
        <div className="text-black text-lg font-bold mb-2">Your Modal Title</div>
        <div className="bg-white rounded-lg p-4 shadow-inner overflow-y-auto">{renderProperties()}</div>
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => onClose()}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraftCardPreivew;
