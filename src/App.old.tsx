import './styles/App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Scene from './components/screens/Scene';
import { produce } from 'immer';
import { experienceType } from './components/Types';
import SectionList from './components/Sections/SectionList';
import Drafts from './components/screens/Drafts/DraftsBuilder';
import DraftBuilder from './components/screens/Drafts/DraftsBuilder';
import Templete from './components/screens/Drafts/Templete';
import EmailFormBuilder from './components/screens/EmailBuilder';
import CoverLetterBulder from './components/CoverLetters/CoverLetterBuilder';
import Login from './components/screens/Login';
import Home from './components/screens/Home';
import Logout from './components/screens/Logout';

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
                <Link to="/sections" className="font-bold text-lg">
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
              <li>
                <Link to="/logout" className="font-bold text-lg">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        )}

        <div className={true ? 'container' : 'container mx-auto px-6 py-4'}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sections" element={<SectionList />} />
            <Route path="/drafts" element={<DraftBuilder />} />
            <Route path="/scene" element={<Scene />} />
            <Route path="/email" element={<EmailFormBuilder />} />
            <Route path="/cover-letter" element={<CoverLetterBulder />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
