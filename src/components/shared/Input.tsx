import React, { useState, useCallback } from 'react';

export type InputProps = {
  id: number;
  title: string;
  status?: boolean; // true is completed
  updateText: (id: number, text: string) => void;
};

const Input = React.memo(({ id, title, status, updateText }: InputProps) => {
  const [editing, setEditing] = useState(title === '');
  const [text, setText] = useState(title);

  const onUpdateDone = useCallback(() => {
    setEditing(false);
    updateText(id, text);
  }, []);

  const handleEditing = useCallback(() => {
    setEditing(true);
  }, []);

  const completedStyle = {
    fontStyle: 'italic',
    opacity: 0.4,
    textDecoration: 'line-through',
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateText(id, e.target.value.toString());
    },
    [updateText],
  );

  return (
    <div className="flex mt-4">
      <div onDoubleClick={handleEditing} className={editing ? 'hidden' : 'flex items-center'}>
        <button
          onClick={handleEditing}
          // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          className="text-blue-500 hover:text-blue-700 py-1 px-3 rounded bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
        >
          Edit
        </button>
        <span className={status ? 'italic opacity-40 line-through ml-4' : 'ml-4'}>{title}</span>
      </div>
      <input
        type="text"
        value={text}
        className={
          editing
            ? 'block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            : 'text-gray-700 leading-tight'
        }
        onChange={(e) => {
          // updateText(id, e.target.value.toString());
          setText(e.target.value.toString());
          // handleInputChange(e);
        }}
      />
      <button
        onClick={() => onUpdateDone()}
        className={editing ? 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4' : 'hidden'}
      >
        Done
      </button>
    </div>
  );
});

export default Input;
