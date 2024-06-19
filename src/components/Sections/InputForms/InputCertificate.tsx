import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { certificateType } from '~/components/Types';

export const certificateSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string().optional(),
  company: z.string().optional(),
  link: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

type InputCertificationProps = {
  item: Partial<certificateType>;
  onSave: (item: certificateType) => void;
  onCancel: () => void;
  onDelete?: (id: number) => void;
};

const InputCertificate: React.FC<InputCertificationProps> = ({ item, onSave, onCancel, onDelete }) => {
  const isCreating = !item.id; // Check if id exists to determine if creating new item
  const [isEditing, setIsEditing] = React.useState<boolean>(
    item.title ? (item.title.length === 0 ? true : false) : true,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<certificateType>({
    resolver: zodResolver(certificateSchema),
    defaultValues: item as certificateType, // Convert to certificateType for defaultValues
  });

  useEffect(() => {
    // Reset form values when header changes
    reset(item as certificateType);
  }, [item, reset]);

  const handleOnSave = (data: certificateType) => {
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
    reset(item as certificateType); // Reset form to initial values
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

          <label htmlFor="description">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <input type="text" id="description" {...field} />}
          />

          <label htmlFor="company">Company</label>
          <Controller
            name="company"
            control={control}
            render={({ field }) => <input type="text" id="company" {...field} />}
          />

          <label htmlFor="link">Link</label>
          <Controller
            name="link"
            control={control}
            render={({ field }) => <input type="text" id="link" {...field} />}
          />

          <label htmlFor="from">From</label>
          <Controller
            name="from"
            control={control}
            render={({ field }) => <input type="text" id="from" {...field} />}
          />

          <label htmlFor="to">To</label>
          <Controller name="to" control={control} render={({ field }) => <input type="text" id="to" {...field} />} />
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
          <p className="text-gray-700">{item.title}</p>
          <p className="text-gray-700">{item.company}</p>
          <p className="text-gray-700">
            {item.from} - {item.to}
          </p>
          <p className="text-gray-700">{item.description}</p>
        </div>
      )}
    </div>
  );
};

export default InputCertificate;
