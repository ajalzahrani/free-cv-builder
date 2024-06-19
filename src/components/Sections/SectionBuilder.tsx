import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PassableInputComponentType, sectionType } from '~/components/Types';
import { deleteData, fetchData, postData, updateData } from '../../api/api-sections';

const SectionBuilder: React.FC<PassableInputComponentType> = ({ title, getUrl, manUrl, InputComponent }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [title.toLowerCase()],
    queryFn: () => fetchData(getUrl),
    staleTime: 60000,
  });

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleMutationSuccess = (message: string) => {
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: [title.toLowerCase()] });
    setIsAdding(false);
  };

  const handleMutationError = (error: any) => {
    toast.error(error.response.data.error.message, { position: 'top-left' });
    console.error(error.response.data.error);
  };

  const mutationCreate = useMutation({
    mutationFn: (newItem: Omit<sectionType, 'id'>) => postData(manUrl, newItem),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: [title.toLowerCase()] });
      const previousData = queryClient.getQueryData<sectionType[]>([title.toLowerCase()]);
      queryClient.setQueryData([title.toLowerCase()], (old: sectionType[] = []) => [...old, { ...newItem }]);
      return { previousData };
    },
    onError: (error, newItem, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([title.toLowerCase()], context.previousData);
      }
      handleMutationError(error);
    },
    onSuccess: () => handleMutationSuccess(`${title} created successfully!`),
  });

  const mutationUpdate = useMutation({
    mutationFn: (updatedItem: sectionType) => updateData(manUrl, updatedItem),
    onMutate: async (updatedItem) => {
      await queryClient.cancelQueries({ queryKey: [title.toLowerCase()] });
      const previousData = queryClient.getQueryData<sectionType[]>([title.toLowerCase()]);
      queryClient.setQueryData([title.toLowerCase()], (old: sectionType[] = []) =>
        old.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
      );
      return { previousData };
    },
    onError: (error, updatedItem, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([title.toLowerCase()], context.previousData);
      }
      handleMutationError(error);
    },
    onSuccess: () => handleMutationSuccess(`${title} updated successfully!`),
  });

  const mutationDelete = useMutation({
    mutationFn: (id: number) => deleteData(manUrl, { id }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [title.toLowerCase()] });
      const previousData = queryClient.getQueryData<sectionType[]>([title.toLowerCase()]);
      queryClient.setQueryData([title.toLowerCase()], (old: sectionType[] = []) =>
        old.filter((item) => item.id !== id),
      );
      return { previousData };
    },
    onError: (error, id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([title.toLowerCase()], context.previousData);
      }
      handleMutationError(error);
    },
    onSuccess: () => handleMutationSuccess(`${title} deleted successfully!`),
  });

  const renderItems = () => {
    const rows = [];
    data?.forEach((item, index) => {
      rows.unshift(
        <InputComponent
          key={index}
          item={item as unknown as Partial<sectionType>}
          onSave={(updatedItem: sectionType) => mutationUpdate.mutate(updatedItem)}
          onDelete={(id: number) => mutationDelete.mutate(id)}
          onCancel={() => setIsAdding(false)}
        />,
      );
    });

    if (isAdding) {
      rows.unshift(
        <InputComponent
          key="new"
          item={{ name: '', title: '', pitch: '' } as sectionType}
          onSave={(newItem: sectionType) => mutationCreate.mutate(newItem)}
          onCancel={() => setIsAdding(false)}
        />,
      );
    }

    if (isLoading) {
      rows.unshift(<div>Loading...</div>);
    }

    if (isError) {
      rows.unshift(<div>Error loading {title}</div>);
    }
    return rows;
  };

  return (
    <div className="section-builder">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{title}</h2>
        <button onClick={() => setIsAdding(true)}>Add {title}</button>
      </div>

      {renderItems()}

      <ToastContainer />
    </div>
  );
};

export default SectionBuilder;
