import Experience from '../Templates/GrayOne/Experience';
import Header from '../Templates/GrayOne/Header';
import Contacts from '../Templates/GrayOne/Contacts';
import Projects from '../Templates/GrayOne/Projects';
import Skills from '../Templates/GrayOne/Skills';
import Certificates from '../Templates/GrayOne/Certificates';
import Education from '../Templates/GrayOne/Education';
import Languages from '../Templates/GrayOne/Languages';
import Intersets from '../Templates/GrayOne/Intersets';
import Committees from '../Templates/GrayOne/Committee';
import { draftType, headerType } from '../Types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

type props = {
  onClose: () => void;
  draft: draftType;
};

function Template({ onClose, draft }: props) {
  const schema = draft.schema;

  // Open a new browser tab when the user clicks a link
  // Pass the draft object as a query parameter in the URL
  const handleLinkClick = () => {
    const draftString = JSON.stringify(schema);
    window.open(`scene?draft_id=${draft.id}`, '_blank');
  };

  const printDocument = () => {
    console.log('print');
    const input = document.getElementById('scene-container');
    console.log('Input element:', input);
    if (input) {
      // Hide scrollbars
      document.body.style.overflow = 'hidden';
      // Save the original body overflow property to restore it later
      const originalOverflow = document.body.style.overflow;

      // Calculate the scale required to fit the element within the viewport
      const scale = Math.min(window.innerWidth / input.offsetWidth, window.innerHeight / input.offsetHeight);

      // Save the original body transform property to restore it later
      const originalTransform = document.body.style.transform;
      // Scale the body
      document.body.style.transform = `scale(${scale})`;

      html2canvas(input, { scale: 1 }) // Use a scale of 1 since we've already scaled the body
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'pt', [(canvas.width * 72) / 96, (canvas.height * 72) / 96]);
          pdf.addImage(imgData, 'PNG', 0, 0, (canvas.width * 72) / 96, (canvas.height * 72) / 96);
          pdf.save('download.pdf');
          console.log('PDF saved');

          // Restore the original body transform and overflow properties
          document.body.style.transform = originalTransform;
          document.body.style.overflow = originalOverflow;
        })
        .catch((err) => {
          console.log('Error:', err);
          // Restore the original body transform and overflow properties in case of an error
          document.body.style.transform = originalTransform;
          document.body.style.overflow = originalOverflow;
        });
    }
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
              // printDocument();
            }}
          >
            Print Draft
          </button>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-inner overflow-y-auto h-full" id="scene-container">
          {' '}
          <Header header={schema.headers[0]} />
          <Contacts contact={schema.contacts} />
          <Experience experience={schema.experiences} />
          <Education education={schema.educations} />
          <Certificates certificates={schema.certificates} />
          <Skills skills={schema.skills} />
          {/* <Projects projects={schema.projects} /> */}
          {/* <Intersets interest={schema.interests} /> */}
          <Committees committes={schema.committees} />
          <Languages language={schema.languages} />
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
