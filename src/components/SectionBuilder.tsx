import React from 'react';
import Input from './micro-components/Input';
import { inputType } from '~/components/micro-components/Input';
import { sectionDataType, sectionType } from '~/components/types';
import { produce } from 'immer';

type sectionBuilderType = {
  title: string;
  type?: sectionType;
  textObject: inputType;
};

const textObjects = {
  title: '',
  id: 0,
  status: true,
  updateText: () => {},
};
const title = 'Expierance';

export default function SectionBuilder(section: sectionDataType) {
  const [exp, setExp] = React.useState<[]>([]);
  const [items, setItems] = React.useState<number>(0);
  const [textObject, setTextObject] = React.useState<inputType>(textObjects);

  const updateTitle = (text: string) => {
    setTextObject(
      produce((draft) => {
        draft.title = text;
      }),
    );
  };

  const renderTextInput = () => {
    const rows = [];
    for (let i = 0; i < items; i++) {
      rows.push(
        <Input
          key={i}
          id={textObject.id}
          title={textObject.title}
          status={textObject.status}
          updateText={updateTitle}
        />,
      );
    }
    return <>{rows}</>;
  };

  return (
    <div className="pt-10 bg-gray-200">
      <div>SectionBuilder</div>
      <p>Experience</p>
      <button
        onClick={() => {
          setItems((prev) => prev + 1);
        }}
      >
        +
      </button>
      <div>{renderTextInput()}</div>
    </div>
  );
}
