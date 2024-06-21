import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { draftType } from '~/components/Types';
import Select, { StylesConfig } from 'react-select';
import useDraftOptionsStore from '~/store/useDraftOptionsStore';

const draftSectionsSchema = z.object({
  header: z.number().optional(),
  contact: z.number().optional(),
  experience: z.array(z.number()).optional(),
  education: z.array(z.number()).optional(),
  project: z.array(z.number()).optional(),
  certificate: z.array(z.number()).optional(),
  skill: z.array(z.number()).optional(),
  interest: z.array(z.number()).optional(),
  language: z.array(z.number()).optional(),
});

const draftSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string().optional(),
  draftSections: draftSectionsSchema,
});

interface optionType {
  color(color: any): unknown;
  readonly label: string;
  readonly value: string;
}

type InputDraftProps = {
  item: Partial<draftType>;
  options: any;
  onSave: (item: draftType) => void;
  onCancel: () => void;
  onDelete?: (id: number) => void;
};

function getOptions(options: any) {
  const res: optionType[] = [];
  options.forEach((item: any) => {
    res.push({ label: item.title, value: item.id, color: () => '#f0f0f0' });
  });
  return res;
}

export default function InputDraft({ item, options, onSave, onDelete, onCancel }: InputDraftProps) {
  const isCreating = !item.id;
  const [isEditing, setIsEditing] = React.useState<boolean>(
    item.title ? (item.title.length === 0 ? true : false) : true,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<draftType>({
    resolver: zodResolver(draftSchema),
    defaultValues: item as draftType,
  });

  useEffect(() => {
    console.info('draft options: ', options);
  }, []);

  useEffect(() => {
    reset(item as draftType);
  }, [item, reset]);

  const colourStyles: StylesConfig<optionType, true> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? data.color : undefined,
        color: isDisabled ? '#ccc' : 'black',
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled ? (isSelected ? data.color : 'yellow') : undefined,
        },
      };
    },
  };

  const handleOnSave = (data: draftType) => {
    console.log('onUpdate data: ', data);
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
    reset(item as draftType);
    onCancel();
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
          <label htmlFor="header">Header</label>
          <Controller
            name="header"
            control={control}
            render={({ field }) => <Select {...field} options={getOptions(options.headers)} styles={colourStyles} />}
          />

          <label htmlFor="contact">Contact</label>
          <Controller
            name="contact"
            control={control}
            render={({ field }) => <Select {...field} options={getOptions(options.contacts)} styles={colourStyles} />}
          />

          <label htmlFor="experience">Experinece</label>
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                styles={colourStyles}
                closeMenuOnSelect={false}
                isMulti
                options={getOptions(options.experiences)}
              />
            )}
          />

          <label htmlFor="eduction">Education</label>
          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                closeMenuOnSelect={false}
                isMulti
                options={getOptions(options.education)}
                styles={colourStyles}
              />
            )}
          />

          <label htmlFor="certification">Certifications</label>
          <Controller
            name="certification"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                closeMenuOnSelect={false}
                isMulti
                options={getOptions(options.certificates)}
                styles={colourStyles}
              />
            )}
          />

          <label htmlFor="skill">Skills</label>
          <Controller
            name="skill"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                closeMenuOnSelect={false}
                isMulti
                options={getOptions(options.skills)}
                styles={colourStyles}
              />
            )}
          />

          <label htmlFor="project">Projects</label>
          <Controller
            name="project"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                closeMenuOnSelect={false}
                isMulti
                options={getOptions(options.projects)}
                styles={colourStyles}
              />
            )}
          />

          <label htmlFor="language">Languages</label>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                closeMenuOnSelect={false}
                isMulti
                options={getOptions(options.languages)}
                styles={colourStyles}
              />
            )}
          />

          <label htmlFor="interrest">Interrests</label>
          <Controller
            name="interrest"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                closeMenuOnSelect={false}
                isMulti
                options={getOptions(options.interrests)}
                styles={colourStyles}
              />
            )}
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
          <p className="text-gray-700">{item.description}</p>
        </div>
      )}
    </div>
  );
}
