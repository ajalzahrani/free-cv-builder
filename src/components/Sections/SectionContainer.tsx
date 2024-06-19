import React, { useState } from 'react';
import { PassableInputComponentType } from '../Types';
import SectionBuilder from './SectionBuilder';
import InputHeader from './InputForms/InputHeader';
import InputContact from './InputForms/InputContact';
import InputExperience from './InputForms/InputExperience';
import InputEducation from './InputForms/InputEducation';
import InputCertificate from './InputForms/InputCertificate';
import InputProject from './InputForms/InputProject';
import InputSkill from './InputForms/InputSkill';
import InputInterest from './InputForms/InputInterest';
import InputLanguage from './InputForms/InputLanguage';
import InputCommittee from './InputForms/InputCommittee';

const sections: PassableInputComponentType[] = [
  {
    title: 'Header',
    getUrl: '/cv/headers',
    manUrl: '/cv/header',
    InputComponent: InputHeader,
  },
  {
    title: 'Contact',
    getUrl: '/cv/contacts',
    manUrl: '/cv/contact',
    InputComponent: InputContact,
  },
  {
    title: 'Experience',
    getUrl: '/cv/experiences',
    manUrl: '/cv/experience',
    InputComponent: InputExperience, // Assume you have this component
  },
  {
    title: 'Education',
    getUrl: '/cv/educations',
    manUrl: '/cv/education',
    InputComponent: InputEducation, // Assume you have this component
  },
  {
    title: 'Certificate',
    getUrl: '/cv/certificates',
    manUrl: '/cv/certificate',
    InputComponent: InputCertificate, // Assume you have this component
  },
  {
    title: 'Projects',
    getUrl: '/cv/projects',
    manUrl: '/cv/project',
    InputComponent: InputProject, // Assume you have this component
  },
  {
    title: 'Skills',
    getUrl: '/cv/skills',
    manUrl: '/cv/skill',
    InputComponent: InputSkill, // Assume you have this component
  },
  {
    title: 'Interests',
    getUrl: '/cv/interrests',
    manUrl: '/cv/interrest',
    InputComponent: InputInterest, // Assume you have this component
  },
  {
    title: 'Languages',
    getUrl: '/cv/languages',
    manUrl: '/cv/language',
    InputComponent: InputLanguage, // Assume you have this component
  },
  // {
  //   title: 'Committees',
  //   getUrl: '/cv/committees',
  //   manUrl: '/cv/committee',
  //   InputComponent: InputCommittee, // Assume you have this component
  // },
];

export default function SectionList() {
  const [selectedSection, setSelectedSection] = useState<PassableInputComponentType | null>(sections[0]);

  const handleSectionClick = (section: PassableInputComponentType) => {
    setSelectedSection(section);
  };

  const renderBuilder = (section: PassableInputComponentType) => {
    const { title, getUrl, manUrl, InputComponent } = section;
    return <SectionBuilder key={title} title={title} getUrl={getUrl} manUrl={manUrl} InputComponent={InputComponent} />;
  };

  return (
    <div className="section-container">
      <div className="section-buttons">
        <button
          onClick={() => {
            alert('Not implemented yet');
          }}
        >
          Upload
        </button>
        {sections.map((section) => (
          <div key={section.title}>
            <button className="section-button" onClick={() => handleSectionClick(section)}>
              {section.title}
            </button>
          </div>
        ))}
      </div>

      <div className="section-dropdown">
        <select
          onChange={(e) => {
            const selectedTitle = e.target.value;
            const selected = sections.find((section) => section.title === selectedTitle);
            if (selected) {
              setSelectedSection(selected);
            }
          }}
          value={selectedSection?.title || ''}
        >
          {sections.map((section) => (
            <option key={section.title} value={section.title}>
              {section.title}
            </option>
          ))}
        </select>
      </div>

      {selectedSection && <div className="builders">{renderBuilder(selectedSection)}</div>}
    </div>
  );
}
