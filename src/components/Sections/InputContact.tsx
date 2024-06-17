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
  contact: Partial<contactType>;
  onSaveContact: (updatedContact: contactType) => void;
  onCancel: () => void;
  onDeleteContact?: (id: number) => void;
};

const InputContact: React.FC<InputContactProps> = ({ contact, onSaveContact, onCancel, onDeleteContact }) => {
  const isCreating = !contact.id; // Check if id exists to determine if creating new contact
  const [isEditing, setIsEditing] = React.useState<boolean>(
    contact.title ? (contact.title.length === 0 ? true : false) : true,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<contactType>({
    resolver: zodResolver(contactSchema),
    defaultValues: contact as contactType, // Convert to contactType for defaultValues
  });

  useEffect(() => {
    // Reset form values when header changes
    reset(contact as contactType);
  }, [contact, reset]);

  const handleSaveContact = (data: contactType) => {
    console.log('onUpdate data: ', data);
    onSaveContact(data); // Pass the complete header object to the onSaveContact function
    setIsEditing(false); // Exit editing mode
  };

  const handleDeleteContact = () => {
    if (onDeleteContact && contact.id) {
      onDeleteContact(contact.id); // Call onDeleteContact with contact id if provided
    }
  };

  const handleCancel = () => {
    setIsEditing(false); // Exit editing mode
    reset(contact as contactType); // Reset form to initial values
    onCancel(); // Call onCancel callback
  };

  return (
    <div className="builders-element">
      <div className="section-title">
        <h3>{contact.title}</h3>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        ) : (
          <button onClick={handleCancel}>Cancel</button>
        )}
      </div>
      {isEditing ? (
        <form
          className="builders-input"
          onSubmit={handleSubmit(handleSaveContact, (errors) => console.log('error on submit: ', errors))}
        >
          <input type="hidden" name="id" value={contact.id || ''} />

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
                <button type="button" onClick={handleDeleteContact}>
                  Delete
                </button>
              )}
            </div>
          </div>
        </form>
      ) : (
        <div className="">
          <p className="text-gray-700">{contact.email}</p>
          <p className="text-gray-700">
            {contact.phone} - {contact.website}
          </p>
          <p className="text-gray-700">{contact.address}</p>
          <p className="text-gray-700">{contact.twitter}</p>
          <p className="text-gray-700">{contact.facebook}</p>
          <p className="text-gray-700">{contact.linkedin}</p>
          <p className="text-gray-700">{contact.github}</p>
        </div>
      )}
    </div>
  );
};

export default InputContact;
