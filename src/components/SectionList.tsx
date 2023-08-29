import { useState } from 'react';
import '../styles/App.css';
import Section from './Section';
import useStore from '../store';

export type SectionType = {
  id: number;
  title: string;
  status?: boolean; // true is completed
};

export type SectionListType = SectionType[];

function SectionList() {
  const [sectionTitle, setSectionTitle] = useState<string>('');
  const sections = useStore((s) => s.sections);
  const addSection = useStore((s) => s.addSection);

  const submit = () => {
    const newSection: SectionType = {
      id: Math.random() * 2.5,
      title: sectionTitle,
      status: false,
    };

    addSection(newSection);
  };

  return (
    <div className="App">
      <input
        type="text"
        // onKeyDown={(e) => onKeyDownHandler(e)}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setSectionTitle(e.currentTarget.value)}
        className="input"
      />
      <button onClick={submit}>submit</button>
      <div className="custom-list">
        <ul>
          {sections?.map((section, i) => {
            return <Section key={i} Section={section} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default SectionList;
