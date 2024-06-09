import React, { useEffect } from 'react';
import useStore from '../../store/RepoLocalStorage';
import { draftSkiltonType, sectionType, skillType } from '../Types';
import DraftSkiltonCard from './DraftSkiltonCard';
// import DraftCard from './DraftCard';
// import DraftCardPreivew from './DraftCardPreivew';

type DraftProps = {
  draftSkilton: draftSkiltonType;
  setDraftSkilton: (draftSkilton: draftSkiltonType) => void;
};

const Draft = ({ draftSkilton, setDraftSkilton }: DraftProps) => {
  const [draft, setDraft] = React.useState(draftSkilton);
  const [showDialog, setShowDialog] = React.useState(false);
  const [dialogData, setDialgoData] = React.useState({});
  const [selectedCards, setSelectedCards] = React.useState<string[]>([]);

  const store = useStore();

  useEffect(() => {
    getSelectedCards();
  }, []);

  /**
   * Retrieves the IDs of all selected cards in the draft.
   *
   * @return {void}
   */
  const getSelectedCards = () => {
    const draftObjects = Object.keys(draft);

    if (draft.header && draft.contact) {
      setSelectedCards((prevSelectedCards) => [...prevSelectedCards, draft.header.id, draft.contact.id]);
    }

    for (let i = 0; i < draftObjects.length; i++) {
      if (draftObjects[i] !== 'header' && draftObjects[i] !== 'contact') {
        setSelectedCards((prevSelectedCards) => [...prevSelectedCards, draft[draftObjects[i]].id]);
      }
    }
  };

  const handleSelectedCards = (cardId: string) => {
    if (selectedCards.includes(cardId)) {
      // remove the id from the selected cards
      setSelectedCards(selectedCards.filter((cardId) => cardId !== cardId));
    } else {
      // push the id to the selected cards
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const handlePreviewCard = (arg0: { data: any }): void => {
    setShowDialog(true);
    setDialgoData(arg0.data);
  };

  function handleHeaderChange(cardId: string) {
    setDraft((prevDraft) => {
      return {
        ...prevDraft,
        header: {
          ...prevDraft.header,
          id: cardId,
          order: 0,
        },
      };
    });
  }

  const handleContactChange = (cardId: string) => {
    setDraft((prevDraft) => {
      return {
        ...prevDraft,
        contact: {
          ...prevDraft.contact,
          id: cardId,
          order: 0,
        },
      };
    });
  };

  const handleExperienceChange = (cardId: string, section: sectionType) => {
    setDraft((prevDraft) => {
      const experiences = (prevDraft.experiences || []).map((exp) => {
        if (exp.id === cardId) {
          return {
            ...exp,
            order: 0,
          };
        }
        return exp;
      });

      if (!experiences.some((exp) => exp.id === cardId)) {
        experiences.push({
          id: cardId,
          order: experiences.length,
        });
      }

      return {
        ...prevDraft,
        experiences,
      };
    });
  };

  const handleEducationChange = (cardId: string) => {
    setDraft((prevDraft) => {
      const educations = (prevDraft.educations || []).map((obj) => {
        if (obj.id === cardId) {
          return {
            ...obj,
            order: 0,
          };
        }
        return obj;
      });

      if (!educations.some((obj) => obj.id === cardId)) {
        educations.push({
          id: cardId,
          order: educations.length,
        });
      }

      return {
        ...prevDraft,
        educations,
      };
    });
  };

  function handleSectionClick(arg0: { type: string; cardId: string }): void {
    console.log('handleSectionClick: ', arg0.cardId, ' type: ', arg0.type);

    handleSelectedCards(arg0.cardId);

    switch (arg0.type) {
      case 'header':
        handleHeaderChange(arg0.cardId);
        break;
      case 'contact':
        handleContactChange(arg0.cardId);
        break;
      case 'experience':
        handleExperienceChange(arg0.cardId);
        break;
      case 'education':
        handleEducationChange(arg0.cardId);
        break;
      //   case 'certificate':
      //     handleCertificationChange(arg0.cardId);
      //     break;
      //   case 'skill':
      //     handleSkillChange(arg0.cardId);
      //     break;
      //   case 'project':
      //     handleProjectChange(arg0.cardId);
      //     break;
      //   case 'language':
      //     handleLanguageChange(arg0.cardId);
      //     break;
      //   case 'interest':
      //     handleInterestChange(arg0.cardId);
      //     break;
      //   case 'committee':
      //     handleCommitteesChange(arg0.cardId);
      //     break;
      default:
        new Error('Invalid section type');
    }
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {/* {showDialog && 
      <DraftCardPreivew onClose={() => setShowDialog(false)} data={dialogData} />
        } */}
      {/* Render components for each section of the draft */}
      {/* <button onClick={() => console.log(selectedCards)}>Show Selected Cards Debug</button> */}
      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Header</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {store.headers.map((header) => (
              <div key={header.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftSkiltonCard
                  section={header}
                  onShow={() => handlePreviewCard({ data: header })}
                  onAdd={() => handleSectionClick({ type: 'header', cardId: header.id })}
                  isCardSelected={selectedCards.includes(header.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Contacts</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {store.contacts.map((contact, key) => (
              <div key={contact.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftSkiltonCard
                  section={contact}
                  onShow={() => handlePreviewCard({ data: contact })}
                  onAdd={() => handleSectionClick({ type: 'contact', cardId: contact.id })}
                  isCardSelected={selectedCards.includes(contact.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Experiences</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {store.experiences.map((experience) => (
              <div key={experience.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <DraftSkiltonCard
                  section={experience}
                  onShow={() => handlePreviewCard({ data: experience })}
                  onAdd={() => handleSectionClick({ type: 'experience', cardId: experience.id })}
                  isCardSelected={selectedCards.includes(experience.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Educations</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {store.educations.map((education) => (
              <div key={education.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                {/* <DraftCard
                  section={education}
                  onShow={() => handlePreviewCard({ data: education })}
                  onAdd={() => handleSectionClick({ type: 'education', data: education })}
                  isCardSelected={selectedCards.includes(education.id)}
                /> */}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Certificates</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {store.certificates.map((certificate) => (
              <div key={certificate.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                {/* <DraftCard
                  section={certificate}
                  onShow={() => handlePreviewCard({ data: certificate })}
                  onAdd={() => handleSectionClick({ type: 'certificate', data: certificate })}
                  isCardSelected={selectedCards.includes(certificate.id)}
                /> */}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {store.skills.map((skill) => (
              <div key={skill.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                {/* <DraftCard
                  section={skill}
                  onShow={() => handlePreviewCard({ data: skill })}
                  onAdd={() => handleSectionClick({ type: 'skill', data: skill })}
                  isCardSelected={selectedCards.includes(skill.id)}
                /> */}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Projects</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {store.projects.map((project) => (
              <div key={project.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                {/* <DraftCard
                  section={project}
                  onShow={() => handlePreviewCard({ data: project })}
                  onAdd={() => handleSectionClick({ type: 'project', data: project })}
                  isCardSelected={selectedCards.includes(project.id)}
                /> */}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Languages</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {store.languages.map((language) => (
              <div key={language.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                {/* <DraftCard
                  section={language}
                  onShow={() => handlePreviewCard({ data: language })}
                  onAdd={() => handleSectionClick({ type: 'language', data: language })}
                  isCardSelected={selectedCards.includes(language.id)}
                /> */}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Interests</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {store.interests.map((interest) => (
              <div key={interest.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                {/* <DraftCard
                  section={interest}
                  onShow={() => handlePreviewCard({ data: interest })}
                  onAdd={() => handleSectionClick({ type: 'interest', data: interest })}
                  isCardSelected={selectedCards.includes(interest.id)}
                /> */}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <h2 className="text-lg font-bold mb-2">Committees</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {store.committees.map((committee) => (
              <div key={committee.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                {/* <DraftCard
                  section={committee}
                  onShow={() => handlePreviewCard({ data: committee })}
                  onAdd={() => handleSectionClick({ type: 'committee', data: committee })}
                  isCardSelected={selectedCards.includes(committee.id)}
                /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draft;
