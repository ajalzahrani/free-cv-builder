import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { MapIcon } from '@heroicons/react/24/solid';
import { PaperClipIcon } from '@heroicons/react/24/solid';
import { DevicePhoneMobileIcon } from '@heroicons/react/24/solid';
import { GlobeAltIcon } from '@heroicons/react/24/solid';
import p from '~/store/Predefined';

export default function Contacts() {
  return (
    <div className=" grid grid-cols-2 bg-gray-800 px-6 py-1">
      <div className="text-white my-1">
        <EnvelopeIcon className="h-4 w-4 text-white inline-block align-middle mr-2" />
        <span className="inline-block align-middle text-xs">{p.contact.email}</span>
      </div>
      <div className="text-white my-1">
        <DevicePhoneMobileIcon className="h-4 w-4 inline-block align-middle mr-2" />
        <span className="inline-block align-middle text-xs">{p.contact.phone}</span>
      </div>
      <div className="text-white my-1">
        <MapIcon className="h-4 w-4 text-white inline-block align-middle mr-2" />
        <span className="inline-block align-middle text-xs">{p.contact.address}</span>
      </div>

      <div className="text-white my-1">
        <PaperClipIcon className="h-4 w-4 inline-block align-middle mr-2" />
        <span className="inline-block align-middle text-xs">{p.contact.website}</span>
      </div>
      <div className="text-white my-1">
        <PaperClipIcon className="h-4 w-4 inline-block align-middle mr-2" />
        <span className="inline-block align-middle text-xs">{p.contact.linkedin}</span>
      </div>
      <div className="text-white my-1">
        <PaperClipIcon className="h-4 w-4 inline-block align-middle mr-2" />
        <span className="inline-block align-middle text-xs">{p.contact.github}</span>
      </div>
    </div>
  );
}
