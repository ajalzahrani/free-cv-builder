import { useState } from 'react';
import { sectionType, contactType } from '~/components/Types';
import InputContact from './InputContact';
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { deleteData, fetchData, postData, updateData } from '../../api/api-sections';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const title = 'Contacts';
const getUrl = '/cv/contacts';
const manUrl = '/cv/contact';

const contact: contactType = {
  id: 1,
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
    queryFn: () => fetchData(getUrl),
    staleTime: 60000, // 1 minute
  });

  const [isAddingContact, setIsAddingContact] = useState<boolean>(false);
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
    mutationFn: (header: Omit<contactType, 'id'>) => postData(manUrl, header),
    onMutate: async (newHeader) => {
      await queryClient.cancelQueries({ queryKey: ['headers'] });
      const previousHeaders = queryClient.getQueryData<contactType[]>(['headers']);
      queryClient.setQueryData(['headers'], (old: contactType[] = []) => [...old, { ...newHeader }]);
      return { previousHeaders };
    },
    onError: (error, newHeader, context) => {
      if (context?.previousHeaders) {
        queryClient.setQueryData(['headers'], context.previousHeaders);
      }
      handleMutationError(error);
    },
    onSuccess: () => handleMutationSuccess('Header created successfully!'),
  });

  const mutationUpdate = useMutation({
    mutationFn: (header: contactType) => updateData(manUrl, header),
    onMutate: async (updatedHeader) => {
      await queryClient.cancelQueries({ queryKey: ['headers'] });
      const previousHeaders = queryClient.getQueryData<contactType[]>(['headers']);
      queryClient.setQueryData(['headers'], (old: contactType[] = []) =>
        old.map((header) => (header.id === updatedHeader.id ? updatedHeader : header)),
      );
      return { previousHeaders };
    },
    onError: (error, updatedHeader, context) => {
      if (context?.previousHeaders) {
        queryClient.setQueryData(['headers'], context.previousHeaders);
      }
      handleMutationError(error);
    },
    onSuccess: () => handleMutationSuccess('Header updated successfully!'),
  });

  const mutationDelete = useMutation({
    mutationFn: (headerId: number) => deleteData(manUrl, { id: headerId }),
    onMutate: async (headerId) => {
      await queryClient.cancelQueries({ queryKey: ['headers'] });
      const previousHeaders = queryClient.getQueryData<contactType[]>(['headers']);
      queryClient.setQueryData(['headers'], (old: contactType[] = []) =>
        old.filter((header) => header.id !== headerId),
      );
      return { previousHeaders };
    },
    onError: (error, headerId, context) => {
      if (context?.previousHeaders) {
        queryClient.setQueryData(['headers'], context.previousHeaders);
      }
      handleMutationError(error);
    },
    onSuccess: () => handleMutationSuccess('Header deleted successfully!'),
  });

  const renderContacts = () => {
    const rows = [];
    for (let i = 0; i < contacts.length; i++) {
      rows.unshift(
        <InputContact
          key={i}
          contact={contacts[i] as unknown as Partial<contactType>}
          onSaveContact={(updatedContact: contactType) => mutationUpdate.mutate(updatedContact)}
          onDeleteContact={(id: number) => mutationDelete.mutate(id)}
          onCancel={() => setIsAddingContact(false)}
        />,
      );
    }

    if (isAddingContact) {
      rows.unshift(
        <InputContact
          contact={{} as contactType}
          onSaveContact={(newContact: contactType) => mutationCreate.mutate(newContact)}
          onCancel={() => setIsAddingContact(false)}
        />,
      );
    }

    if (isLoading) {
      rows.unshift(<div>Loading...</div>);
    }

    if (isError) {
      rows.unshift(<div>Error</div>);
    }
    return rows;
  };

  // return (
  //   <div className="header-builder">
  //     <div className="container mx-auto px-6">
  //       <div className="bg-white rounded-lg shadow-lg p-6">
  //         <div className="section-title">
  //           <h2 className="text-2xl font-bold mb-4">{title}</h2>
  //           <button
  //             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
  //             onClick={() => {
  //               setIsAddingContact(true);
  //             }}
  //           >
  //             Add
  //           </button>
  //         </div>
  //         <div>{isLoading ? <div>Loading ...</div> : isError ? <div>Error</div> : null}</div>
  //         <div>{renderContacts()}</div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="header-builder">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{title}</h2>
        <button onClick={() => setIsAddingContact(true)}>Add Contact</button>
      </div>

      {renderContacts()}

      <ToastContainer />
    </div>
  );
}
