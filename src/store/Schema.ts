const schema = {
  name: '',
  title: '',
  pitch: '',
  contact: {
    name: '',
    email: '',
    phone: '',
    address: '',
    github: '',
    linkedin: '',
    website: '',
    facebook: '',
  },
  experience: [
    {
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
      description: '',
      tasks: [''],
    },
  ],
  education: [
    {
      institution: '',
      degree: '',
      location: '',
      from: '',
      to: '',
      description: '',
    },
  ],
  certifications: [
    {
      title: '',
      description: '',
      company: '',
      link: '',
      from: '',
      to: '',
    },
  ],
  skills: [{ title: '' }],
  projects: [
    {
      title: '',
      from: '',
      to: '',
      description: '',
      link: '',
    },
  ],
  languages: [
    {
      title: '',
      description: '',
    },
  ],
  interests: [{ title: '', description: '' }],
};

export default schema;
