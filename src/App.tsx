import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Menu from './components/Menu';
import Builder from './components/Builder';
import Scene from './components/screens/Scene';
import { produce } from 'immer';
import SectionBuilder from './components/Sections/ExperienceBuilder';
import SectionBuilder2 from './components/SectionBuilder2';
import InputExperience from './components/Sections/InputExperience';
import { experienceType } from './components/types';
import SectionList from './components/SectionList';

const experience: experienceType = {
  title: 'Software Engineer',
  company: 'ABC Company',
  location: 'San Francisco, CA',
  from: 'January 2019',
  to: 'Present',
  description: 'Developed and maintained web applications using React and Node.js.',
};

function App() {
  const [exp, setExp] = React.useState<experienceType[]>([]);
  const updateExperience = (experience: experienceType) => {
    const newData = produce(exp, (draft) => {
      draft.push(experience);
    });
    setExp(newData);
  };
  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen">
        <nav className="bg-gray-800 text-white">
          <ul className="flex justify-between px-6 py-3">
            {/* <li>
              <Link to="/section2" className="font-bold text-lg">
                Section Builder 2
              </Link>
            </li> */}
            <li>
              <Link to="/" className="font-bold text-lg">
                Section List
              </Link>
            </li>
            <li>
              <Link to="/scene" className="font-bold text-lg">
                Scene
              </Link>
            </li>
          </ul>
        </nav>

        <div className="container mx-auto px-6 py-4">
          <Routes>
            <Route path="/" element={<SectionList />} />
            {/* <Route path="/section2" element={<SectionBuilder2 />} /> */}
            <Route path="/scene" element={<Scene />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
