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
    // make switch statement amond buklders
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
    <div>
      {/* <h1>Sections</h1> */}
      <div className="section-container">
        <div className="section-buttons">
          <button
            onClick={() => {
              // save data to local storage
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
        {selectedSection && <div className="builders">{renderBuilder(selectedSection.title)}</div>}
      </div>
    </div>
  );
}
