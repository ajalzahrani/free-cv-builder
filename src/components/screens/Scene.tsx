import Experience from '../Sections/Experience';
import Header from '../Sections/Header';
import Contacts from '../Sections/Contacts';
import Projects from '../Sections/Projects';
import Skills from '../Sections/Skills';
import Certificates from '../Sections/Certificates';
import Education from '../Sections/Education';
import Languages from '../Sections/Languages';
import Intersets from '../Sections/Intersets';
import Committees from '../Sections/Committee';
import schema from '~/store/Schema';
import React, { useRef } from 'react';
import '../../styles/Scene.css';
import { draftType } from '../types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function Scene() {
  const params = new URLSearchParams(window.location.search);
  const draftId = params.get('draft_id');

  let storedDrafts = localStorage.getItem('drafts');
  const drafts = storedDrafts ? JSON.parse(storedDrafts) : ([] as draftType[]);

  const { schema } = drafts.find((draft: any) => draft.id === draftId);

  if (!schema) {
    return <div>Invalid draft ID</div>;
  }

  const printDocument = () => {
    console.log('print');
    const input = document.getElementById('scene-container');
    console.log('Input element:', input);
    if (input) {
      html2canvas(input, { scale: 2 })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'pt', [(canvas.width * 72) / 96, (canvas.height * 72) / 96]);
          pdf.addImage(imgData, 'PNG', 0, 0, (canvas.width * 72) / 96, (canvas.height * 72) / 96);
          pdf.save('download.pdf');
          console.log('PDF saved');
        })
        .catch((err) => {
          console.log('Error:', err);
        });
    }
  };

  return (
    <>
      {/* <button onClick={printDocument}>Print</button> */}
      <div id="scene-container" className="scene-container">
        <Header header={schema.headers[0]} />
        <Contacts contact={schema.contacts} />
        <Experience experience={schema.experiences} />
        <Education education={schema.educations} />
        <Certificates certificates={schema.certificates} />
        <Skills skills={schema.skills} />
        <Committees committes={schema.committees} />
        {/* <Projects projects={schema.projects} /> */}
        <Languages language={schema.languages} />
        {/* <Intersets interest={schema.interests} /> */}
      </div>
    </>
  );
}
