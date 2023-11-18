import React from 'react';
import p from '~/store/Predefined';
import { projectType } from '../types';

type props = {
  projects: projectType[];
};

export default function Projects({ projects }: props) {
  return (
    <div className="mt-2 px-6 text-xs">
      <div className="text-xl fu-regular underline text-gray-500">PERSONAL PROJECTS</div>
      <ul>
        {projects.map((p, i) => {
          return (
            <div key={i}>
              <div>
                <h4 className="fu-regular text-xs">
                  {p.title} {p.from}-{p.to}
                </h4>
              </div>
              <ul>
                <li>
                  <h5 className="text-s">{p.description}</h5>
                </li>
              </ul>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
