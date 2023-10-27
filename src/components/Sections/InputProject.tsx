import React from 'react';
import { projectType } from '~/components/types';

type InputProjectProps = {
  project: projectType;
  onUpdateProject: (updatedProject: projectType) => void;
  onCancel: () => void;
  onDeleteProject: (id: string) => void;
};

export default function InputProject({ project, onUpdateProject, onCancel, onDeleteProject }: InputProjectProps) {
  const [isEditing, setIsEditing] = React.useState<boolean>(project.title.length === 0 ? true : false);

  const [updatedProject, setUpdatedProject] = React.useState<projectType>(project);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedProject((prevProject: any) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleUpdateProject = () => {
    onUpdateProject(updatedProject);
    setIsEditing(false);
  };

  const handleCancelProject = () => {
    setIsEditing(false);
    onCancel();
  };

  return (
    <div className="border rounded-lg mt-4 p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{project.title}</h3>
        {!isEditing && (
          <button className="text-blue-500 hover:text-blue-700" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="mt-2">
          <label className="block font-bold mt-2 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedProject.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={updatedProject.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="link">
            Link
          </label>
          <input
            type="text"
            id="link"
            name="link"
            value={updatedProject.link}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex justify-between">
            <div className="w-full">
              <label className="block font-bold mt-2 mb-2" htmlFor="from">
                From
              </label>
              <input
                type="text"
                id="from"
                name="from"
                value={updatedProject.from}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full">
              <label className="block font-bold ml-2 mt-2 mb-2" htmlFor="to">
                To
              </label>
              <input
                type="text"
                id="to"
                name="to"
                value={updatedProject.to}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleUpdateProject}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => onDeleteProject(project.id)}
            >
              Delete
            </button>
            <button className="text-gray-500 hover:text-gray-700" onClick={handleCancelProject}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          {/* <p className="text-red-700">ENTRY ID: {project.id}</p> */}
          <p className="text-gray-700">{project.description}</p>
          <p className="text-gray-700">{project.link}</p>
          <p className="text-gray-700">
            {project.from} - {project.to}
          </p>
        </div>
      )}
    </div>
  );
}
