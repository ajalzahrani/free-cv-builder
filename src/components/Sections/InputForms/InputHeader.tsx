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
  item: Partial<headerType>;
  onSave: (item: headerType) => void;
  onCancel: () => void;
  onDelete?: (id: number) => void;
};

export default function InputHeader({ item, onSave, onCancel, onDelete }: InputHeaderProps) {
  const isCreating = !item?.id;
  const [isEditing, setIsEditing] = React.useState<boolean>(
    item.title ? (item.title.length === 0 ? true : false) : true,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<headerType>({
    resolver: zodResolver(headerSchema),
    defaultValues: item as headerType,
  });

  useEffect(() => {
    reset(item as headerType);
  }, [item, reset]);

  const handleOnSave = (data: headerType) => {
    onSave(data);
    setIsEditing(false);
  };

  const handleOnDelete = () => {
    if (onDelete && item.id) {
      onDelete(item.id);
    }
  };

  const handleOnCancel = () => {
    setIsEditing(false);
    reset(item as headerType);
    onCancel();
  };

  return (
    <div className="builders-element">
      <div className="section-title">
        <h3>{item.name}</h3>
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
              <button type="button" onClick={handleOnDelete}>
                Delete
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="">
          <h3>{item.title}</h3>
          <p>{item.pitch}</p>
        </div>
      )}
    </div>
  );
}
