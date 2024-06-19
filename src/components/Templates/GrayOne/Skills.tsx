import React from 'react';
import p from '~/store/Predefined';

import { skillType } from '../../Types';

type props = {
  skills: skillType[];
};

export default function Skills({ skills }: props) {
  return (
    <div className="mt-2 px-6">
      <div className="text-xl fu-regular underline text-gray-500">SKILLS</div>
      <div className="flex flex-wrap">
        {skills.map((s, i) => {
          return (
            <div key={i} className="mt-2 mr-3 align-text-top">
              <h4 className="bg-gray-700 inline-block text-white p-1 pb-4 rounded text-xs fu-regular ">{s.title}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
