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

type SectionListProps = {
  sections: section[];
};

const sections: section[] = [
  { title: 'Header', component: HeaderBuilder },
  { title: 'Contacts', component: ContactBuilder },
  { title: 'Work Experience', component: ExperienceBuilder },
  { title: 'Academic Education', component: EductionBuilder },
  { title: 'Certificate', component: CertificateBuilder },
  { title: 'Projects', component: ProjectBuilder },
  { title: 'Skills', component: SkillBuilder },
  { title: 'Interests', component: InterestBuilder },
  { title: 'Languages', component: LanguageBuilder },
];

export default function SectionList() {
  const [selectedSection, setSelectedSection] = React.useState<section | null>(null);

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
      case 'Work Experience':
        return <ExperienceBuilder />;
      case 'Academic Education':
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
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Sections</h2>
      <div className="flex">
        <div className="bg-gray-100 w-1/5">
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
