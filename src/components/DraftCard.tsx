import React from 'react';
import { sectionType } from '~/components/types';

type Props = {
  section: any;
  onAdd?: () => void;
  onShow?: () => void;
  isCardSelected?: boolean;
};

const MAX_TEXT_LENGTH = 50;

const DraftCard: React.FC<Props> = ({ section, onAdd, onShow, isCardSelected }) => {
  // make a state and action for add button if add button clicked it change the text to added
  const [isAdded, setIsAdded] = React.useState(false);
  // make the action

  const handleAdd = () => {
    setIsAdded(true);
    onAdd && onAdd();
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <h5 className="text-l font-bold tracking-tight text-gray-900 dark:text-white">{section.title}</h5>

        <div
          className="mb-3 font-normal text-gray-700 dark:text-gray-400"
          style={{ maxHeight: '100px', overflow: 'hidden' }}
        >
          <ul className="list-disc ">
            {Object.entries(section).map(([key, value]) => (
              <li key={key} className="flex items-center ">
                <span className="font-semibold mr-1">{key}:</span>
                {Array.isArray(value) ? (
                  <ul className="list-disc ml-4">
                    {value.map((item, index) => (
                      <li key={index}>
                        <span
                          style={{
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            maxWidth: '100%',
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '100%' }}>
                    {value}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className=" flex">
          <div>
            {onAdd && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
                onClick={handleAdd}
                style={isCardSelected ? { background: 'gray' } : { background: 'blue' }}
              >
                {isCardSelected ? 'Added' : 'Add'}
              </button>
            )}
          </div>
          <div>
            {onShow && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out ml-2"
                onClick={onShow}
              >
                Show
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftCard;
