import React from 'react';
import p from '~/store/Predefined';
import { headerType } from '../Types';
import { draftType } from '../Types';

type props = {
  header: headerType;
};

export default function Header({ header }: props) {
  return (
    <div className="flex py-2 bg-gray-700">
      <div className="mx-auto px-6 py-2">
        <h1 className="text-2xl text-white">{header?.name}</h1>
        <h2 className="text-lg mt-1 text-gray-400 ">{header?.title}</h2>
        <p className="mt-3 text-white text-xs">{header?.pitch}</p>
      </div>
    </div>
  );
}
