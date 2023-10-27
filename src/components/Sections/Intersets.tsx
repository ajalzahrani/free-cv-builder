import React from 'react';
import p from '~/store/Predefined';
import { interestType } from '../types';

type props = {
  interests: interestType[];
};

export default function Intersets({ interests }: props) {
  return (
    <div className="mt-2 px-6 text-xs">
      <div className="text-xl fu-regular underline text-gray-500">INTERESTS</div>
      <div className="grid grid-cols-2 gap-4">
        {interests.map((i, key) => {
          return (
            <div key={key}>
              <h4 className="fu-regular text-xs">{i.title}</h4>
              <h5 className="fu-regular text-xs">{i.description}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}
