import React from 'react';
import p from '~/store/Predefined';
import { experienceType } from '../../Types';

type props = {
  experience: experienceType[];
};

export default function Experience({ experience }: props) {
  return (
    <div className="mt-4 px-6">
      <div className="text-xl fu-regular underline text-gray-500">WORK EXPERIENCE</div>
      {experience.map((e, i) => {
        return (
          <div className="flex mt-2" key={i}>
            <div className="w-1/1">
              <h3 className="text-lg fu-bold">{e.title}</h3>
              <h4 className="text-xs">{e.company}</h4>
              <h5 className="text-gray-500 italic fu-light text-xs">
                {e.from} - {e.to}
              </h5>
              {e.experinceTasks.length > 0 ? (
                <h5 className="text-gray-500 italic fu-light text-xs">Achievements/Tasks</h5>
              ) : (
                ''
              )}
              <ul className="flex flex-col list-disc list-insid text-xs fu-regular">
                {e.experinceTasks.map((t, i) => {
                  return <li key={i}>{t.description}</li>;
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
