import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { educationType } from '~/components/Types';

export const educationSchema = z.object({
  id: z.number().optional(),
  institution: z.string(),
  degree: z.string(),
  locaation: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  description: z.string().optional(),
});

type InputEducationProps = {
  item: Partial<educationType>;
  onSave: (item: educationType) => void;
  onCancel: () => void;
  onDelete?: (id: number) => void;
};

const InputEducation: React.FC<InputEducationProps> = ({ item, onSave, onCancel, onDelete }) => {
  const isCreating = !item.id; // Check if id exists to determine if creating new item
  const [isEditing, setIsEditing] = React.useState<boolean>(
    item.degree ? (item.degree.length === 0 ? true : false) : true,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<educationType>({
    resolver: zodResolver(educationSchema),
    defaultValues: item as educationType, // Convert to educationType for defaultValues
  });

  useEffect(() => {
    // Reset form values when header changes
    reset(item as educationType);
  }, [item, reset]);

  const handleOnSave = (data: educationType) => {
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
    reset(item as educationType); // Reset form to initial values
    onCancel(); // Call onCancel callback
  };

  return (
    <div className="builders-element">
      <div className="section-title">
        <h3>{item.degree}</h3>
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
          <label htmlFor="institution">Institution</label>
          <Controller
            name="institution"
            control={control}
            render={({ field }) => <input type="text" id="institution" {...field} />}
          />
          {errors.institution && <span>{errors.institution.message}</span>}

          <label htmlFor="degree">Degree</label>
          <Controller
            name="degree"
            control={control}
            render={({ field }) => <input type="text" id="degree" {...field} />}
          />
          {errors.degree && <span>{errors.degree.message}</span>}

          <label htmlFor="from">From</label>
          <Controller
            name="from"
            control={control}
            render={({ field }) => <input type="text" id="from" {...field} />}
          />

          <label htmlFor="to">To</label>
          <Controller name="to" control={control} render={({ field }) => <input type="text" id="to" {...field} />} />

          <label htmlFor="description">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <input type="text" id="description" {...field} />}
          />

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
          <p className="text-gray-700">{item.institution}</p>
          <p className="text-gray-700">{item.degree}</p>
          <p className="text-gray-700">{item.location}</p>
          <p className="text-gray-700">
            {item.from} - {item.to}
          </p>
          <p className="text-gray-700">{item.description}</p>
        </div>
      )}
    </div>
  );
};

export default InputEducation;
