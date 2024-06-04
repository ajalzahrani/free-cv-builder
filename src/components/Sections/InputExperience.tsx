import React, { useEffect } from 'react';
import { experienceType, experinceTasksType } from '~/components/types';

type ExperienceProps = {
  experience: experienceType;
  onUpdateExperience: (updatedExperience: experienceType) => void;
  onCancel: () => void;
  onDeleteExperience: (id: string) => void;
};

export default function Experience({ experience, onUpdateExperience, onDeleteExperience, onCancel }: ExperienceProps) {
  const [isEditing, setIsEditing] = React.useState<boolean>(experience.title.length === 0 ? true : false);

  const [updatedExperience, setUpdatedExperience] = React.useState<experienceType>(experience);

  const [tasks, setTasks] = React.useState<experinceTasksType[]>(updatedExperience.experinceTasks);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedExperience((prevExperience: any) => ({
      ...prevExperience,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    setUpdatedExperience((prevExperience) => ({
      ...prevExperience,
      experinceTasks: tasks,
    }));
  };

  const handleDeleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleUpdateExperience = () => {
    handleAddTask();
    onUpdateExperience(updatedExperience);
    setIsEditing(false);
  };

  const handleCancelExperience = () => {
    setIsEditing(false);
    onCancel();
  };

  React.useEffect(() => {
    handleAddTask();
  }, [tasks]);

  return (
    <div className="border rounded-lg mt-4 p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{experience.title}</h3>
        {!isEditing && (
          <button
            className="text-blue-500 hover:text-blue-700 py-1 px-3 rounded bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="mt-2">
          <p className="text-red-700">ENTERY ID: {experience.id}</p>
          <label className="block font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedExperience.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="company">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={updatedExperience.company}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block font-bold mt-2 mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={updatedExperience.location}
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
                value={updatedExperience.from}
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
                value={updatedExperience.to}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
              />
            </div>
          </div>
          <label className="block font-bold mt-2 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={updatedExperience.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 mt-2">Task</label>
            {tasks.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  className="border rounded-lg py-2 px-3 w-full mr-2"
                  type="text"
                  placeholder="Task"
                  value={item.description}
                  onChange={(e) => {
                    const newTask = [...tasks];
                    newTask[index].description = e.target.value;
                    setTasks(newTask);
                  }}
                />
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteTask(index)}
                >
                  X
                </button>
              </div>
            ))}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                const newTask = [...tasks];
                newTask.push({ description: '' });
                setTasks(newTask);
              }}
            >
              Add Task
            </button>
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleUpdateExperience}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => onDeleteExperience(experience.id)}
            >
              Delete
            </button>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => handleCancelExperience()}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <p className="text-red-700">ENTERY ID: {experience.id}</p>

          <p className="text-gray-700">{experience.company}</p>
          <p className="text-gray-700">{experience.location}</p>
          <p className="text-gray-700">
            {experience.from} - {experience.to}
          </p>
          <p className="text-gray-700">{experience.description}</p>
          <p className="text-gray-700 font-bold">Tasks</p>
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="bg-gray-200 rounded-lg py-2 px-3 w-full mr-2">{task.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
