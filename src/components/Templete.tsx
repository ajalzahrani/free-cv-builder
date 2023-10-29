import Experience from './Sections/Experience';
import Header from './Sections/Header';
import Contacts from './Sections/Contacts';
import Projects from './Sections/Projects';
import Skills from './Sections/Skills';
import Certificates from './Sections/Certificates';
import Education from './Sections/Education';
import Languages from './Sections/Languages';
import Intersets from './Sections/Intersets';
import schema from '~/store/Schema';

function Builder() {
  let storedState = localStorage.getItem('draft');

  const initialState = storedState ? JSON.parse(storedState) : schema;

  return (
    <div className="bg-white fu-light container">
      <Header header={initialState.headers} />
      <Contacts contact={initialState.contacts} />
      <Experience experience={initialState.experiences} />
      <Education education={initialState.educations} />
      <Certificates certificates={initialState.certificates} />
      <Skills skills={initialState.skills} />
      <Projects projects={initialState.projects} />
      <Languages language={initialState.languages} />
      <Intersets interest={initialState.interests} />
    </div>
  );
}

export default Builder;
