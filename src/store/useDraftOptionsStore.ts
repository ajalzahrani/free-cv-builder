import { create } from 'zustand';

interface optionType {
  label: string;
  value: number;
  // other properties
}

interface argType {
  id: number;
  title: string;
}

interface optionsType {
  header: optionType[];
  contact: optionType[];
  experience: optionType[];
  education: optionType[];
  certificate: optionType[];
  skill: optionType[];
  project: optionType[];
  language: optionType[];
  interest: optionType[];
  committee: optionType[];
  setHeader: (option: argType) => void;
  setContact: (option: argType) => void;
  setExperience: (option: argType) => void;
  setEducation: (option: argType) => void;
  setCertificate: (option: argType) => void;
  setSkill: (option: argType) => void;
  setProject: (option: argType) => void;
  setLanguage: (option: argType) => void;
  setInterest: (option: argType) => void;
  setCommittee: (option: argType) => void;
}

const createOption = ({ id, title }: argType): optionType => ({
  label: title,
  value: id,
});

const useDraftOptionsStore = create<optionsType>((set) => ({
  header: [],
  contact: [],
  experience: [],
  education: [],
  certificate: [],
  skill: [],
  project: [],
  language: [],
  interest: [],
  committee: [],
  setHeader: (option: argType) => set((state) => ({ header: [...state.header, createOption(option)] })),
  setContact: (option: argType) => set((state) => ({ contact: [...state.contact, createOption(option)] })),
  setExperience: (option: argType) => set((state) => ({ experience: [...state.experience, createOption(option)] })),
  setEducation: (option: argType) => set((state) => ({ education: [...state.education, createOption(option)] })),
  setCertificate: (option: argType) => set((state) => ({ certificate: [...state.certificate, createOption(option)] })),
  setSkill: (option: argType) => set((state) => ({ skill: [...state.skill, createOption(option)] })),
  setProject: (option: argType) => set((state) => ({ project: [...state.project, createOption(option)] })),
  setLanguage: (option: argType) => set((state) => ({ language: [...state.language, createOption(option)] })),
  setInterest: (option: argType) => set((state) => ({ interest: [...state.interest, createOption(option)] })),
  setCommittee: (option: argType) => set((state) => ({ committee: [...state.committee, createOption(option)] })),
}));

export default useDraftOptionsStore;
