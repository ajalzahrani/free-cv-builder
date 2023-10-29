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
    headers: {
      id: string;
      name: string;
      title: string;
      email: string;
      phone: string;
      address: string;
    }[];
    contacts: {
      id: string;
      name: string;
      value: string;
    }[];
    experiences: {
      id: string;
      title: string;
      company: string;
      location: string;
      from: string;
      to: string;
      current: boolean;
      description: string;
    }[];
    educations: {
      id: string;
      school: string;
      degree: string;
      field: string;
      from: string;
      to: string;
      current: boolean;
      description: string;
    }[];
    certificates: {
      id: string;
      title: string;
      issuer: string;
      date: string;
      description: string;
    }[];
    skills: {
      id: string;
      name: string;
      level: string;
    }[];
    projects: {
      id: string;
      name: string;
      description: string;
      link: string;
    }[];
    languages: {
      id: string;
      name: string;
      level: string;
    }[];
    interests: {
      id: string;
      name: string;
    }[];
  };
};
