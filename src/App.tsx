import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Scene from './components/screens/Scene';
import { produce } from 'immer';
import { experienceType } from './components/types';
import SectionList from './components/SectionList';

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
            <li>
              <Link to="/" className="font-bold text-lg">
                Sections
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
            <Route path="/scene" element={<Scene />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
