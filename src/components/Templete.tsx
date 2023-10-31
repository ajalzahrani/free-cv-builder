import Experience from './Sections/Experience';
import Header from './Sections/Header';
import Contacts from './Sections/Contacts';
import Projects from './Sections/Projects';
import Skills from './Sections/Skills';
import Certificates from './Sections/Certificates';
import Education from './Sections/Education';
import Languages from './Sections/Languages';
import Intersets from './Sections/Intersets';
import { draftType, headerType } from './types';
import schema from '~/store/Schema';
import { useLocation } from 'react-router-dom';

type props = {
  onClose: () => void;
  draft: draftType;
};

function Template({ onClose, draft }: props) {
  const schema = draft.schema;

  console.log(schema);

  // const location = useLocation();
  // const updatedDraft = location.state.updatedDraft;

  // console.log(updatedDraft.schema);

  // let drafts = localStorage.getItem('drafts');
  // const draftObj = drafts ? JSON.parse(drafts) : [];
  // const draft = draftObj[0];

  // Open a new browser tab when the user clicks a link
  // Pass the draft object as a query parameter in the URL
  const handleLinkClick = () => {
    const draftString = JSON.stringify(schema);
    window.open(`scene`, '_blank');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-3/4 h-3/4 bg-white rounded-lg shadow-lg p-4 overflow-y-auto flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <div className="text-black text-lg font-bold">{draft.title}</div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              handleLinkClick();
            }}
          >
            Print Draft
          </button>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-inner overflow-y-auto h-full">
          {' '}
          <Header header={schema.headers[0]} />
          <Contacts contact={schema.contacts} />
          <Experience experience={schema.experiences} />
          <Education education={schema.educations} />
          <Certificates certificates={schema.certificates} />
          <Skills skills={schema.skills} />
          <Projects projects={schema.projects} />
          <Languages language={schema.languages} />
          <Intersets interest={schema.interests} />
        </div>

        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => onClose()}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Template;
