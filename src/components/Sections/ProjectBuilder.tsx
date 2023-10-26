import React from 'react';
import { projectType, sectionType } from '~/components/types';
import { produce } from 'immer';
import InputProject from './InputProject';
import UUID from '../micro-components/UUID';

const title = 'Projects';

const project: projectType = {
  id: UUID(),
  title: 'Project 1',
  description: 'Description of Project 1',
  link: 'https://example.com/project1',
};

export default function ProjectBuilder({ section }: { section: sectionType }) {
  const [projects, setProjects] = React.useState<projectType[]>([project]);
  const [isAddingProject, setIsAddingProject] = React.useState<boolean>(false);

  const handleAddProject = () => {
    setIsAddingProject(true);
  };

  const updateProject = (project: projectType) => {
    const index = projects.findIndex((proj) => proj.id === project.id);
    if (index !== -1) {
      // Update existing project
      const newData = produce(projects, (draft) => {
        draft[index] = project;
      });
      setProjects(newData);
    } else {
      // Add new project
      const newData = produce(projects, (draft) => {
        draft.push(project);
      });
      setProjects(newData);
    }
  };

  const handleSaveProject = (project: projectType) => {
    updateProject(project);
    setIsAddingProject(false);
  };

  const handleCancelProject = () => {
    setIsAddingProject(false);
  };

  const handleDeleteProject = (id: string) => {
    const newData = produce(projects, (draft) => {
      const index = draft.findIndex((proj) => proj.id === id);
      draft.splice(index, 1);
    });
    setProjects(newData);
  };

  const renderProjects = () => {
    const rows = [];
    for (let i = 0; i < projects.length; i++) {
      rows.push(
        <InputProject
          key={i}
          project={projects[i]}
          onUpdateProject={(updatedProject: projectType) => updateProject(updatedProject)}
          onCancel={() => handleCancelProject()}
        />,
      );
    }
    if (isAddingProject) {
      rows.push(
        <InputProject
          key="new"
          project={{ id: UUID(), title: '', description: '', link: '' }}
          onUpdateProject={(newProject: projectType) => handleSaveProject(newProject)}
          onCancel={() => setIsAddingProject(false)}
        />,
      );
    }
    return rows;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => {
              handleAddProject();
            }}
          >
            Add
          </button>
          <div>{renderProjects()}</div>
        </div>
      </div>
    </div>
  );
}
