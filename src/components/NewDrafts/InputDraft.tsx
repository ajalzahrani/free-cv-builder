import React from 'react';
import { useNavigate } from 'react-router-dom';
import { draftType, draftSkiltonType } from '~/components/Types';
import Draft from './Draft';

type InputDraftProps = {
  draft: draftType;
  onUpdateDraft: (updatedDraft: draftType) => void;
  onCancel: () => void;
  onDeleteDraft: (id: string) => void;
  onShowTemplate: (id: draftType['id']) => void;
};

export default function InputDraft({ draft, onUpdateDraft, onCancel, onDeleteDraft, onShowTemplate }: InputDraftProps) {
  const [isEditing, setIsEditing] = React.useState<boolean>(draft.title.length === 0 ? true : false);

  const [updatedDraft, setUpdatedDraft] = React.useState<draftType>(draft);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedDraft((prevDraft: any) => ({
      ...prevDraft,
      [name]: value,
    }));
  };

  const handleUpdateDraft = () => {
    onUpdateDraft(updatedDraft);
    setIsEditing(false);
  };

  const handleCancelDraft = () => {
    setIsEditing(false);
    onCancel();
  };

  const handleUpdateDraftSkilton = (updatedDraftSkilton: draftSkiltonType) => {
    setUpdatedDraft((prevDraft: any) => ({
      ...prevDraft,
      draftSkilton: updatedDraftSkilton,
    }));
  };

  return (
    <div className="builders-element">
      <div className="section-title">
        <h3 className="text-lg font-bold">{draft.title}</h3>
        <div>
          {!isEditing && (
            <div>
              <button
                className="text-blue-500 hover:text-blue-700 mr-2 py-1 px-3 rounded bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                onClick={() => onShowTemplate(updatedDraft.id)}
              >
                Show
              </button>

              <button
                className="text-blue-500 hover:text-blue-700 py-1 px-3 rounded bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="builders-input">
          <label className="block font-bold mt-2 mb-2" htmlFor="institution">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedDraft.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="to">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={updatedDraft.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
              onClick={() => {
                handleUpdateDraft();
                console.log(updatedDraft);
              }}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => onDeleteDraft(draft.id)}
            >
              Delete
            </button>
            <button className="text-gray-500 hover:text-gray-700 py-2 px-4" onClick={handleCancelDraft}>
              Cancel
            </button>
            <button
              className="text-blue-500 hover:text-blue-700 mr-2 py-1 px-3 rounded bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
              onClick={() => onShowTemplate(updatedDraft.id)}
            >
              Show Draft Preview
            </button>
          </div>

          {/* DraftSkilton Cards */}
          <div style={{ marginTop: '20px' }}>
            {<Draft draftSkilton={draft.draftSkilton} setDraftSkilton={handleUpdateDraftSkilton} />}
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
              onClick={() => {
                handleUpdateDraft();
              }}
            >
              Save
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
              onClick={() => {
                // print draft
                // setDialgoData(draft);
                // setShowDialog(true);
                console.log(draft);
              }}
            >
              Print
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => onDeleteDraft(draft.id)}
            >
              Delete
            </button>
            <button className="text-gray-500 hover:text-gray-700 py-2 px-4" onClick={handleCancelDraft}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          {/* <p className="text-red-700">ENTERY ID: {draft.id}</p> */}
          {/* <p className="text-gray-700">{draft.title}</p> */}
          <p className="text-gray-700">{draft.description}</p>
        </div>
      )}
    </div>
  );
}
