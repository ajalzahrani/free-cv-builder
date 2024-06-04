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
  id: string;
};

export type headerType = {
  id: string;
  name: string;
  title: string;
  pitch: string;
};

export type contactType = {
  id: string;
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
  id: string;
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  description: string;
  experinceTasks: experinceTasksType[];
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

export type certificateType = {
  id: string;
  title: string;
  description: string;
  company: string;
  link: string;
  from: string;
  to: string;
};

export type skillType = {
  id: string;
  title: string;
};

export type projectType = {
  id: string;
  title: string;
  from: string;
  to: string;
  description: string;
  link: string;
};

export type committeeType = {
  id: string;
  title: string;
  role: string;
  date: string;
  responsibility: string;
};

export type languageType = {
  id: string;
  title: string;
  description: string;
};

export type interestType = {
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

export type draftType = {
  id: string;
  title: string;
  description: string;
  schema: {
    selectedCards: string[];
    headers: headerType[];
    contacts: contactType[];
    experiences: experienceType[];
    educations: educationType[];
    certificates: certificateType[];
    skills: skillType[];
    projects: projectType[];
    languages: languageType[];
    interests: interestType[];
    committees: committeeType[];
  };
};

// Email template
export type emailFormType = {
  id: string;
  title: string;
  description: string;
  name: string;
  company: string;
  message: string;
  position: string;
};

export type emailDraftType = {
  id: string;
  title: string;
  message: string;
};
