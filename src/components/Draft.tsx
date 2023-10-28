import React from 'react';
import schema from '../store/Schema';
import useStore from '../store/RepoLocalStorage';
import useDraftStore from '../store/DraftLocalStore';
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
} from './types';
import DraftCard from './DraftCard';
import UUID from './shared/UUID';
import DraftCardPreivew from './DraftCardPreivew';

const Draft = () => {
  const { setSchema, schema } = useDraftStore();
  const [draft, setDraft] = React.useState(schema);
  const [showDialog, setShowDialog] = React.useState(false);
  const [dialogData, setDialgoData] = React.useState({});
  const [selectedCards, setSelectedCards] = React.useState<string[]>(schema.selectedCards);

  const store = useStore();

  const handleHeaderChange = (header: headerType) => {
    setDraft((prevDraft) => ({
      ...prevDraft,
      id: header.id,
      name: header.name,
      title: header.title,
      pitch: header.pitch,
    }));
  };

  const handleContactChange = (contact: contactType) => {
    setDraft((prevDraft) => ({
      ...prevDraft,
      contacts: {
        id: contact.id,
        name: contact.title,
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
        ...prevDraft.experiences,
        {
          id: experience.id,
          title: experience.title,
          company: experience.company,
          location: experience.location,
          from: experience.from,
          to: experience.to,
          description: experience.description,
          tasks: experience.tasks,
        },
      ],
    }));
  };

  const handleEducationChange = (education: educationType) => {
    setDraft((prevDraft) => ({
      ...prevDraft,
      educations: [
        ...prevDraft.educations,
        {
          id: education.id,
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
      certificates: [
        ...prevDraft.certificates,
        {
          id: certifications.id,
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
          id: skills.id,
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
          id: projects.id,
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

  const handlePreviewCard = (arg0: { data: any }): void => {
    setShowDialog(true);
    setDialgoData(arg0.data);
  };

  React.useEffect(() => {
    setDraft((prevDraft) => ({
      ...prevDraft,
      selectedCards: selectedCards,
    }));
  }, [selectedCards.length]);

  const handleSelectedCards = (id: string) => {
    if (selectedCards.includes(id)) {
      // remove the id from the selected cards
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
    } else {
      // push the id to the selected cards
      setSelectedCards([...selectedCards, id]);
    }
  };

  function handleSectionClick(arg0: { type: string; data: any }): void {
    console.log(arg0.data.id);

    handleSelectedCards(arg0.data.id);

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
      {showDialog && <DraftCardPreivew onClose={() => setShowDialog(false)} data={dialogData} />}
      {/* Render components for each section of the draft */}
      <div>
        <h2 className="text-lg font-bold mb-4">Sections</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
          onClick={() => {
            console.log(draft);

            setSchema(draft);
          }}
        >
          Save Draft
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
          onClick={() => {
            // print draft
            setDialgoData(draft);
            setShowDialog(true);
          }}
        >
          Print Draft
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => {
            localStorage.removeItem('draft');
          }}
        >
          Delete Draft
        </button>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Header</h2>
          <div className="flex flex-wrap">
            {store.headers.map((header) => (
              <div key={header.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftCard
                  section={header}
                  onShow={() => handlePreviewCard({ data: header })}
                  onAdd={() => handleSectionClick({ type: 'header', data: header })}
                  isCardSelected={selectedCards.includes(header.id)}
                />
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
                  onShow={() => handlePreviewCard({ data: contact })}
                  onAdd={() => handleSectionClick({ type: 'contact', data: contact })}
                  isCardSelected={selectedCards.includes(contact.id)}
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
                  onShow={() => handlePreviewCard({ data: experience })}
                  onAdd={() => handleSectionClick({ type: 'experience', data: experience })}
                  isCardSelected={selectedCards.includes(experience.id)}
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
                  onShow={() => handlePreviewCard({ data: education })}
                  onAdd={() => handleSectionClick({ type: 'education', data: education })}
                  isCardSelected={selectedCards.includes(education.id)}
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
                  onShow={() => handlePreviewCard({ data: certificate })}
                  onAdd={() => handleSectionClick({ type: 'certificate', data: certificate })}
                  isCardSelected={selectedCards.includes(certificate.id)}
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
                <DraftCard
                  section={skill}
                  onShow={() => handlePreviewCard({ data: skill })}
                  onAdd={() => handleSectionClick({ type: 'skill', data: skill })}
                  isCardSelected={selectedCards.includes(skill.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Projects</h2>
          <div className="flex flex-wrap">
            {store.projects.map((project) => (
              <div key={project.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftCard
                  section={project}
                  onShow={() => handlePreviewCard({ data: project })}
                  onAdd={() => handleSectionClick({ type: 'project', data: project })}
                  isCardSelected={selectedCards.includes(project.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Languages</h2>
          <div className="flex flex-wrap">
            {store.languages.map((language) => (
              <div key={language.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftCard
                  section={language}
                  onShow={() => handlePreviewCard({ data: language })}
                  onAdd={() => handleSectionClick({ type: 'language', data: language })}
                  isCardSelected={selectedCards.includes(language.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Interests</h2>
          <div className="flex flex-wrap">
            {store.interests.map((interest) => (
              <div key={interest.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftCard
                  section={interest}
                  onShow={() => handlePreviewCard({ data: interest })}
                  onAdd={() => handleSectionClick({ type: 'interest', data: interest })}
                  isCardSelected={selectedCards.includes(interest.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draft;
