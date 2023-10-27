import React from 'react';
import schema from '../store/Schema';
import useStore from '../store/RepoLocalStorage';
import {
  headerType,
  contactType,
  experienceType,
  educationType,
  certificateType,
  skillType,
  projectType,
  languageType,
  interestType,
  sectionType,
} from './types';
import DraftCard from './DraftCard';
import UUID from './shared/UUID';

const Draft = () => {
  const [draft, setDraft] = React.useState(schema);
  const store = useStore();
  const [selectedSection, setSelectedSection] = React.useState<sectionType | null>(null);

  const handleHeaderChange = (header: headerType) => {
    setDraft((prevDraft) => ({
      ...prevDraft,
      id: UUID(),
      name: header.name,
      title: header.title,
      pitch: header.pitch,
    }));
  };

  const handleContactChange = (contact: contactType) => {
    setDraft((prevDraft) => ({
      ...prevDraft,
      contact: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address || '',
        github: contact.github || '',
        linkedin: contact.linkedin || '',
        website: contact.website || '',
        facebook: contact.facebook || '',
      },
    }));
  };

  const handleExperienceChange = (experience: experienceType) => {
    setDraft((prevDraft) => ({
      ...prevDraft,
      experiences: [
        ...prevDraft.experience,
        {
          id: UUID(),
          title: experience.title,
          company: experience.company,
          location: experience.location,
          from: experience.from,
          to: experience.to,
          description: experience.description,
        },
      ],
    }));
  };

  const handleEducationChange = (education: educationType) => {
    setDraft((prevDraft) => ({
      ...prevDraft,
      educations: [
        ...prevDraft.education,
        {
          id: UUID(),
          institution: education.institution,
          degree: education.degree,
          location: education.location,
          from: education.from,
          to: education.to,
          description: education.description,
        },
      ],
    }));
  };

  const handleCertificationChange = (certifications: certificateType) => {
    setDraft((prevDraft) => ({
      ...prevDraft,
      certifications: [
        ...prevDraft.certifications,
        {
          title: certifications.title,
          from: certifications.from,
          company: certifications.company,
          to: certifications.to,
          description: certifications.description,
          link: certifications.link,
        },
      ],
    }));
  };

  const handleSkillChange = (skills: skillType) => {
    setDraft((prevDraft) => ({
      ...prevDraft,
      skills: [
        ...prevDraft.skills,
        {
          id: UUID(),
          title: skills.title,
        },
      ],
    }));
  };

  const handleProjectChange = (projects: projectType) => {
    setDraft((prevDraft) => ({
      ...prevDraft,
      projects: [
        ...prevDraft.projects,
        {
          id: UUID(),
          title: projects.title,
          from: projects.from,
          to: projects.to,
          description: projects.description,
          link: projects.link,
        },
      ],
    }));
  };

  const handleLanguageChange = (languages: languageType) => {
    setDraft((prevDraft) => ({
      ...prevDraft,
      languages: [
        ...prevDraft.languages,
        {
          id: UUID(),
          title: languages.title,
          description: languages.description,
        },
      ],
    }));
  };

  const handleInterestChange = (interests: interestType) => {
    setDraft((prevDraft) => ({
      ...prevDraft,
      interests: [
        ...prevDraft.interests,
        {
          id: UUID(),
          title: interests.title,
          description: interests.description,
        },
      ],
    }));
  };

  function handleSectionClick(arg0: { type: string; data: any }): void {
    console.log(arg0);
    // Set the selected section as the resume draft

    switch (arg0.type) {
      case 'header':
        handleHeaderChange(arg0.data);
        break;
      case 'contact':
        handleContactChange(arg0.data);
        break;
      case 'experience':
        handleExperienceChange(arg0.data);
        break;
      case 'education':
        handleEducationChange(arg0.data);
        break;
      case 'certificate':
        handleCertificationChange(arg0.data);
        break;
      case 'skill':
        handleSkillChange(arg0.data);
        break;
      case 'project':
        handleProjectChange(arg0.data);
        break;
      case 'language':
        handleLanguageChange(arg0.data);
        break;
      case 'interest':
        handleInterestChange(arg0.data);
        break;
      default:
        new Error('Invalid section type');
    }
  }

  return (
    <div>
      {/* Render components for each section of the draft */}
      <div>
        <h2 className="text-lg font-bold mb-4">Sections</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => console.log(draft)}
        >
          Print Draft
        </button>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Header</h2>
          <div className="flex flex-wrap">
            {store.headers.map((header) => (
              <div key={header.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftCard section={header} onAdd={() => handleSectionClick({ type: 'header', data: header })} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Contacts</h2>
          <div className="flex flex-wrap">
            {store.contacts.map((contact, key) => (
              <div key={contact.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftCard
                  key={key}
                  section={contact}
                  onAdd={() => handleSectionClick({ type: 'contact', data: contact })}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Experiences</h2>
          <div className="flex flex-wrap">
            {store.experiences.map((experience) => (
              <div key={experience.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftCard
                  section={experience}
                  onAdd={() => handleSectionClick({ type: 'experience', data: experience })}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Educations</h2>
          <div className="flex flex-wrap">
            {store.educations.map((education) => (
              <div key={education.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftCard
                  section={education}
                  onAdd={() => handleSectionClick({ type: 'education', data: education })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Certificates</h2>
          <div className="flex flex-wrap">
            {store.certificates.map((certificate) => (
              <div key={certificate.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftCard
                  section={certificate}
                  onAdd={() => handleSectionClick({ type: 'certificate', data: certificate })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Skills</h2>
          <div className="flex flex-wrap">
            {store.skills.map((skill) => (
              <div key={skill.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftCard section={skill} onAdd={() => handleSectionClick({ type: 'skill', data: skill })} />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Projects</h2>
          <div className="flex flex-wrap">
            {store.projects.map((project) => (
              <div key={project.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftCard section={project} onAdd={() => handleSectionClick({ type: 'project', data: project })} />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Languages</h2>
          <div className="flex flex-wrap">
            {store.languages.map((language) => (
              <div key={language.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftCard section={language} onAdd={() => handleSectionClick({ type: 'language', data: language })} />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Interests</h2>
          <div className="flex flex-wrap">
            {store.interests.map((interest) => (
              <div key={interest.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftCard section={interest} onAdd={() => handleSectionClick({ type: 'interest', data: interest })} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draft;
