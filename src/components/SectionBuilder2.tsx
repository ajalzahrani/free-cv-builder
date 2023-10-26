import React from 'react';
import { produce } from 'immer';
import InputExperience from './Sections/InputExperience';
import InputEducation from './Sections/InputEducation';
import { experienceType, educationType } from './types';

type Section = {
  title: string;
  component: React.FC<any>;
};

type category = {
  title: string;
  component?: React.FC<any>;
};

const categories: category[] = [
  { title: 'Professional Experience', component: InputExperience },
  { title: 'Academic Education', component: InputEducation },
];

export default function SectionBuilder2() {
  const [exp, setExp] = React.useState<experienceType[]>([]);
  const [edu, setEdu] = React.useState<educationType[]>([]);
  const [isAddingExperience, setIsAddingExperience] = React.useState<boolean>(false);
  const [isAddingEducation, setIsAddingEducation] = React.useState<boolean>(false);
  const [selectedSection, setSelectedSection] = React.useState<category | null>(null);

  const updateExperience = (experience: experienceType) => {
    const index = exp.findIndex((exp) => exp.title === experience.title);
    if (index !== -1) {
      // Update existing experience
      const newData = produce(exp, (draft) => {
        draft[index] = experience;
      });
      setExp(newData);
    } else {
      // Add new experience
      const newData = produce(exp, (draft) => {
        draft.push(experience);
      });
      setExp(newData);
    }
  };

  const updateEducation = (education: educationType) => {
    const index = edu.findIndex((edu) => edu.institution === education.institution);
    if (index !== -1) {
      // Update existing education
      const newData = produce(edu, (draft) => {
        draft[index] = education;
      });
      setEdu(newData);
    } else {
      // Add new education
      const newData = produce(edu, (draft) => {
        draft.push(education);
      });
      setEdu(newData);
    }
  };

  const handleAddExperience = () => {
    setIsAddingExperience(true);
    setSelectedSection(categories[0]);
  };

  const handleAddEducation = () => {
    setIsAddingEducation(true);
    setSelectedSection(categories[1]);
  };

  const handleCancelAddExperience = () => {
    setIsAddingExperience(false);
  };

  const handleCancelAddEducation = () => {
    setIsAddingEducation(false);
  };

  const handleSaveExperience = (experience: experienceType) => {
    updateExperience(experience);
    setIsAddingExperience(false);
  };

  const handleSaveEducation = (education: educationType) => {
    updateEducation(education);
    setIsAddingEducation(false);
  };

  const renderSections = (sections: category) => {
    const rows = [];
    for (let i = 0; i < sections.length; i++) {
      rows.push(
        <div key={sections[i].title}>
          <h3>{sections[i].title}</h3>
          <button onClick={() => setSelectedSection(sections[i])}>Add {sections[i].title}</button>
        </div>,
      );
    }
    return rows;
  };

  const renderSelectedSection = () => {
    if (selectedSection) {
      const Component = selectedSection.component;
      if (Component === InputExperience) {
        return (
          <InputExperience
            experience={{ title: '', company: '', location: '', from: '', to: '', description: '' }}
            onUpdateExperience={(newExperience: experienceType) => handleSaveExperience(newExperience)}
            // onCancel={() => handleCancelAddExperience()}
          />
        );
      } else if (Component === InputEducation) {
        return (
          <InputEducation
            education={{ institution: '', degree: '', location: '', from: '', to: '', description: '' }}
            onUpdateEducation={(newEducation: educationType) => handleSaveEducation(newEducation)}
            // onCancel={() => handleCancelAddEducation()}
          />
        );
      }
    }
    return null;
  };

  return (
    <div>
      <div>
        {categories.map((category) => (
          <div key={category.title}>
            <h2>{category.title}</h2>
            {/* {categories.map(category = {
                return renderSections(category)
               
            })} */}
            {/* {renderSections(categories)} */}
          </div>
        ))}
      </div>
      <div>
        {renderSelectedSection()}
        {!isAddingExperience && !isAddingEducation && (
          <div>
            <button onClick={() => handleAddExperience()}>Add Experience</button>
            <button onClick={() => handleAddEducation()}>Add Education</button>
          </div>
        )}
      </div>
    </div>
  );
}
