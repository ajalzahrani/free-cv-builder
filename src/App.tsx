import './styles/app.css';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import useAuthStore from '~/store/authStore';
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
import SectionList from './components/Sections/SectionList';
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
  const hideNavBar = location.pathname === '/scene';

  const { resetAuth, auth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: auth?.user.id }),
    });

    if (response.ok) {
      const data = await response.json();
      // Save the token or handle the response as needed
      // Redirect to the home page
      resetAuth();
      navigate('/login');
    } else {
      // Handle login failure
      // get response message

      // const responsekk = await response.text();
      // alert(response.status + ' ' + response.statusText + ' ' + responsekk);
      resetAuth();
      navigate('/login');
      // alert('Login failed. Please check your credentials.');
    }
  };

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
              <Route path="sections" element={<SectionList />} />
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
