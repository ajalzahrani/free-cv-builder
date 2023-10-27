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

const schema = {
  name: '',
  title: '',
  pitch: '',
  contact: {},
  experience: [],
  education: [],
  certifications: [],
  skills: [],
  projects: [],
  languages: [],
  interests: [],
};

export default schema;
