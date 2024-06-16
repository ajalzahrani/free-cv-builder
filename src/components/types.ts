export type sectionType =
  | headerType
  | contactType
  | experienceType
  | educationType
  | certificateType
  | skillType
  | projectType
  | languageType
  | interestType
  | committeeType;
// | selectedCardType;

type selectedCardType = {
  id: number;
};

export type headerType = {
  id: number;
  name: string;
  title: string;
  pitch: string;
};

export type contactType = {
  id: number;
  title: string;
  email: string;
  phone: string;
  website: string;
  address?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
};

export type experinceTasksType = {
  description: string;
};

export type experienceType = {
  id: number;
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  description: string;
  experinceTasks: experinceTasksType[];
};

export type educationType = {
  id: number;
  title?: string;
  institution: string;
  degree: string;
  location: string;
  from: string;
  to: string;
  description: string;
};

export type certificateType = {
  id: number;
  title: string;
  description: string;
  company: string;
  link: string;
  from: string;
  to: string;
};

export type skillType = {
  id: number;
  title: string;
};

export type projectType = {
  id: number;
  title: string;
  from: string;
  to: string;
  description: string;
  link: string;
};

export type committeeType = {
  id: number;
  title: string;
  role: string;
  date: string;
  responsibility: string;
};

export type languageType = {
  id: number;
  title: string;
  description: string;
};

export type interestType = {
  id: number;
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

export type draftSectionsType = {
  [key: string]: any; // Index Signature
  header?: string;
  contact?: string;
  experience?: string[];
  education?: string[];
  certificate?: string[];
  skill?: string[];
  project?: string[];
  language?: string[];
  interest?: string[];
  committee?: string[];
};

export type draftType = {
  id: number;
  title: string;
  description: string;
  draftSections: draftSectionsType;
};

export type userType = {
  id: number;
  mobile: string;
};

export type authType = {
  user: userType;
  accessToken: string;
  refreshToken: string;
  roles: number[];
};

// Email template
export type emailFormType = {
  id: number;
  title: string;
  description: string;
  name: string;
  company: string;
  message: string;
  position: string;
};

export type emailDraftType = {
  id: number;
  title: string;
  message: string;
};
