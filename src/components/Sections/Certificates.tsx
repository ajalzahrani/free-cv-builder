import React from 'react';
import p from '~/store/Predefined';
import { certificateType } from '../types';

type props = {
  certificates: certificateType[];
};

export default function Certificates({ certificates }: props) {
  return (
    <div className="mt-2 px-6">
      <div className="text-xl fu-regular underline text-gray-500">CERTIFICATES</div>
      <div className="grid grid-cols-2 gap-4">
        {certificates.map((c, i) => {
          return (
            <div key={i}>
              <h4 className="fu-regular text-xs">{c.title}</h4>
              <h5 className="text-xs">
                {c.from} - {c.to}
              </h5>
              <h5 className="text-gray-500 text-xs italic">{c.company}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}
