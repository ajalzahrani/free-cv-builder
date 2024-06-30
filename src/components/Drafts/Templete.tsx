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
import '../../styles/Modal.css';

type props = {
  onClose: () => void;
  draft: draftType;
};

function Template({ onClose, draft }: props) {
  // Open a new browser tab when the user clicks a link
  // Pass the draft object as a query parameter in the URL
  const handleLinkClick = () => {
    // const draftString = JSON.stringify(schema);
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
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title">{draft.title}</div>
          <button className="print-button" onClick={() => handleLinkClick()}>
            Print Draft
          </button>
        </div>
        {/* Uncomment and customize the below section if needed */}
        {/* <div className="modal-content" id="scene-container">
          <Header header={draft.draftSections.header} />
          <Contacts contact={draft.contact} />
          <Experience experience={draft.experience} />
          <Education education={draft.education} />
          <Certificates certificates={draft.certificate} />
          <Skills skills={draft.skill} />
          <Projects projects={draft.project} />
          <Intersets interest={draft.interest} />
          <Committees committes={draft.committee} />
          <Languages language={draft.language} />
        </div> */}
        <div className="modal-footer">
          <button className="close-button" onClick={() => onClose()}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Template;
