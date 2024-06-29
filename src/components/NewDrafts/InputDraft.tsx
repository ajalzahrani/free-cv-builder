import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Select, { StylesConfig } from 'react-select';
import { draftType } from '~/components/Types';

const draftSectionsSchema = z.object({
  header: z.number().optional(),
  contact: z.number().optional(),
  experience: z.array(z.number()).optional(),
  education: z.array(z.number()).optional(),
  project: z.array(z.number()).optional(),
  certificate: z.array(z.number()).optional(),
  skill: z.array(z.number()).optional(),
  interrest: z.array(z.number()).optional(),
  language: z.array(z.number()).optional(),
});

const draftSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string().optional(),
  draftSections: draftSectionsSchema,
});

interface optionType {
  color?: string;
  readonly label: string;
  readonly value: number;
}

type InputDraftProps = {
  item: Partial<draftType>;
  options: any;
  onSave: (item: draftType) => void;
  onCancel: () => void;
  onDelete?: (id: number) => void;
};

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
    defaultValues: item,
  });

  useEffect(() => {
    reset(item as draftType);
  }, [item, reset]);

  const colourStyles: StylesConfig<optionType, true> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const backgroundColor = isDisabled ? (data.color as any) : undefined;
      return {
        ...styles,
        backgroundColor,
        color: isDisabled ? '#ccc' : 'black',
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && isSelected ? data.color : undefined,
        },
      };
    },
  };

  const handleOnSave = (data: draftType) => {
    console.log('Draft onSave data: ', data);
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

  const getOptions = (options: any) => options.map((opt: any) => ({ value: opt.id, label: opt.title }));

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

          {/* ------- HEADER ------- */}
          <label htmlFor="header">Header</label>
          <Controller
            name="draftSections.header"
            control={control}
            render={({ field }) => (
              <Select
                // defaultValue={getOptions(options.headers)}
                {...field}
                styles={colourStyles}
                options={getOptions(options.headers)}
                value={getOptions(options.headers).find((option: any) => option.value === field.value) || 'nullish'}
                onChange={(option) => field.onChange(option ? option.value : null)}
              />
            )}
          />

          {/* ------- CONTACT ------- */}
          <label htmlFor="contact">Contact</label>
          <Controller
            name="draftSections.contact"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                styles={colourStyles}
                options={getOptions(options.contacts)}
                value={getOptions(options.contacts).find((option: any) => option.value === field.value) || null}
                onChange={(option) => field.onChange(option ? option.value : null)}
              />
            )}
          />

          {/* ------- EXPERINCE ------- */}
          <label htmlFor="experience">Experience</label>
          <Controller
            name="draftSections.experience"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                styles={colourStyles}
                closeMenuOnSelect={false}
                isMulti
                options={getOptions(options.experiences)}
                value={getOptions(options.experiences).filter((option) => field.value?.includes(option.value)) || []}
                onChange={(selectedOptions) =>
                  field.onChange(selectedOptions ? selectedOptions.map((option: optionType) => option.value) : [])
                }
              />
            )}
          />

          {/* ------- EDUCATION ------- */}
          <label htmlFor="education">Education</label>
          <Controller
            name="draftSections.education"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                styles={colourStyles}
                closeMenuOnSelect={false}
                isMulti
                options={getOptions(options.education)}
                value={getOptions(options.education).filter((option) => field.value?.includes(option.value)) || []}
                onChange={(selectedOptions) =>
                  field.onChange(selectedOptions ? selectedOptions.map((option: optionType) => option.value) : [])
                }
              />
            )}
          />

          {/* ------- CERTIFICATE ------- */}
          <label htmlFor="certificate">Certificate</label>
          <Controller
            name="draftSections.certificate"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                styles={colourStyles}
                closeMenuOnSelect={false}
                isMulti
                options={getOptions(options.certificates)}
                value={getOptions(options.certificates).filter((option) => field.value?.includes(option.value)) || []}
                onChange={(selectedOptions) =>
                  field.onChange(selectedOptions ? selectedOptions.map((option: optionType) => option.value) : [])
                }
              />
            )}
          />

          {/* ------- SKILL ------- */}
          <label htmlFor="skill">Skill</label>
          <Controller
            name="draftSections.skill"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                styles={colourStyles}
                closeMenuOnSelect={false}
                isMulti
                options={getOptions(options.skills)}
                value={getOptions(options.skills).filter((option) => field.value?.includes(option.value)) || []}
                onChange={(selectedOptions) =>
                  field.onChange(selectedOptions ? selectedOptions.map((option: optionType) => option.value) : [])
                }
              />
            )}
          />

          {/* ------- PROJECT ------- */}
          <label htmlFor="project">Project</label>
          <Controller
            name="draftSections.project"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                styles={colourStyles}
                closeMenuOnSelect={false}
                isMulti
                options={getOptions(options.projects)}
                value={getOptions(options.projects).filter((option) => field.value?.includes(option.value)) || []}
                onChange={(selectedOptions) =>
                  field.onChange(selectedOptions ? selectedOptions.map((option: optionType) => option.value) : [])
                }
              />
            )}
          />

          {/* ------- INTERREST ------- */}
          <label htmlFor="interest">Interrest</label>
          <Controller
            name="draftSections.interrest"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                styles={colourStyles}
                closeMenuOnSelect={false}
                isMulti
                options={getOptions(options.interrests)}
                value={getOptions(options.interrests).filter((option) => field.value?.includes(option.value)) || []}
                onChange={(selectedOptions) =>
                  field.onChange(selectedOptions ? selectedOptions.map((option: optionType) => option.value) : [])
                }
              />
            )}
          />

          {/* ------- LANGUAGE ------- */}
          <label htmlFor="language">Language</label>
          <Controller
            name="draftSections.language"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                styles={colourStyles}
                closeMenuOnSelect={false}
                isMulti
                options={getOptions(options.languages)}
                value={getOptions(options.languages).filter((option) => field.value?.includes(option.value)) || []}
                onChange={(selectedOptions) =>
                  field.onChange(selectedOptions ? selectedOptions.map((option: optionType) => option.value) : [])
                }
              />
            )}
          />
          {/* Repeat similar blocks for other sections like education, project, certificate, skill, interest, and language... */}
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
