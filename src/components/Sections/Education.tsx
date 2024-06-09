import React from 'react';
import p from '~/store/Predefined';
import { educationType } from '../Types';

type props = {
  education: educationType[];
};

export default function Education({ education }: props) {
  return (
    <div className="mt-2 px-6">
      <div className="text-xl fu-regular underline text-gray-500">EDUCATION</div>
      <div className="flex">
        <div className="w-1/1">
          {education.map((e, i) => {
            return (
              <div key={i}>
                <h3 className="text-lg fu-bold">{e.degree}</h3>
                <h4 className="text-xs">{e.institution}</h4>
                <h5 className="text-gray-500 text-xs italic">
                  {e.from} - {e.to}
                </h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
