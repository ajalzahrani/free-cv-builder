import { emailDraftType, emailFormType } from '../Types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

type props = {
  onClose: () => void;
  email: string;
};

function EmailTemplate({ onClose, email }: props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-3/4 h-3/4 bg-white rounded-lg shadow-lg p-4 overflow-y-auto flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <div className="text-black text-lg font-bold">{}</div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => {}}>
            Copy Email
          </button>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-inner overflow-y-auto h-full" id="scene-container">
          <p style={{ whiteSpace: 'pre-line' }}>{email}</p>
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

export default EmailTemplate;
