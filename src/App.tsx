import './styles/app.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Auth
import RequireAuth from './components/Auth/RequireAuth';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Admin from './components/Auth/Admin';
import Editor from './components/Auth/Editor';
import Home from './components/Auth/Home';
import Layout from './components/Auth/Layout';
import LinkPage from './components/Auth/LinkPage';
import Lounge from './components/Auth/Lounge';
import Missing from './components/Auth/Missing';
import Unauthorized from './components/Auth/Unauthorized';

// CV Builder
import SectionContainer from './components/Sections/SectionContainer';
import DraftBuilder from './components/NewDrafts/DraftsBuilder';
import EmailFormBuilder from './components/Emails/EmailBuilder';
import CoverLetterBulder from './components/CoverLetters/CoverLetterBuilder';
import Scene from './components/Scene';

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <div className="App">
      <Navbar />

      <div className={'container'}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="linkpage" element={<LinkPage />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* we want to protect these routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path="sections" element={<SectionContainer />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path="drafts" element={<DraftBuilder />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path="editor" element={<Editor />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
              <Route path="lounge" element={<Lounge />} />
            </Route>

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
