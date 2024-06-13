import React from 'react';
import { section } from '../Types';
import EductionBuilder from './EductionBuilder';
import ExperienceBuilder from './ExperienceBuilder';
import CertificateBuilder from './CertificateBuilder';
import ProjectBuilder from './ProjectBuilder';
import SkillBuilder from './SkillBuilder';
import InterestBuilder from './InterestBuilder';
import HeaderBuilder from './HeaderBuilder';
import ContactBuilder from './ContactBuilder';
import LanguageBuilder from './LanguageBuilder';
import CommitteeBuilder from './CommitteeBuilder';

const sections: section[] = [
  { title: 'Header', component: HeaderBuilder },
  { title: 'Contacts', component: ContactBuilder },
  { title: 'Experience', component: ExperienceBuilder },
  { title: 'Education', component: EductionBuilder },
  { title: 'Certificate', component: CertificateBuilder },
  { title: 'Projects', component: ProjectBuilder },
  { title: 'Skills', component: SkillBuilder },
  { title: 'Interests', component: InterestBuilder },
  { title: 'Languages', component: LanguageBuilder },
  { title: 'Committees', component: CommitteeBuilder },
];

export default function SectionList() {
  const [selectedSection, setSelectedSection] = React.useState<section | null>(sections[0]);

  const handleSectionClick = (section: section) => {
    setSelectedSection(section);
  };

  const renderBuilder = (title: string) => {
    switch (title) {
      case 'Header':
        return (
          <HeaderBuilder
            section={{
              id: '',
              title: '',
              company: '',
              location: '',
              from: '',
              to: '',
              description: '',
              experinceTasks: [],
            }}
          />
        );
      case 'Contacts':
        return (
          <ContactBuilder
            section={{
              id: '',
              name: '',
              title: '',
              pitch: '',
            }}
          />
        );
      case 'Experience':
        return <ExperienceBuilder title={''} />;
      case 'Education':
        return <EductionBuilder title={''} />;
      case 'Certificate':
        return <CertificateBuilder title={''} />;
      case 'Projects':
        return (
          <ProjectBuilder
            section={{
              id: '',
              name: '',
              title: '',
              pitch: '',
            }}
          />
        );
      case 'Skills':
        return (
          <SkillBuilder
            section={{
              id: '',
              name: '',
              title: '',
              pitch: '',
            }}
          />
        );
      case 'Interests':
        return <InterestBuilder />;
      case 'Languages':
        return (
          <LanguageBuilder
            section={{
              id: '',
              name: '',
              title: '',
              pitch: '',
            }}
          />
        );
      case 'Committees':
        return (
          <CommitteeBuilder
            section={{
              id: '',
              name: '',
              title: '',
              pitch: '',
            }}
          />
        );
      default:
        return <div>Not Found</div>;
    }
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
        {/* <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center' }}> */}
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

      {selectedSection && <div className="builders">{renderBuilder(selectedSection.title)}</div>}
    </div>
  );
}
