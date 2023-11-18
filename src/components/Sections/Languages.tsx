import React from 'react';
import p from '~/store/Predefined';
import { languageType } from '../types';

type props = {
  language: languageType[];
};

export default function Languages({ language }: props) {
  return (
    <div className="mt-2 px-6 text-xs">
      <div className="text-xl fu-regular underline text-gray-500">LANGUAGES</div>
      <div className="grid grid-cols-2 gap-4">
        {language.map((l, i) => {
          return (
            <div key={i}>
              <h4 className="fu-regular text-xs">{l.title}</h4>
              <h5 className="text-gray-500 text-xs italic">{l.description}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}
