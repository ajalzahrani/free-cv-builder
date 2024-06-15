import React, { useState, useEffect } from 'react';
import { sectionType, contactType } from '~/components/Types';
import { produce } from 'immer';
import InputContact from './InputContact';
import UUID from '../Shared/UUID';
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { deleteData, fetchData, postData, updateData } from '../../api/api-sections';
import { toast } from 'react-toastify';

const title = 'Contacts';
const getUrl = '/cv/contacts';
const manUrl = '/cv/contact';

const contact: contactType = {
  id: UUID(),
  title: 'Contact 1',
  email: 'example@xyz.com',
  phone: '000-111-2222',
  website: 'example.com',
  address: 'Somewhere in the world',
  facebook: 'https://www.facebook.com/',
  twitter: 'https://twitter.com/',
  linkedin: 'https://www.linkedin.com/',
  github: 'https://www.github.com/',
};

export default function ContactBuilder({ section }: { section: sectionType }) {
  const {
    data: contacts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => fetchData(getUrl, { userId: 1 }),
    staleTime: 60000, // 1 minute
  });

  const [isAddingContact, setIsAddingContact] = React.useState<boolean>(false);

  const queryClient = useQueryClient();

  const handleMutationSuccess = (message: string) => {
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ['contacts'] });
    setIsAddingContact(false);
  };

  const handleMutationError = (error: any) => {
    toast.error(error.response.data.error.message, { position: 'top-left' });
    console.error(error.response.data.error);
  };

  const mutationCreate = useMutation({
    mutationFn: (contact: contactType) => postData(manUrl, { ...contact, id: null, userId: 1 }),
    onMutate: async (newContact) => {
      await queryClient.cancelQueries({ queryKey: ['contacts'] }); // Correct usage
      const previousHeaders = queryClient.getQueryData<contactType[]>(['contacts']);
      queryClient.setQueryData(['contacts'], (old: contactType[] = []) => [...old, newContact]);
      return { previousHeaders };
    },
    onError: (error, newContact, context) => {
      if (context?.previousHeaders) {
        queryClient.setQueryData(['contacts'], context.previousHeaders);
      }
      handleMutationError(error);
    },
    onSuccess: () => handleMutationSuccess('Contact created successfully!'),
  });

  const mutationUpdate = useMutation({
    mutationFn: (header: contactType) => updateData(manUrl, { ...header, id: parseInt(header.id), userId: 1 }),
    onMutate: async (updatedHeader) => {
      await queryClient.cancelQueries({ queryKey: ['contacts'] });
      const previousHeaders = queryClient.getQueryData<contactType[]>(['contacts']);
      queryClient.setQueryData(['contacts'], (old: contactType[] = []) =>
        old.map((header) => (header.id === updatedHeader.id ? updatedHeader : header)),
      );
      return { previousHeaders };
    },
    onError: (error, updatedHeader, context) => {
      if (context?.previousHeaders) {
        queryClient.setQueryData(['contacts'], context.previousHeaders);
      }
      handleMutationError(error);
    },
    onSuccess: () => handleMutationSuccess('Contact updated successfully!'),
  });

  const mutationDelete = useMutation({
    mutationFn: (headerId: string) => deleteData(manUrl, { id: parseInt(headerId), userId: 1 }),
    onMutate: async (headerId) => {
      await queryClient.cancelQueries({ queryKey: ['contacts'] });
      const previousHeaders = queryClient.getQueryData<contactType[]>(['contacts']);
      queryClient.setQueryData(['contacts'], (old: contactType[] = []) =>
        old.filter((header) => header.id !== headerId),
      );
      return { previousHeaders };
    },
    onError: (error, headerId, context) => {
      if (context?.previousHeaders) {
        queryClient.setQueryData(['contacts'], context.previousHeaders);
      }
      handleMutationError(error);
    },
    onSuccess: () => handleMutationSuccess('Contact deleted successfully!'),
  });

  const renderContacts = () => {
    const rows = [];
    for (let i = 0; i < contacts.length; i++) {
      rows.unshift(
        <InputContact
          key={i}
          contact={contacts[i] as unknown as contactType}
          onUpdateContact={(updatedContact: contactType) => mutationUpdate.mutate(updatedContact)}
          onCancel={() => setIsAddingContact(false)}
          onDeleteContact={(id: string) => mutationDelete.mutate(id)}
        />,
      );
    }
    if (isAddingContact) {
      rows.unshift(
        <InputContact
          key="new"
          contact={{
            id: UUID(),
            title: '',
            email: '',
            phone: '',
            website: '',
            address: '',
            facebook: '',
            twitter: '',
            linkedin: '',
            github: '',
          }}
          onUpdateContact={(newContact: contactType) => mutationCreate.mutate(newContact)}
          onCancel={() => setIsAddingContact(false)}
          onDeleteContact={(id: string) => mutationDelete.mutate(id)}
        />,
      );
    }
    return rows;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="section-title">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => {
                setIsAddingContact(true);
              }}
            >
              Add
            </button>
          </div>
          <div>{isLoading ? <div>Loading ...</div> : isError ? <div>Error</div> : null}</div>
          <div>{renderContacts()}</div>
        </div>
      </div>
    </div>
  );
}
