import React, { useEffect, useState } from 'react';
import { draftType } from '../Types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputDraft from './InputDraft';
import { deleteData, fetchData, postData, updateData } from '../../api/api-sections';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useDraftOptionsStore from '~/store/useDraftOptionsStore';
import { produce } from 'immer';
import useDraftsStore from '../../store/useDraftStore';
// import Template from './Templete';

const DraftBuilder = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['drafts'],
    queryFn: () => fetchData('/cv/drafts'),
    staleTime: 60000,
  });

  const {
    data: options,
    isLoading: isLoadingOptions,
    isError: isErrorOptions,
  } = useQuery({
    queryKey: ['draft-sections'],
    queryFn: () => fetchData('/cv/draft-sections'),
    staleTime: 60000,
  });

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleMutationSuccess = (message: string) => {
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ['drafts'] });
    setIsAdding(false);
  };

  const handleMutationError = (error: any) => {
    toast.error(error.response.data.error.message, { position: 'top-left' });
    console.error(error.response.data.error);
  };

  const mutationCreate = useMutation({
    mutationFn: (newItem: Omit<draftType, 'id'>) => postData('manUrl', newItem),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['drafts'] });
      const previousData = queryClient.getQueryData<draftType[]>(['drafts']);
      queryClient.setQueryData(['drafts'], (old: draftType[] = []) => [...old, { ...newItem }]);
      return { previousData };
    },
    onError: (error, newItem, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['drafts'], context.previousData);
      }
      handleMutationError(error);
    },
    onSuccess: () => handleMutationSuccess(`Draft created successfully!`),
  });

  const mutationUpdate = useMutation({
    mutationFn: (updatedItem: draftType) => updateData('manUrl', updatedItem),
    onMutate: async (updatedItem) => {
      await queryClient.cancelQueries({ queryKey: ['drafts'] });
      const previousData = queryClient.getQueryData<draftType[]>(['drafts']);
      queryClient.setQueryData(['drafts'], (old: draftType[] = []) =>
        old.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
      );
      return { previousData };
    },
    onError: (error, updatedItem, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['drafts'], context.previousData);
      }
      handleMutationError(error);
    },
    onSuccess: () => handleMutationSuccess(`Draft updated successfully!`),
  });

  const mutationDelete = useMutation({
    mutationFn: (id: number) => deleteData('manUrl', { id }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['drafts'] });
      const previousData = queryClient.getQueryData<draftType[]>(['drafts']);
      queryClient.setQueryData(['drafts'], (old: draftType[] = []) => old.filter((item) => item.id !== id));
      return { previousData };
    },
    onError: (error, id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['drafts'], context.previousData);
      }
      handleMutationError(error);
    },
    onSuccess: () => handleMutationSuccess(`Draft deleted successfully!`),
  });

  const renderItems = () => {
    const rows = [];

    data?.forEach((item, index) => {
      rows.unshift(
        <InputDraft
          key={index}
          item={item as unknown as Partial<draftType>}
          options={options}
          onSave={(updatedItem: draftType) => mutationUpdate.mutate(updatedItem)}
          onDelete={(id: number) => mutationDelete.mutate(id)}
          onCancel={() => setIsAdding(false)}
        />,
      );
    });

    if (isAdding) {
      rows.unshift(
        <InputDraft
          key="new"
          item={{ title: '', description: '', draftSections: {} } as draftType}
          options={options}
          onSave={(newItem: draftType) => mutationCreate.mutate(newItem)}
          onCancel={() => setIsAdding(false)}
        />,
      );
    }

    if (isLoading || isLoadingOptions) {
      rows.unshift(<div>Loading...</div>);
    }

    if (isError || isErrorOptions) {
      rows.unshift(<div>Error loading drafts</div>);
    }
    return rows;
  };

  return (
    <div className="section-builder">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Drafts</h2>
        <button onClick={() => setIsAdding(true)}>Add New Draft</button>
      </div>

      {data == undefined || options == undefined ? <div>Loading...</div> : renderItems()}

      <ToastContainer />
    </div>
  );
};

export default DraftBuilder;
