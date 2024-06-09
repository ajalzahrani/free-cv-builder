import React from 'react';
import p from '~/store/Predefined';
import { committeeType } from '../Types';

type props = {
  committes: committeeType[];
};

export default function Committees({ committes }: props) {
  return (
    <div className="mt-2 px-6 text-xs">
      <div className="text-xl fu-regular underline text-gray-500">PROJECTS & COMMITTEES INVOLVEMENT</div>
      <ul className="flex flex-col list-disc list-insid text-xs fu-regular">
        {committes.map((p, i) => {
          return (
            <li key={i} className="mt-2">
              <div>
                <h4 className="fu-regular text-s fu-bold">{p.name}</h4>
              </div>
              <h4 className="fu-regular text-xs">{p.date}</h4>
              <h5 className="text-gray-500 italic fu-light text-xs">Achievements/Tasks</h5>
              <ul>
                <li>
                  <h5 className="text-s">{p.responsibility}</h5>
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
