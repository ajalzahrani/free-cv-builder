import React from 'react';
import p from '~/store/Predefined';

export default function Intersets() {
  return (
    <div className="mt-2 px-6 text-xs">
      <div className="text-xl fu-regular underline text-gray-500">INTERESTS</div>
      <div className="grid grid-cols-2 gap-4">
        {p.interests.map((i) => {
          return (
            <div>
              <h4 className="fu-regular text-xs">{i}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
