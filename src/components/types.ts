export type sectionType =
  | 'header'
  | 'contact'
  | 'experience'
  | 'education'
  | 'projects'
  | 'skills'
  | 'contact'
  | 'footer'
  | 'interests';

type headerType = {
  name: string;
  title: string;
  pitch: string;
};

type contactType = {
  contact: {
    name: string;
    email: string;
    phone: string;
    website: string;
    address: string;
    social: {
      name: string;
      url: string;
    }[];
  };
};

export type experienceType = {
  [x: string]: any;
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  description: string;
};

type educationType = {
  school: string;
  degree: string;
  location: string;
  from: string;
  to: string;
  description: string;
};

type projectsType = {
  title: string;
  description: string;
  link: string;
};

type skillsType = {
  title: string;
  description: string;
};

type interestsType = {
  title: string;
  description: string;
};

type footerType = {
  text: string;
};

export type sectionDataType =
  | headerType
  | contactType
  | experienceType[]
  | educationType[]
  | projectsType[]
  | skillsType[]
  | interestsType[]
  | footerType;
