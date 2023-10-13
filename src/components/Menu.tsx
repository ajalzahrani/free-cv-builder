import React, { useState } from 'react';
import '../styles/App.css';

// make a left side menu component
function Menu() {
  const [isHeader, setIsHeader] = useState<boolean>(false);
  const [isPractical, setIsPractical] = useState<boolean>(false);
  const [isAbilities, setIsAbilities] = useState<boolean>(false);
  const [isTheoretical, setIsTheoretical] = useState<boolean>(false);
  const [isRecognition, setIsRecognition] = useState<boolean>(false);
  const [isPersonality, setIsPersonality] = useState<boolean>(false);

  const headerOnClick = () => {
    // Show items in the header section
  };
  return (
    <div className="menu">
      <ul className="menu">
        <button className="menu-button" onClick={() => setIsHeader((pre) => !pre)}>
          Header
        </button>
        {isHeader ? (
          <div className="menu">
            <button className="menu-button">Title</button>
            <button className="menu-button">Summary</button>
            <button className="menu-button">Contact</button>
          </div>
        ) : null}
        <button className="menu-button" onClick={() => setIsPractical((pre) => !pre)}>
          Practical
        </button>
        {isPractical ? (
          <div className="menu">
            <button className="menu-button">Work Experience</button>
            <button className="menu-button">Projects</button>
            <button className="menu-button">Volunteer Experience</button>
            <button className="menu-button">Teaching</button>
            <button className="menu-button">Publications</button>
          </div>
        ) : null}
        <button className="menu-button">Abilities</button>
        <button className="menu-button">Theoretical</button>
        <button className="menu-button">Recognition</button>
        <button className="menu-button">Personality</button>
      </ul>
    </div>
  );
}

export default Menu;
