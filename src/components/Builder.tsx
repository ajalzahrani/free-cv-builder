import React from 'react';
import '../styles/App.css';
import Experience from './Sections/Experience';
import Header from './Sections/Header';
import Contacts from './Sections/Contacts';
import Projects from './Sections/Projects';
import Skills from './Sections/Skills';
import Certificates from './Sections/Certificates';
import Education from './Sections/Education';
import Languages from './Sections/Languages';
import Intersets from './Sections/Intersets';
import SectionBuilder from './SectionBuilder';

function Builder() {
  return (
    <div className="fu-light container">
      <SectionBuilder />
      {/* Header section */}
      <Header />

      {/* Contact information section */}
      <Contacts />

      {/* Work experience section */}
      <Experience />

      {/* Education section */}
      <Education />

      {/* Certificate section */}
      <Certificates />

      {/* Skills section */}
      <Skills />

      {/* Personal project section */}
      <Projects />

      {/* Languages section */}
      <Languages />

      {/* Interests  section */}
      <Intersets />
    </div>
  );
}

export default Builder;
