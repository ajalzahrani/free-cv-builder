import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { headerType } from '~/components/Types';

const headerSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  pitch: z.string().optional(),
});

type InputHeaderProps = {
  header: Partial<headerType>; // Allow header to be partial for both create and update
  onSaveHeader: (header: headerType) => void; // Callback to save header
  onCancel: () => void; // Callback to cancel editing
  onDeleteHeader?: (id: number) => void; // Optional callback to delete header
};

export default function InputHeader({ header, onSaveHeader, onCancel, onDeleteHeader }: InputHeaderProps) {
  const isCreating = !header.id; // Check if id exists to determine if creating new header
  const [isEditing, setIsEditing] = React.useState<boolean>(
    header.title ? (header.title.length === 0 ? true : false) : true,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<headerType>({
    resolver: zodResolver(headerSchema),
    defaultValues: header as headerType, // Convert to headerType for defaultValues
  });

  useEffect(() => {
    // Reset form values when header changes
    reset(header as headerType);
  }, [header, reset]);

  const handleSaveHeader = (data: headerType) => {
    console.log('onUpdate data: ', data);
    onSaveHeader(data); // Pass the complete header object to the onSaveHeader function
    setIsEditing(false); // Exit editing mode
  };

  const handleDeleteHeader = () => {
    if (onDeleteHeader && header.id) {
      onDeleteHeader(header.id); // Call onDeleteHeader with header id if provided
    }
  };

  const handleCancel = () => {
    setIsEditing(false); // Exit editing mode
    reset(header as headerType); // Reset form to initial values
    onCancel(); // Call onCancel callback
  };

  return (
    <div className="builders-element">
      <div className="section-title">
        <h3>{header.name}</h3>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        ) : (
          <button onClick={handleCancel}>Cancel</button>
        )}
      </div>
      {isEditing ? (
        <form
          className="builders-input"
          onSubmit={handleSubmit(handleSaveHeader, (errors) => console.log('error on submit: ', errors))}
        >
          <input type="hidden" name="id" value={header.id || ''} />

          <label htmlFor="name">Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <input type="text" id="name" {...field} />}
          />
          {errors.name && <span>{errors.name.message}</span>}

          <label htmlFor="title">Title</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <input type="text" id="title" {...field} />}
          />
          {errors.title && <span>{errors.title.message}</span>}

          <label htmlFor="pitch">Pitch</label>
          <Controller name="pitch" control={control} render={({ field }) => <textarea id="pitch" {...field} />} />

          <div>
            <button type="submit">{isCreating ? 'Create' : 'Update'}</button>
            {!isCreating && (
              <button type="button" onClick={handleDeleteHeader}>
                Delete
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="">
          <h3>{header.title}</h3>
          <p>{header.pitch}</p>
        </div>
      )}
    </div>
  );
}
