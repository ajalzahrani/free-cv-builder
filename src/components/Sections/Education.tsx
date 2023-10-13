import React from 'react';
import p from '~/store/Predefined';

export default function Education() {
  return (
    <div className="mt-24 pt-10 px-6">
      <div className="text-xl fu-regular underline text-gray-500">EDUCATION</div>
      <div className="flex">
        <div className="w-1/1">
          <h3 className="text-lg fu-bold">{p.eduction[0].title}</h3>
          <h4 className="text-xs">{p.eduction[0].company}</h4>
          <h5 className="text-gray-500 text-xs italic">
            {p.eduction[0].from} - {p.eduction[0].to}
          </h5>
        </div>
      </div>
    </div>
  );
}
