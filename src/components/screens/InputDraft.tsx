import React from 'react';
import { draftType } from '~/components/types';
import Draft from '../Draft';

type InputDraftProps = {
  draft: draftType;
  onUpdateDraft: (updatedDraft: draftType) => void;
  onCancel: () => void;
  onDeleteDraft: (id: string) => void;
};

export default function InputDraft({ draft, onUpdateDraft, onCancel, onDeleteDraft }: InputDraftProps) {
  const [isEditing, setIsEditing] = React.useState<boolean>(draft.title.length === 0 ? true : false);

  const [updatedDraft, setUpdatedDraft] = React.useState<draftType>(draft);

  const [schema, setSchema] = React.useState<draftType['schema']>(draft.schema);

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

  return (
    <div className="border rounded-lg mt-4 p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{draft.title}</h3>
        {!isEditing && (
          <button className="text-blue-500 hover:text-blue-700" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="mt-2">
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
          <div className="mt-2">
            <Draft schema={schema} setSchema={setSchema} />
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleUpdateDraft}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => onDeleteDraft(draft.id)}
            >
              Delete
            </button>
            <button className="text-gray-500 hover:text-gray-700" onClick={handleCancelDraft}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          {/* <p className="text-red-700">ENTERY ID: {education.id}</p> */}
          <p className="text-gray-700">{draft.title}</p>
          <p className="text-gray-700">{draft.description}</p>
        </div>
      )}
    </div>
  );
}
