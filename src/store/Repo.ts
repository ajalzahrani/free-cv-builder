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
} from '../components/Types';

type StoreState = {
  header: headerType;
  contact: contactType;
  experience: experienceType[];
  education: educationType[];
  certificates: certificateType[];
  skills: skillType[];
  projects: projectType[];
  languages: languageType[];
  interests: interestType[];
};

type StoreActions = {
  updateHeader: (header: headerType) => void;
  updateContact: (contact: contactType) => void;
  updateExperience: (experience: experienceType[]) => void;
  updateEducation: (education: educationType[]) => void;
  updateCertificates: (certificates: certificateType[]) => void;
  updateSkills: (skills: skillType[]) => void;
  updateProjects: (projects: projectType[]) => void;
  updateLanguages: (languages: languageType[]) => void;
  updateInterests: (interests: interestType[]) => void;
};

const useStore = create<StoreState & StoreActions>((set, get) => ({
  header: { id: '', name: '', title: '', pitch: '' },
  contact: { id: '', name: '', email: '', phone: '', website: '' },
  experience: [],
  education: [],
  certificates: [],
  skills: [],
  projects: [],
  languages: [],
  interests: [],
  updateHeader: (header: headerType) => set({ header }),
  updateContact: (contact: contactType) => set({ contact }),
  updateExperience: (experience: experienceType[]) => set({ experience }),
  updateEducation: (education: educationType[]) => set({ education }),
  updateCertificates: (certificates: certificateType[]) => set({ certificates }),
  updateSkills: (skills: skillType[]) => set({ skills }),
  updateProjects: (projects: projectType[]) => set({ projects }),
  updateLanguages: (languages: languageType[]) => set({ languages }),
  updateInterests: (interests: interestType[]) => set({ interests }),
}));

export default useStore;
