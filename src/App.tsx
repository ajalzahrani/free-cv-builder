import './styles/App.css';
import React from 'react';
import { BrowserRouter, Routes, Router, Route, Link, useLocation } from 'react-router-dom';
import Scene from './components/screens/Scene';
import { produce } from 'immer';
import { experienceType } from './components/types';
import SectionList from './components/SectionList';
import Draft from './components/Draft';
import Drafts from './components/screens/DraftsBuilder';
import DraftBuilder from './components/screens/DraftsBuilder';
import Templete from './components/Templete';

function App() {
  const [exp, setExp] = React.useState<experienceType[]>([]);
  // const location = useLocation();
  // Get the current location using the useLocation hook

  // Hide the nav bar on the Template screen
  // const hideNavBar = location.pathname === '/template';

  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen ">
        <nav id="navbar" className="bg-gray-800 text-white">
          <ul className="flex justify-between px-6 py-3">
            <li>
              <Link to="/" className="font-bold text-lg">
                Sections
              </Link>
            </li>
            {/* <li>
              <Link to="/draft" className="font-bold text-lg">
                Draft
              </Link>
            </li> */}
            <li>
              <Link to="/drafts" className="font-bold text-lg">
                Drafts
              </Link>
            </li>
          </ul>
        </nav>

        <div className={true ? 'container' : 'container mx-auto px-6 py-4'}>
          <Routes>
            <Route path="/" element={<SectionList />} />
            {/* <Route path="/draft" element={<Draft />} /> */}
            <Route path="/drafts" element={<DraftBuilder />} />
            <Route path="/scene" element={<Scene />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
