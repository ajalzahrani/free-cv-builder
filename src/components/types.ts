export type sectionType =
  | headerType
  | contactType
  | experienceType
  | educationType
  | certificateType
  | skillType
  | projectType
  | languageType
  | interestType;
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

export type experienceType = {
  id: string;
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
  };
};

// Email template
export type emailFormType = {
  id: string;
  title: string;
  description: string;
  to: string;
  name: string;
  company: string;
  subject: string;
  message: string;
  isSent: boolean;
};

export type emailDraftType = {
  id: string;
  title: string;
  message: string;
};
