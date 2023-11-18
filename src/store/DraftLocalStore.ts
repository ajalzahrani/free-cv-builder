import create, { SetState } from 'zustand';

type StoreState = {
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

type StoreActions = {
  setSchema: (schema: StoreState['schema']) => void;
};

const useDraftStore = create<StoreState & StoreActions>((set) => {
  const storedSchema = localStorage.getItem('draft');
  const initialSchema = storedSchema
    ? JSON.parse(storedSchema)
    : {
        headers: [],
        contacts: [],
        experiences: [],
        educations: [],
        certificates: [],
        skills: [],
        projects: [],
        languages: [],
        interests: [],
        selectedCards: [],
      };

  return {
    schema: initialSchema,
    setSchema: (schema) => {
      set({ schema });
      localStorage.setItem('draft', JSON.stringify(schema));
    },
  };
});

export default useDraftStore;
