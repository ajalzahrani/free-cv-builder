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
import { useLocation } from 'react-router-dom';

function Template() {
  const location = useLocation();
  const updatedDraft = location.state.updatedDraft;

  console.log(updatedDraft.schema);

  // let drafts = localStorage.getItem('drafts');
  // const draftObj = drafts ? JSON.parse(drafts) : [];
  // const draft = draftObj[0];

  // Open a new browser tab when the user clicks a link
  // Pass the draft object as a query parameter in the URL
  const handleLinkClick = () => {
    const draftString = JSON.stringify(updatedDraft);
    window.open(`scene`, '_blank');
  };

  return (
    <div className="bg-white fu-light container">
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4 mb-2"
        onClick={() => {
          handleLinkClick();
        }}
      >
        Print Draft
      </button>
      <Header header={updatedDraft.schema?.headers[0]} />
      <Contacts contact={updatedDraft.schema.contacts} />
      <Experience experience={updatedDraft.schema.experiences} />
      <Education education={updatedDraft.schema.educations} />
      <Certificates certificates={updatedDraft.schema.certificates} />
      <Skills skills={updatedDraft.schema.skills} />
      <Projects projects={updatedDraft.schema.projects} />
      <Languages language={updatedDraft.schema.languages} />
      <Intersets interest={updatedDraft.schema.interests} />
    </div>
  );
}

export default Template;
