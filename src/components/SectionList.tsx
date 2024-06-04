import React from 'react';
import { section } from './types';
import EductionBuilder from './Sections/EductionBuilder';
import ExperienceBuilder from './Sections/ExperienceBuilder';
import CertificateBuilder from './Sections/CertificateBuilder';
import ProjectBuilder from './Sections/ProjectBuilder';
import SkillBuilder from './Sections/SkillBuilder';
import InterestBuilder from './Sections/InterestBuilder';
import HeaderBuilder from './Sections/HeaderBuilder';
import ContactBuilder from './Sections/ContactBuilder';
import LanguageBuilder from './Sections/LanguageBuilder';
import CommitteeBuilder from './Sections/CommitteeBuilder';

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
        return <HeaderBuilder />;
      case 'Contacts':
        return <ContactBuilder />;
      case 'Experience':
        return <ExperienceBuilder />;
      case 'Education':
        return <EductionBuilder />;
      case 'Certificate':
        return <CertificateBuilder />;
      case 'Projects':
        return <ProjectBuilder />;
      case 'Skills':
        return <SkillBuilder />;
      case 'Interests':
        return <InterestBuilder />;
      case 'Languages':
        return <LanguageBuilder />;
      case 'Committees':
        return <CommitteeBuilder />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <h1 className="text-2xl font-bold mb-4">Sections</h1>
      <div className="flex">
        <div className="bg-gray-100 w-1/5">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full mb-4"
            onClick={() => {
              // save data to local storage
              alert('Not implemented yet');
            }}
          >
            Upload
          </button>
          {sections.map((section) => (
            <div key={section.title} className="mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handleSectionClick(section)}
                style={{
                  backgroundColor: selectedSection?.title === section.title ? '#60A5FA' : '#3B82F6',
                }}
              >
                {section.title}
              </button>
            </div>
          ))}
        </div>
        {selectedSection && (
          <div className="flex-1">
            {/* <button onClick={() => setSelectedSection(null)}>Back</button> */}
            <div>{renderBuilder(selectedSection.title)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
