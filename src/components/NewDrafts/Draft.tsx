import '../../styles/ffe.css';
import { useMemo } from 'react';
import useStore from '../../store/RepoLocalStorage';
import SelectorMulti from './SelectorMulti';
import { draftType, draftSectionsType } from '../Types';
import SelectorSingle from './SelectorSingle';

type props = {
  draftId: string;
  draftSections: draftSectionsType;
};

const Draft = ({ draftId, draftSections }: props) => {
  const store = useStore();

  // get all elements in headers and map them in an array of objects { accountName , name}

  const headerAccount = useMemo(
    () =>
      store.headers.map((header) => ({
        accountNumber: header.id,
        name: header.title,
      })),
    [store.headers],
  );
  const contactAccount = useMemo(
    () =>
      store.contacts.map((contact) => ({
        accountNumber: contact.id,
        name: contact.title,
      })),
    [store.contacts],
  );
  const experienceAccount = useMemo(
    () =>
      store.experiences.map((experience) => ({
        accountNumber: experience.id,
        name: experience.title,
      })),
    [store.experiences],
  );
  const educationAccount = useMemo(
    () =>
      store.educations.map((education) => ({
        accountNumber: education.id,
        name: education.degree,
      })),
    [store.educations],
  );
  const certificateAccount = useMemo(
    () =>
      store.certificates.map((certificate) => ({
        accountNumber: certificate.id,
        name: certificate.title,
      })),
    [store.certificates],
  );
  const projectAccount = useMemo(
    () =>
      store.projects.map((project) => ({
        accountNumber: project.id,
        name: project.title,
      })),
    [store.projects],
  );
  const skillAccount = useMemo(
    () =>
      store.skills.map((skill) => ({
        accountNumber: skill.id,
        name: skill.title,
      })),
    [store.skills],
  );
  const languageAccount = useMemo(
    () =>
      store.languages.map((language) => ({
        accountNumber: language.id,
        name: language.title,
      })),
    [store.languages],
  );
  const interestAccount = useMemo(
    () =>
      store.interests.map((interest) => ({
        accountNumber: interest.id,
        name: interest.title,
      })),
    [store.interests],
  );
  const committeeAccount = useMemo(
    () =>
      store.committees.map((committee) => ({
        accountNumber: committee.id,
        name: committee.title,
      })),
    [store.committees],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <SelectorSingle
        draftId={draftId}
        preSelectedSectionElement={draftSections.header!}
        heading="Headers"
        sectionElements={headerAccount}
      />
      <SelectorSingle
        draftId={draftId}
        preSelectedSectionElement={draftSections.contact!}
        heading="Contacts"
        sectionElements={contactAccount}
      />
      <SelectorMulti
        draftId={draftId}
        preSelectedSectionElements={draftSections.experience || []}
        heading="Experiences"
        sectionElements={experienceAccount}
      />
      <SelectorMulti
        draftId={draftId}
        preSelectedSectionElements={draftSections.certificate || []}
        heading="Certificates"
        sectionElements={certificateAccount}
      />
      <SelectorMulti
        draftId={draftId}
        preSelectedSectionElements={draftSections.skill || []}
        heading="Skills"
        sectionElements={skillAccount}
      />
      <SelectorMulti
        draftId={draftId}
        preSelectedSectionElements={draftSections.project || []}
        heading="Projects"
        sectionElements={projectAccount}
      />
      <SelectorMulti
        draftId={draftId}
        preSelectedSectionElements={draftSections.committee || []}
        heading="Committees"
        sectionElements={committeeAccount}
      />
      <SelectorMulti
        draftId={draftId}
        preSelectedSectionElements={draftSections.interest || []}
        heading="Interests"
        sectionElements={interestAccount}
      />
      <SelectorMulti
        draftId={draftId}
        preSelectedSectionElements={draftSections.language || []}
        heading="Languages"
        sectionElements={languageAccount}
      />
    </div>
  );
};

export default Draft;
