import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { experienceType, experinceTasksType } from '~/components/Types';

export const experienceSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional(),
  from: z.string(),
  to: z.string(),
  description: z.string().optional(),
});

type ExperienceProps = {
  item: experienceType;
  onSave: (item: experienceType) => void;
  onCancel: () => void;
  onDelete?: (id: number) => void;
};

const InputExperience: React.FC<ExperienceProps> = ({ item, onSave, onCancel, onDelete }) => {
  const isCreating = !item.id; // Check if id exists to determine if creating new item
  const [isEditing, setIsEditing] = React.useState<boolean>(
    item.title ? (item.title.length === 0 ? true : false) : true,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<experienceType>({
    resolver: zodResolver(experienceSchema),
    defaultValues: item as experienceType, // Convert to experienceType for defaultValues
  });

  useEffect(() => {
    // Reset form values when header changes
    reset(item as experienceType);
  }, [item, reset]);

  const handleOnSave = (data: experienceType) => {
    console.log('onUpdate data: ', data);
    onSave(data); // Pass the complete header object to the onSave function
    setIsEditing(false); // Exit editing mode
  };

  const handleOnDelete = () => {
    if (onDelete && item.id) {
      onDelete(item.id); // Call onDelete with item id if provided
    }
  };

  const handleOnCancel = () => {
    setIsEditing(false); // Exit editing mode
    reset(item as experienceType); // Reset form to initial values
    onCancel(); // Call onCancel callback
  };

  return (
    <div className="builders-element">
      <div className="section-title">
        <h3>{item.title}</h3>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        ) : (
          <button onClick={handleOnCancel}>Cancel</button>
        )}
      </div>
      {isEditing ? (
        <form
          className="builders-input"
          onSubmit={handleSubmit(handleOnSave, (errors) => console.log('error on submit: ', errors))}
        >
          <input type="hidden" name="id" value={item.id || ''} />

          <label htmlFor="title">Title</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <input type="text" id="title" {...field} />}
          />
          {errors.title && <span>{errors.title.message}</span>}

          <label htmlFor="company">Company</label>
          <Controller
            name="company"
            control={control}
            render={({ field }) => <input type="text" id="company" {...field} />}
          />
          {errors.company && <span>{errors.company.message}</span>}

          <label htmlFor="location">Location</label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => <input type="text" id="location" {...field} />}
          />

          <div className="flex justify-between">
            <label htmlFor="from">From</label>
            <Controller
              name="from"
              control={control}
              render={({ field }) => <input type="text" id="from" {...field} />}
            />

            <label htmlFor="to">To</label>
            <Controller name="to" control={control} render={({ field }) => <input type="text" id="to" {...field} />} />
          </div>

          <label htmlFor="description">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <input type="text" id="description" {...field} />}
          />

          {/* <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 mt-2">Task</label>
            {tasks?.map((item, index) => (
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
          </div> */}

          <div>
            <div>
              <button type="submit">{isCreating ? 'Create' : 'Update'}</button>
              {!isCreating && (
                <button type="button" onClick={handleOnDelete}>
                  Delete
                </button>
              )}
            </div>
          </div>
        </form>
      ) : (
        <div className="">
          <p className="text-gray-700">{item.company}</p>
          <p className="text-gray-700">{item.location}</p>
          <p className="text-gray-700">
            {item.from} - {item.to}
          </p>
          <p className="text-gray-700">{item.description}</p>
          {/* <p className="text-gray-700 font-bold">Tasks</p> */}
          {/* {tasks?.map((task, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="bg-gray-200 rounded-lg py-2 px-3 w-full mr-2">{task.description}</div>
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
};

export default InputExperience;
