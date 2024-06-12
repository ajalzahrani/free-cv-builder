import React, { useEffect, useState } from 'react';
import useDraftsStore from '../../store/useDraftStore';
import { draftType } from '../Types';
import UUID from '../Shared/UUID';
import InputDraft from './InputDraft';
import { produce } from 'immer';
// import Template from './Templete';

const DraftBuilder = () => {
  const { drafts, updateDraftTitle, updateDraftDescription, addDraft } = useDraftsStore();
  const [newDraftName, setNewDraftName] = useState<string>('');
  const [isAddingDraft, setIsAddingDraft] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogData, setDialgoData] = useState<draftType>({} as draftType);

  // const handleUpdateDraftTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = event.target;
  //   setNewDraftName((prev: any) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleUpdateDraftTitle = (e: any) => {
    const value = e.target.value;
    setNewDraftName(value);
  };

  const handleAddNewDraft = () => {
    console.log('newDraftName: ', newDraftName);
    if (newDraftName === '') {
      return;
    }
    const newDraft = {
      id: UUID(),
      title: newDraftName,
      description: '',
      draftSections: {},
    };
    addDraft(newDraft);
    setNewDraftName('');
    setIsAddingDraft(false);
  };

  // const handleSaveDraft = (draft: draftType) => {
  //   setIsAddingDraft(false);
  // };

  const handleDeleteDraft = (draftId: string) => {
    console.log('draft draft id: ', draftId);
  };

  const handleShowTemplate = (id: string): void => {
    console.log('draft id: ', id);
    setShowDialog(true);
    const draft = drafts.find((draft) => draft.id === id);
    setDialgoData(draft ? draft : ({} as draftType));
  };

  return (
    <div className="">
      {/* {showDialog && <Template onClose={() => setShowDialog(false)} draft={dialogData} />} */}
      <div className="draft-container">
        <div className="section-title">
          <h2 className="text-2xl font-bold mb-4">{'Drafts'}</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            {isAddingDraft ? (
              <div>
                <input placeholder="Draft Title" type="text" onChange={handleUpdateDraftTitle} value={newDraftName} />
                <button onClick={() => setIsAddingDraft(false)}>Cancel</button>
                <button onClick={handleAddNewDraft}>Add</button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAddingDraft(true);
                }}
              >
                Add New Draft'
              </button>
            )}
          </div>
        </div>
        {/* <div>{renderInputDraft()}</div> */}
        <div>
          {drafts.map((draft, index) => (
            <InputDraft
              key={index}
              draft={draft}
              onDeleteDraft={(draftId: string) => handleDeleteDraft(draftId)}
              onShowTemplate={(draftId: any) => handleShowTemplate(draftId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DraftBuilder;
