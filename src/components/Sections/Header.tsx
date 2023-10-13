import React from 'react';
import p from '~/store/Predefined';

export default function Header() {
  return (
    <div className="flex pt-10 bg-gray-700">
      <div className="mx-auto px-6 py-2">
        <h1 className="text-2xl text-white">{p.name}</h1>
        <h2 className="text-lg mt-1 text-gray-400 ">{p.title}</h2>
        <p className="mt-3 text-white text-xs">{p.header}</p>
      </div>
    </div>
  );
}
