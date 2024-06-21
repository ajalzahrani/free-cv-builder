import { create } from 'zustand';
import { draftType, draftSectionsType } from '../components/Types';

type StoreState = {
  drafts: draftType[];
};

type StoreActions = {
  saveDrafts: () => void;
  addDraft: (newDraft: draftType) => void;
  updateDraftTitle: (draftId: number, title: string) => void;
  updateDraftDescription: (draftId: number, description: string) => void;
  addDraftSectionElement3: (draftId: number, section: string, draftSectionElementId: string) => void;
  addDraftSectionElement4: (draftId: number, section: string, draftSectionElementId: string) => void;
  removeDraftSectionElement: (draftId: number, section: string, draftSectionElementId: string) => void;
  deleteDraft: (id: string) => void;
};

const useDraftsStore = create<StoreState & StoreActions>((set, get) => {
  const storedDrafts = localStorage.getItem('drafts');
  const initialDrafts = storedDrafts ? JSON.parse(storedDrafts) : [];

  return {
    drafts: initialDrafts,
    saveDrafts: () => {
      // get drafts and update local storage
      const drafts = get().drafts;
      localStorage.setItem('drafts', JSON.stringify(drafts));
    },
    addDraft: (newDraft: draftType) => {
      set((state) => ({
        drafts: [...state.drafts, newDraft],
      }));
    },
    updateDraftTitle: (draftId: number, title: string) => {
      set((state) => {
        const updatedDrafts = state.drafts.map((draft) => {
          if (draft.id === draftId) {
            return { ...draft, title };
          }
          return draft;
        });
        return {
          drafts: updatedDrafts,
        };
      });
    },
    updateDraftDescription: (draftId: number, description: string) => {
      set((state) => {
        const updatedDrafts = state.drafts.map((draft) => {
          if (draft.id === draftId) {
            return { ...draft, description };
          }
          return draft;
        });
        return {
          drafts: updatedDrafts,
        };
      });
    },
    addDraftSectionElement3: (draftId: number, section: keyof draftSectionsType, draftSectionElementId: string) => {
      console.log('draftId: ', draftId, ',section: ', section, ',draftSectionElementId: ', draftSectionElementId);
      set((state) => {
        const updatedDrafts = state.drafts.map((draft: draftType) => {
          if (draft.id === draftId) {
            const updatedDraftSections: draftSectionsType = {
              ...draft.draftSections,
            };

            console.log('updatedDraftSections[section]: ', updatedDraftSections[section]);

            // Check if the section exists in draftSections
            if (updatedDraftSections[section]) {
              // Make sure to handle the case where section is an array
              if (Array.isArray(updatedDraftSections[section])) {
                updatedDraftSections[section].push(draftSectionElementId);
              } else {
                console.log('section is not an array');
                // If section is not an array, convert it to one
                (updatedDraftSections[section] = updatedDraftSections[section]), draftSectionElementId;
              }
            } else {
              console.log('section does not exist');
              // If the section doesn't exist, create a new array with the draftSectionElementId
              updatedDraftSections[section] = [draftSectionElementId];
            }

            return {
              ...draft,
              draftSections: updatedDraftSections,
            };
          }

          return draft;
        });

        return {
          drafts: updatedDrafts,
        };
      });
    },
    addDraftSectionElement4: (draftId: number, section: string, draftSectionElementId: string) => {
      console.log('draftId: ', draftId, ', section: ', section, ', draftSectionElementId: ', draftSectionElementId);

      set((state) => {
        const updatedDrafts = state.drafts.map((draft: draftType) => {
          if (draft.id === draftId) {
            // Initialize updatedDraftSections with a shallow copy of draft.draftSections or an empty object if it's null or undefined
            const updatedDraftSections: draftSectionsType = { ...(draft.draftSections || {}) };

            console.log('existing draftSections: ', JSON.stringify(updatedDraftSections));
            console.log('existing section value: ', updatedDraftSections[section]);

            // Check if the section is 'header' or 'contact'
            if (section === 'header' || section === 'contact') {
              // Directly update the section value as a string
              updatedDraftSections[section] = draftSectionElementId;
            } else {
              // Handle other sections which are arrays
              if (updatedDraftSections[section] !== undefined) {
                if (Array.isArray(updatedDraftSections[section])) {
                  updatedDraftSections[section].push(draftSectionElementId);
                } else {
                  console.log('section is not an array');
                  updatedDraftSections[section] = [updatedDraftSections[section], draftSectionElementId];
                }
              } else {
                console.log('section does not exist');
                updatedDraftSections[section] = [draftSectionElementId];
              }
            }

            console.log('updated draftSections: ', JSON.stringify(updatedDraftSections));

            return {
              ...draft,
              draftSections: updatedDraftSections,
            };
          }

          return draft;
        });

        return {
          drafts: updatedDrafts,
        };
      });
    },

    removeDraftSectionElement: (draftId: number, section: keyof draftSectionsType, draftSectionElementId: string) => {
      set((state) => {
        const updatedDrafts = state.drafts.map((draft: draftType) => {
          if (draft.id === draftId) {
            const updatedDraftSections: draftSectionsType = {
              ...draft.draftSections,
            };

            // Check if the section exists in draftSections
            if (updatedDraftSections[section]) {
              // Remove the draftSectionElementId if it exists in the section
              updatedDraftSections[section] = updatedDraftSections[section].filter(
                (id: string) => id !== draftSectionElementId,
              );
            }

            return {
              ...draft,
              draftSections: updatedDraftSections,
            };
          }

          return draft;
        });

        return {
          drafts: updatedDrafts,
        };
      });
    },
    deleteDraft: (id: number) => {
      set((state) => ({
        drafts: state.drafts.filter((d) => d.id !== id),
      }));
    },
  };
});

export default useDraftsStore;
