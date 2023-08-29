import React, { useState } from 'react';
import '../styles/App.css';
import { SectionType } from './SectionList';
import useStore from '../store';

type PropsType = {
  Section: SectionType;
  // the bellow props was for component drilling .
  // toggleSection: (id: number) => void;
  // deleteSection: (id: number) => void;
  // updateSection: (id: number, title: string) => void;
};

const Section = ({ Section }: PropsType) => {
  const [editing, setEditing] = useState(false);

  const updateSection = useStore((s) => s.updateSection);
  const deleteSection = useStore((s) => s.deleteSection);
  const toggleSection = useStore((s) => s.toggleSection);

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
    <div className="custom-list">
      <li className="item">
        <div onDoubleClick={handleEditing} style={editing ? { display: 'none' } : { display: '' }}>
          <button onClick={() => deleteSection(Section.id)}>Delete</button>
          <button onClick={handleEditing}>Edit</button>

          <input
            type="checkbox"
            className="checkbox"
            checked={Section.status}
            onChange={() => toggleSection(Section.id)}
          />

          <span style={Section.status ? completedStyle : undefined}>{Section.title}</span>
        </div>
        <input
          type="text"
          value={Section.title}
          style={editing ? { display: '' } : { display: 'none' }}
          className="textInput"
          onChange={(e) => {
            updateSection(Section.id, e.currentTarget.value);
          }}
          // onKeyDown={(e) => onUpdateDone(e)}
        />
        <button onClick={() => onUpdateDone()} style={editing ? { display: '' } : { display: 'none' }}>
          Done
        </button>
      </li>
    </div>
  );
};

export default Section;
