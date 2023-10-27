import React from 'react';
import { sectionType } from '~/components/types';
import DraftCardPreview from './DraftCardPreivew';
import Draft from './Draft';

type Props = {
  section: sectionType;
  onAdd?: () => void;
  onShow?: () => void;
};

const MAX_TEXT_LENGTH = 50;

const DraftCard = ({ section, onAdd, onShow }: Props) => {
  const renderProperties = () => {
    return Object.entries(section).map(([key, value]) => (
      <div key={key}>
        <span className="font-bold">{key}: </span>
        {/* check if value is array if is array then apply max_text_lenght to each element */}
        {Array.isArray(value) ? (
          <ul>
            {value.map((item, index) => (
              <li key={index}>
                <span>{item.length > MAX_TEXT_LENGTH ? `${item.slice(0, MAX_TEXT_LENGTH - 20)}...` : item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <span>{value.length > MAX_TEXT_LENGTH ? `${value.slice(0, MAX_TEXT_LENGTH)}...` : value}</span>
        )}
      </div>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4  flex flex-col justify-between">
      {/* <h1 className="text-2xl font-bold mb-4">{section.type}</h1> */}
      {renderProperties()}
      {onAdd && (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => {
              onAdd();
            }}
          >
            Add
          </button>
          {onShow && (
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-4 py-2 px-4 rounded mt-4"
                onClick={() => {
                  // when show button is clicked, we want to show the Input component for this section
                  onShow();
                }}
              >
                Show
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DraftCard;
