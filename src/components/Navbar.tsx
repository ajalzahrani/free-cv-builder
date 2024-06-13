import React, { useState } from 'react';
import '../styles/app.css';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '~/store/authStore';

export default function Navbar() {
  const { resetAuth, auth } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      resetAuth();
      navigate('/login');
    } else {
      resetAuth();
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="burger-menu" onClick={toggleMenu}>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
      </div>
      <ul className={isMenuOpen ? 'show' : ''}>
        <li>
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/sections" onClick={toggleMenu}>
            Sections
          </Link>
        </li>
        <li>
          <Link to="/drafts" onClick={toggleMenu}>
            Drafts
          </Link>
        </li>
        <li>
          <Link to="/email" onClick={toggleMenu}>
            Email
          </Link>
        </li>
        <li>
          <Link to="/cover-letter" onClick={toggleMenu}>
            Cover Letter
          </Link>
        </li>
        <li>
          <Link to="/linkpage" onClick={toggleMenu}>
            Link page
          </Link>
        </li>
        {auth?.user ? (
          <li className="logout-button">
            <button
              onClick={(e) => {
                handleLogout(e);
                toggleMenu();
              }}
            >
              Logout
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
