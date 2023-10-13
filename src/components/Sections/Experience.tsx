import React from 'react';
import p from '~/store/Predefined';

export default function Experience() {
  return (
    <div className="mt-4 px-6">
      <div className="text-xl fu-regular underline text-gray-500">WORK EXPERIENCE</div>
      {p.experience.map((e, i) => {
        return (
          <div className="flex mt-2" key={i}>
            <div className="w-1/1">
              <h3 className="text-lg fu-bold">{e.title}</h3>
              <h4 className="text-xs">{e.company}</h4>
              <h5 className="text-gray-500 italic fu-light text-xs">
                {e.from} - {e.to}
              </h5>
              <h5 className="text-gray-500 italic fu-light text-xs">Achievements/Tasks</h5>
              <ul className="flex flex-col list-disc list-insid text-xs fu-regular">
                {e.tasks.map((t, i) => {
                  return <li key={i}>{t}</li>;
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
