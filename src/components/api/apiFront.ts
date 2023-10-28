import axios from 'axios';
import { useEffect, useState } from 'react';
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

const useStore = () => {
  const [state, setState] = useState<StoreState>({
    header: { id: '', name: '', title: '', pitch: '' },
    contact: { id: '', name: '', email: '', phone: '', website: '' },
    experience: [],
    education: [],
    certificates: [],
    skills: [],
    projects: [],
    languages: [],
    interests: [],
  });

  useEffect(() => {
    axios.get('/api/resume').then((response) => {
      setState(response.data);
    });
  }, []);

  const updateHeader = (header: headerType) => {
    setState((prevState) => ({ ...prevState, header }));
    axios.put('/api/resume/header', header);
  };

  const updateContact = (contact: contactType) => {
    setState((prevState) => ({ ...prevState, contact }));
    axios.put('/api/resume/contact', contact);
  };

  const updateExperience = (experience: experienceType[]) => {
    setState((prevState) => ({ ...prevState, experience }));
    axios.put('/api/resume/experience', experience);
  };

  const updateEducation = (education: educationType[]) => {
    setState((prevState) => ({ ...prevState, education }));
    axios.put('/api/resume/education', education);
  };

  const updateCertificates = (certificates: certificateType[]) => {
    setState((prevState) => ({ ...prevState, certificates }));
    axios.put('/api/resume/certificates', certificates);
  };

  const updateSkills = (skills: skillType[]) => {
    setState((prevState) => ({ ...prevState, skills }));
    axios.put('/api/resume/skills', skills);
  };

  const updateProjects = (projects: projectType[]) => {
    setState((prevState) => ({ ...prevState, projects }));
    axios.put('/api/resume/projects', projects);
  };

  const updateLanguages = (languages: languageType[]) => {
    setState((prevState) => ({ ...prevState, languages }));
    axios.put('/api/resume/languages', languages);
  };

  const updateInterests = (interests: interestType[]) => {
    setState((prevState) => ({ ...prevState, interests }));
    axios.put('/api/resume/interests', interests);
  };

  return {
    state,
    updateHeader,
    updateContact,
    updateExperience,
    updateEducation,
    updateCertificates,
    updateSkills,
    updateProjects,
    updateLanguages,
    updateInterests,
  };
};

export default useStore;
