import { create } from 'zustand';
import { draftType } from '../components/types';

type StoreState = {
  drafts: draftType[];
};

type StoreActions = {
  updateDrafts: (drafts: draftType[]) => void;
};

const useDraftsStore = create<StoreState & StoreActions>((set) => {
  const storedDrafts = localStorage.getItem('drafts');
  const initialDrafts = storedDrafts ? JSON.parse(storedDrafts) : [];

  return {
    drafts: initialDrafts,
    updateDrafts: (drafts: draftType[]) => {
      set({ drafts });
      localStorage.setItem('drafts', JSON.stringify(drafts));
    },
  };
});

export default useDraftsStore;
