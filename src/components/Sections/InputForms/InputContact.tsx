import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactType } from '~/components/Types';

const contactSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone is required'),
  website: z.string().optional(),
  address: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
});

type InputContactProps = {
  item: Partial<contactType>;
  onSave: (item: contactType) => void;
  onCancel: () => void;
  onDelete?: (id: number) => void;
};

const InputContact: React.FC<InputContactProps> = ({ item, onSave, onCancel, onDelete }) => {
  const isCreating = !item.id; // Check if id exists to determine if creating new item
  const [isEditing, setIsEditing] = React.useState<boolean>(
    item.title ? (item.title.length === 0 ? true : false) : true,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<contactType>({
    resolver: zodResolver(contactSchema),
    defaultValues: item as contactType, // Convert to contactType for defaultValues
  });

  useEffect(() => {
    // Reset form values when header changes
    reset(item as contactType);
  }, [item, reset]);

  const handleOnSave = (data: contactType) => {
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
    reset(item as contactType); // Reset form to initial values
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

          <label htmlFor="title">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <input type="text" id="email" {...field} />}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <label htmlFor="phone">Phone</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => <input type="text" id="phone" {...field} />}
          />
          {errors.phone && <span>{errors.phone.message}</span>}

          <label htmlFor="website">Website</label>
          <Controller
            name="website"
            control={control}
            render={({ field }) => <input type="text" id="website" {...field} />}
          />
          {errors.website && <span>{errors.website.message}</span>}

          <label htmlFor="address">Address</label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => <input type="text" id="address" {...field} />}
          />
          {errors.address && <span>{errors.address.message}</span>}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <div className="w-full">
              <label htmlFor="linkedin">LinkedIn</label>
              <Controller
                name="linkedin"
                control={control}
                render={({ field }) => <input type="text" id="linkedin" {...field} />}
              />
            </div>
            <div className="w-full">
              <label htmlFor="twitter">Twitter</label>
              <Controller
                name="twitter"
                control={control}
                render={({ field }) => <input type="text" id="twitter" {...field} />}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <div className="w-full">
              <label htmlFor="facebook">Facebook</label>
              <Controller
                name="facebook"
                control={control}
                render={({ field }) => <input type="text" id="facebook" {...field} />}
              />
            </div>
            <div className="w-full">
              <label htmlFor="github">Github</label>
              <Controller
                name="github"
                control={control}
                render={({ field }) => <input type="text" id="github" {...field} />}
              />
            </div>
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
        <div className="">
          <p className="text-gray-700">{item.email}</p>
          <p className="text-gray-700">
            {item.phone} - {item.website}
          </p>
          <p className="text-gray-700">{item.address}</p>
          <p className="text-gray-700">{item.twitter}</p>
          <p className="text-gray-700">{item.facebook}</p>
          <p className="text-gray-700">{item.linkedin}</p>
          <p className="text-gray-700">{item.github}</p>
        </div>
      )}
    </div>
  );
};

export default InputContact;
