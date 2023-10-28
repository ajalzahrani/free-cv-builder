import React from 'react';
import p from '~/store/Predefined';
import { interestType } from '../types';

type props = {
  interest: interestType[];
};

export default function Intersets({ interest }: props) {
  return (
    <div className="mt-2 px-6 text-xs">
      <div className="text-xl fu-regular underline text-gray-500">INTERESTS</div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {interest.map((i, key) => {
          return (
            <div key={key}>
              <h4 className="fu-regular text-xs ">
                <span className="border rounded border-gray-700 p-1">{i.title}</span>
              </h4>
              {/* <h5 className="fu-regular text-xs">{i.description}</h5> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
