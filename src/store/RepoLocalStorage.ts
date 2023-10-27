import create from 'zustand';
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
} from '../components/types';

type StoreState = {
  headers: headerType[];
  contacts: contactType[];
  experiences: experienceType[];
  educations: educationType[];
  certificates: certificateType[];
  skills: skillType[];
  projects: projectType[];
  languages: languageType[];
  interests: interestType[];
};

type StoreActions = {
  updateHeaders: (headers: headerType[]) => void;
  updateContacts: (contacts: contactType[]) => void;
  updateExperiences: (experiences: experienceType[]) => void;
  updateEducations: (educations: educationType[]) => void;
  updateCertificates: (certificates: certificateType[]) => void;
  updateSkills: (skills: skillType[]) => void;
  updateProjects: (projects: projectType[]) => void;
  updateLanguages: (languages: languageType[]) => void;
  updateInterests: (interests: interestType[]) => void;
};

const useStore = create<StoreState & StoreActions>((set, get) => {
  const storedState = localStorage.getItem('resumeData');
  const initialState = storedState
    ? JSON.parse(storedState)
    : {
        headers: [],
        contacts: [],
        experiences: [],
        educations: [],
        certificates: [],
        skills: [],
        projects: [],
        languages: [],
        interests: [],
      };

  return {
    ...initialState,
    updateHeaders: (headers: headerType[]) => {
      set({ headers });
      localStorage.setItem('resumeData', JSON.stringify(get()));
    },
    updateContacts: (contacts: contactType[]) => {
      set({ contacts });
      localStorage.setItem('resumeData', JSON.stringify(get()));
    },
    updateExperiences: (experiences: experienceType[]) => {
      set({ experiences });
      localStorage.setItem('resumeData', JSON.stringify(get()));
    },
    updateEducations: (educations: educationType[]) => {
      set({ educations });
      localStorage.setItem('resumeData', JSON.stringify(get()));
    },
    updateCertificates: (certificates: certificateType[]) => {
      set({ certificates });
      localStorage.setItem('resumeData', JSON.stringify(get()));
    },
    updateSkills: (skills: skillType[]) => {
      set({ skills });
      localStorage.setItem('resumeData', JSON.stringify(get()));
    },
    updateProjects: (projects: projectType[]) => {
      set({ projects });
      localStorage.setItem('resumeData', JSON.stringify(get()));
    },
    updateLanguages: (languages: languageType[]) => {
      set({ languages });
      localStorage.setItem('resumeData', JSON.stringify(get()));
    },
    updateInterests: (interests: interestType[]) => {
      set({ interests });
      localStorage.setItem('resumeData', JSON.stringify(get()));
    },
  };
});

export default useStore;
