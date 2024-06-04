import './styles/App.css';
import React from 'react';
import { BrowserRouter, Routes, Router, Route, Link, useLocation, useRoutes } from 'react-router-dom';
import Scene from './components/screens/Scene';
import { produce } from 'immer';
import { experienceType } from './components/types';
import SectionList from './components/SectionList';
import Drafts from './components/screens/DraftsBuilder';
import DraftBuilder from './components/screens/DraftsBuilder';
import Templete from './components/Templete';
import EmailFormBuilder from './components/screens/EmailBuilder';
import CoverLetterBulder from './components/screens/CoverLetterBuilder';
import Login from './components/screens/Login';

function App() {
  const [exp, setExp] = React.useState<experienceType[]>([]);
  // const location = useLocation();
  // Get the current location using the useLocation hook

  // Hide the nav bar on the Template screen
  const hideNavBar = location.pathname === '/scene';

  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen ">
        {!hideNavBar && (
          <nav id="navbar" className="bg-gray-800 text-white">
            <ul className="flex justify-between px-6 py-3">
              <li>
                <Link to="/" className="font-bold text-lg">
                  Sections
                </Link>
              </li>
              <li>
                <Link to="/drafts" className="font-bold text-lg">
                  Drafts
                </Link>
              </li>
              <li>
                <Link to="/email" className="font-bold text-lg">
                  Email
                </Link>
              </li>
              <li>
                <Link to="/cover-letter" className="font-bold text-lg">
                  Cover Letter
                </Link>
              </li>
            </ul>
          </nav>
        )}

        <div className={true ? 'container' : 'container mx-auto px-6 py-4'}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<SectionList />} />
            <Route path="/drafts" element={<DraftBuilder />} />
            <Route path="/scene" element={<Scene />} />
            <Route path="/email" element={<EmailFormBuilder />} />
            <Route path="/cover-letter" element={<CoverLetterBulder />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
