import React from 'react';
import { section } from './types';
import EductionBuilder from './Sections/EductionBuilder';
import ExperienceBuilder from './Sections/ExperienceBuilder';
import CertificateBuilder from './Sections/CertificateBuilder';
import ProjectBuilder from './Sections/ProjectBuilder';

type SectionListProps = {
  sections: section[];
};

const sections: section[] = [
  { title: 'Professional Experience', component: ExperienceBuilder },
  { title: 'Academic Education', component: EductionBuilder },
  { title: 'Certificate', component: CertificateBuilder },
  { title: 'Projects', component: ProjectBuilder },
];

export default function SectionList() {
  const [selectedSection, setSelectedSection] = React.useState<section | null>(null);

  const handleSectionClick = (section: section) => {
    setSelectedSection(section);
  };

  const renderBuilder = (title: string) => {
    // make switch statement amond buklders
    switch (title) {
      case 'Professional Experience':
        return <ExperienceBuilder />;
      case 'Academic Education':
        return <EductionBuilder />;
      case 'Certificate':
        return <CertificateBuilder />;
      case 'Projects':
        return <ProjectBuilder />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div>
      <div>
        {sections.map((section) => (
          <div key={section.title}>
            <button onClick={() => handleSectionClick(section)}>{section.title}</button>
          </div>
        ))}
      </div>
      {selectedSection && (
        <div>
          <button onClick={() => setSelectedSection(null)}>Back</button>
          <div>{renderBuilder(selectedSection.title)}</div>
        </div>
      )}
    </div>
  );
}
