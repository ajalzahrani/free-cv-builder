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

export type certificateType = {
  id: string;
  [x: string]: any;
  title: string;
  description: string;
  company: string;
  link: string;
  from: string;
  to: string;
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
  id: string;
  [x: string]: any;
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  description: string;
};

export type educationType = {
  id: string;
  institution: string;
  degree: string;
  location: string;
  from: string;
  to: string;
  description: string;
};

export type projectType = {
  id: string;
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

export type category = {
  title: string;
  component?: React.FC<any>;
};
export type section = {
  title: string;
  component?: React.FC<any>;
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
