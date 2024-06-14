import { useState } from 'react';
import { sectionType, headerType } from '~/components/Types';
import InputHeader from './InputHeader';
import UUID from '../Shared/UUID';
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { deleteData, fetchData, postData, updateData } from '../../api/api-sections';

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const title = 'Headers';
const getUrl = '/cv/headers';
const manUrl = '/cv/header';

const header: headerType = {
  id: UUID(),
  name: 'John Doe',
  title: 'Software Engineer',
  pitch: 'I am a software engineer with 5 years of experience.',
};

export default function HeaderBuilder({ section }: { section: sectionType }) {
  const {
    data: headers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['headers'],
    queryFn: () => fetchData(getUrl, { userId: 1 }),
    staleTime: 60000, // 1 minute
  });

  const [isAddingHeader, setIsAddingHeader] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const handleMutationSuccess = (message: string) => {
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ['headers'] });
    setIsAddingHeader(false);
  };

  const handleMutationError = (error: any) => {
    toast.error(error.response.data.error.message, { position: 'top-left' });
    console.error(error.response.data.error);
  };
  const mutationCreate = useMutation({
    mutationFn: (header: headerType) => postData(manUrl, { ...header, userId: 1 }),
    onMutate: async (newHeader) => {
      await queryClient.cancelQueries({ queryKey: ['headers'] }); // Correct usage
      const previousHeaders = queryClient.getQueryData<headerType[]>(['headers']);
      queryClient.setQueryData(['headers'], (old: headerType[] = []) => [...old, newHeader]);
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
    /**
     * The mutation function to update a header.
     * Takes a `header` object and calls `updateData` to send a PUT request to the `manUrl` endpoint.
     * The `userId` is set to 1 in the payload.
     * @param {headerType} header - The header object to be updated.
     * @returns {Promise} - The promise returned by the `updateData` function.
     */
    mutationFn: (header: headerType) => updateData(manUrl, { ...header, userId: 1 }),

    /**
     * Optimistically update the cache before the mutation function is called.
     * @param {headerType} updatedHeader - The header object that will be updated.
     * @returns {Promise<{ previousHeaders: headerType[] }>} - An object containing the previous state of the headers for rollback if needed.
     */
    onMutate: async (updatedHeader) => {
      // Cancel any outgoing refetches for the 'headers' query key to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ['headers'] });

      // Snapshot the previous value of the 'headers' query
      const previousHeaders = queryClient.getQueryData<headerType[]>(['headers']);

      // Optimistically update the 'headers' query data with the updated header
      queryClient.setQueryData(['headers'], (old: headerType[] = []) =>
        old.map((header) => (header.id === updatedHeader.id ? updatedHeader : header)),
      );

      // Return the previous value so it can be rolled back if the mutation fails
      return { previousHeaders };
    },

    /**
     * If the mutation fails, rollback to the previous value.
     * @param {any} error - The error object returned by the failed mutation.
     * @param {headerType} updatedHeader - The header object that was being updated.
     * @param {object} context - The context returned from `onMutate`.
     * @param {headerType[]} context.previousHeaders - The previous headers state before the optimistic update.
     */
    onError: (error, updatedHeader, context) => {
      // Rollback to the previous headers state
      if (context?.previousHeaders) {
        queryClient.setQueryData(['headers'], context.previousHeaders);
      }

      // Handle the mutation error (e.g., show a toast notification)
      handleMutationError(error);
    },

    /**
     * If the mutation succeeds, perform any necessary side-effects.
     */
    onSuccess: () => {
      // Invalidate the 'headers' query to refetch the latest data from the server
      handleMutationSuccess('Header updated successfully!');
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (headerId: string) => deleteData(manUrl, { id: headerId, userId: 1 }),
    onMutate: async (headerId) => {
      await queryClient.cancelQueries({ queryKey: ['headers'] });
      const previousHeaders = queryClient.getQueryData<headerType[]>(['headers']);
      queryClient.setQueryData(['headers'], (old: headerType[] = []) => old.filter((header) => header.id !== headerId));
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

  const renderHeaders = () => {
    const rows = [];
    // if (!headers) return null; // Add null check here
    // console.log(headers.length);
    if (!headers) return null;
    for (let i = 0; i < headers.length; i++) {
      rows.unshift(
        <InputHeader
          key={i}
          header={headers[i] as unknown as headerType}
          onUpdateHeader={(updatedHeader: headerType) => mutationUpdate.mutate(updatedHeader)}
          onCancel={() => setIsAddingHeader(false)}
          onDeleteHeader={(id: string) => mutationDelete.mutate(id)}
        />,
      );
    }
    if (isAddingHeader) {
      rows.unshift(
        <InputHeader
          key="new"
          header={{ id: UUID(), name: '', title: '', pitch: '' }}
          onUpdateHeader={(newHeader: headerType) => mutationCreate.mutate(newHeader)}
          onCancel={() => setIsAddingHeader(false)}
          onDeleteHeader={(id: string) => mutationDelete.mutate(id)}
        />,
      );
    }
    return rows;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <button
        onClick={() => {
          console.log(headers);
        }}
      >
        Show headers
      </button>

      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="section-title">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <button
              onClick={() => {
                setIsAddingHeader(true);
              }}
            >
              Add
            </button>
          </div>
          <div>{isLoading ? <div>Loading ...</div> : isError ? <div>Error</div> : null}</div>
          <div>{renderHeaders()}</div>
        </div>
      </div>
    </div>
  );
}
