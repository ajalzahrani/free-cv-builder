import React, { useCallback } from 'react';
import useDraftStore from '../../store/draftStore';
import { produce } from 'immer';
import { draftType } from '../types';
import UUID from '../shared/UUID';
import InputDraft from './InputDraft';
import schemaInit from '~/store/Schema';
import Template from '../Templete';

const DraftBuilder = () => {
  const { drafts, updateDrafts } = useDraftStore();
  const [isAddingDraft, setIsAddingDraft] = React.useState<boolean>(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const [dialogData, setDialgoData] = React.useState<draftType>({} as draftType);

  const handleAddDraft = () => {
    setIsAddingDraft(true);
  };

  const updateDraft = (draft: draftType) => {
    const index = drafts.findIndex((edu) => edu.id === draft.id);
    if (index !== -1) {
      // Update existing draft
      const newData = produce(drafts, (drfts) => {
        drfts[index] = draft;
      });
      updateDrafts(newData);
    } else {
      // Add new draft
      const newData = produce(drafts, (drfts) => {
        drfts.push(draft);
      });
      updateDrafts(newData);
    }
  };

  const handleSaveDraft = (draft: draftType) => {
    updateDraft(draft);
    setIsAddingDraft(false);
  };
  
  const handleCancelDraft = () => {
    setIsAddingDraft(false);
  };

  const handleDeleteDraft = (id: string) => {
    const newData = produce(drafts, (drft) => {
      const index = drft.findIndex((drf) => drf.id === id);
      if (index !== -1) drft.splice(index, 1);
      else handleCancelDraft();
    });
    updateDrafts(newData);
  };

  const handleShowTemplate = (id: string): void => {
    console.log('draft id: ', id);
    setShowDialog(true);
    const draft = drafts.find((draft) => draft.id === id);
    setDialgoData(draft ? draft : ({} as draftType));
  };

  const renderDraft = () => {
    const rows = [];
    for (let i = 0; i < drafts.length; i++) {
      rows.push(
        <InputDraft
          key={i}
          draft={drafts[i]}
          onUpdateDraft={(updatedDraft: draftType) => updateDraft(updatedDraft)}
          onCancel={handleCancelDraft}
          onDeleteDraft={(id: string) => handleDeleteDraft(id)}
          onShowTemplate={(id: any) => handleShowTemplate(id)}
        />,
      );
    }
    if (isAddingDraft) {
      rows.push(
        <InputDraft
          key="new"
          draft={{ id: UUID(), title: '', description: '', schema: schemaInit }}
          onUpdateDraft={(newDraft: draftType) => handleSaveDraft(newDraft)}
          onCancel={handleCancelDraft}
          onDeleteDraft={(id: string) => handleDeleteDraft(id)}
          onShowTemplate={(id: any) => handleShowTemplate(id)}
        />,
      );
    }
    return rows;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {showDialog && <Template onClose={() => setShowDialog(false)} draft={dialogData} />}
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold mb-4">{'Drafts'}</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => {
              handleAddDraft();
            }}
          >
            Add
          </button>
          {/* <div>{renderTextInput()}</div> */}
          <div>{renderDraft()}</div>
        </div>
      </div>
    </div>
  );
};

export default DraftBuilder;
