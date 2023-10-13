import React from 'react';
import p from '~/store/Predefined';

export default function Skills() {
  return (
    <div className="mt-2 px-6">
      <div className="text-xl fu-regular underline text-gray-500">SKILLS</div>
      <div className="flex flex-wrap">
        {p.skills.map((s, i) => {
          return (
            <div key={i} className="mb-3 mr-3">
              <h4 className="bg-gray-700 inline-block text-white p-1 rounded text-xs sm:text-base">{s}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
