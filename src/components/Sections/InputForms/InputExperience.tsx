import React, { useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { experienceType } from '~/components/Types';

export const experienceSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  company: z.string().optional(),
  location: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  description: z.string().optional(),
  experinceTasks: z
    .array(
      z.object({
        description: z.string(),
      }),
    )
    .optional(),
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experinceTasks',
  });

  useEffect(() => {
    // Reset form values when header changes
    reset(item as experienceType);
  }, [item, reset]);

  const handleOnSave = (data: experienceType) => {
    console.log('onExperienceSave data: ', data);
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

          <div>
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

          <div className="section-title" style={{ marginTop: '10px' }}>
            <h2>Task</h2>
            <button type="button" onClick={() => append({ description: '' })}>
              Add Task
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
            {fields.map((field, index) => (
              <div
                key={field.id}
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}
              >
                <Controller
                  name={`experinceTasks.${index}.description`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      style={{
                        flexGrow: 1,
                        marginRight: '10px',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                      }}
                    />
                  )}
                />

                <button type="button" onClick={() => remove(index)}>
                  X
                </button>
              </div>
            ))}
          </div>

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
        <div className="section-container">
          <p>{item.company}</p>
          <p>{item.location}</p>
          <p>
            {item.from} - {item.to}
          </p>
          <p>{item.description}</p>
          <div style={{ marginTop: '10px' }}>
            <h3>Tasks</h3>
            <ul>{item.experinceTasks?.map((task, index) => <li key={index}>{task.description}</li>)}</ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputExperience;
