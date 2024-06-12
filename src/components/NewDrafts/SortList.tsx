import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Label } from '@sb1/ffe-form-react';
import useDraftsStore from '~/store/useDraftStore';

type listItemType = {
  id: string;
  title: string;
};
export default function SortList({ heading, listItems }: { heading: string; listItems: listItemType[] }) {
  const [list, setList] = useState<listItemType[]>([]);

  useEffect(() => {
    setList(listItems);
  }, [listItems]);

  return (
    <div>
      <Label className="ffe-form-label" htmlFor="account-selector-multi" style={{ color: 'white' }}>
        Selected Items
      </Label>
      <ReactSortable
        list={list}
        setList={setList}
        style={{ width: '100%', backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '0.5rem' }}
      >
        {list.map((item, index) => (
          <div
            style={{
              padding: '0.5rem',
              border: '1px solid #ccc',
              marginBottom: '0.5rem',
              cursor: 'move',
              color: 'black',
            }}
            key={item.id}
          >
            {index + 1}. {item.title}
          </div>
        ))}
      </ReactSortable>
    </div>
  );
}
