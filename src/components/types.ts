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

export type headerType = {
  id: string;
  name: string;
  title: string;
  pitch: string;
};

export type contactType = {
  id: string;
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

export type experienceType = {
  id: string;
  [x: string]: any;
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  description: string;
  tasks: string[];
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

export type skillType = {
  id: string;
  title: string;
};

export type interestType = {
  id: string;
  title: string;
  description: string;
};

export type languageType = {
  id: string;
  title: string;
  description: string;
};

export type category = {
  title: string;
  component?: React.FC<any>;
};
export type section = {
  title: string;
  component?: React.FC<any>;
};
