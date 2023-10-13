import React, { useState } from 'react';

export type inputType = {
  id: number;
  title: string;
  status?: boolean; // true is completed
  updateText: (text: string) => void;
};

export default function Input(textObject: inputType) {
  const [editing, setEditing] = useState(textObject.title === '' ? true : false);

  const onUpdateDone = () => {
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(true);
  };

  const completedStyle = {
    fontStyle: 'italic',
    // color: "#595959",
    opacity: 0.4,
    textDecoration: 'line-through',
  };
  return (
    <>
      <div onDoubleClick={handleEditing} style={editing ? { display: 'none' } : { display: '' }}>
        <button onClick={handleEditing}>Edit</button>

        <span style={textObject.status ? completedStyle : undefined}>{textObject.title}</span>
      </div>
      <input
        type="text"
        value={textObject.title}
        style={editing ? { display: '' } : { display: 'none' }}
        className="textInput"
        onChange={(e) => {
          textObject.updateText(e.target.value.toString());
        }}
      />
      <button onClick={() => onUpdateDone()} style={editing ? { display: '' } : { display: 'none' }}>
        Done
      </button>
    </>
  );
}
