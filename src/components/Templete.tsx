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
import schema from '~/store/Schema';

function Builder() {
  let storedState = localStorage.getItem('draft');

  const initialState = storedState ? JSON.parse(storedState) : schema;

  return (
    <div className="fu-light container">
      <Header header={initialState} />
      <Contacts contact={initialState.contact} />
      <Experience experience={initialState.experience} />
      <Education education={initialState.education} />
      <Certificates cetifications={initialState.certifications} />
      <Skills skills={initialState.skills} />
      <Projects projects={initialState.projects} />
      <Languages languages={initialState.languages} />
      <Intersets interests={initialState.interests} />
    </div>
  );
}

export default Builder;
