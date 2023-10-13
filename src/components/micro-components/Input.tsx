import React, { useState } from 'react';

type props = {
  id: number;
  title: string;
  status?: boolean; // true is completed
};

export default function Input(TextObject: props) {
  const [editing, setEditing] = useState(TextObject.title === '' ? true : false);
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
        <button onClick={() => deleteTextObject(TextObject.id)}>Delete</button>
        <button onClick={handleEditing}>Edit</button>

        <input
          type="checkbox"
          className="checkbox"
          checked={TextObject.status}
          onChange={() => toggleTextObject(TextObject.id)}
        />

        <span style={TextObject.status ? completedStyle : undefined}>{TextObject.title}</span>
      </div>
      <input
        type="text"
        value={TextObject.title}
        style={editing ? { display: '' } : { display: 'none' }}
        className="textInput"
        onChange={(e) => {
          updateTextObject(TextObject.id, e.currentTarget.value);
        }}
        // onKeyDown={(e) => onUpdateDone(e)}
      />
    </>
  );
}
