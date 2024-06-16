import '../../styles/headertest.css';
import React, { useState } from 'react';
import { sectionType, headerType } from '~/components/Types';
import InputHeader from './InputHeader';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteData, fetchData, postData, updateData } from '../../api/api-sections';

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const title = 'Headers';
const getUrl = '/cv/headers';
const manUrl = '/cv/header';

export default function HeaderBuilder({ section }: { section: sectionType }) {
  const {
    data: headers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['headers'],
    queryFn: () => fetchData(getUrl),
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
    mutationFn: (header: Omit<headerType, 'id'>) => postData(manUrl, header),
    onMutate: async (newHeader) => {
      await queryClient.cancelQueries({ queryKey: ['headers'] });
      const previousHeaders = queryClient.getQueryData<headerType[]>(['headers']);
      queryClient.setQueryData(['headers'], (old: headerType[] = []) => [...old, { ...newHeader }]);
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
    mutationFn: (header: headerType) => updateData(manUrl, header),
    onMutate: async (updatedHeader) => {
      await queryClient.cancelQueries({ queryKey: ['headers'] });
      const previousHeaders = queryClient.getQueryData<headerType[]>(['headers']);
      queryClient.setQueryData(['headers'], (old: headerType[] = []) =>
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
    for (let i = 0; i < headers.length; i++) {
      rows.unshift(
        <InputHeader
          key={i}
          header={headers[i] as unknown as Partial<headerType>}
          onSaveHeader={(updatedHeader: headerType) => mutationUpdate.mutate(updatedHeader)}
          onDeleteHeader={(id: number) => mutationDelete.mutate(id)}
          onCancel={() => setIsAddingHeader(false)}
        />,
      );
    }
    return rows;
  };

  return (
    <div className="header-builder">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{title}</h2>
        <button onClick={() => setIsAddingHeader(true)}>Add Header</button>
      </div>
      {isAddingHeader && (
        <InputHeader
          header={{} as headerType}
          onSaveHeader={(newHeader: headerType) => mutationCreate.mutate(newHeader)}
          onCancel={() => setIsAddingHeader(false)}
        />
      )}
      {renderHeaders()}

      <ToastContainer />
    </div>
  );
}
