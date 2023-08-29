import { create } from 'zustand';
import { produce } from 'immer';
import { SectionListType } from '../components/SectionList';
import { SectionType } from '../components/SectionList';

const saveTodos = (sections: SectionListType) => {
  localStorage.setItem('sections', JSON.stringify(sections));
};

const loadSections = (): SectionListType | [] => {
  const sections = localStorage.getItem('sections');
  console.log('loaded sections: ', sections);

  if (sections !== null) {
    const parsedTodos = JSON.parse(sections);
    return parsedTodos;
  } else {
    return [];
  }
};

type StoreType = {
  sections: SectionListType | null;
  //   setTodos: (sections: SectionListType | null) => void;
  addSection: (todoTitle: string) => void;
  toggleSection: (id: number) => void;
  deleteSection: (id: number) => void;
  updateSection: (id: number, title: string) => void;
};

type State = {
  sections: SectionListType | [];
};

type Action = {
  addSection: (section: SectionType) => void;
  toggleSection: (id: number) => void;
  deleteSection: (id: number) => void;
  updateSection: (id: number, title: string) => void;
};

// const initialState: State = {
//   sections: loadSections(),
// };

const useStore = create<State & Action>()((set) => ({
  // ...initialState, // set the initial state
  sections: [],
  addSection: (section) =>
    set(
      produce((draft) => {
        draft.sections?.push(section);
        saveTodos(draft.sections);
      }),
    ),
  toggleSection: (id) =>
    set(
      produce((draft) => {
        let indexOf = -1;
        for (let i = 0; i < draft.sections.length; i++) {
          if (draft.sections[i].id === id) {
            indexOf = i;
          }
        }
        draft.sections[indexOf].status = !draft.sections[indexOf].status;
        saveTodos(draft.sections);
      }),
    ),
  deleteSection: (id) =>
    set(
      produce((draft) => {
        const filteredTodos = draft.sections.filter((section: SectionType) => section.id !== id);
        draft.sections = filteredTodos;
        saveTodos(draft.sections);
      }),
    ),
  updateSection: (id, title) =>
    set(
      produce((draft) => {
        let indexOf = -1;
        for (let i = 0; i < draft.sections.length; i++) {
          if (draft.sections[i].id === id) {
            indexOf = i;
          }
        }
        draft.sections[indexOf].title = title;
        saveTodos(draft.sections);
      }),
    ),
}));

useStore.setState(() => ({ sections: loadSections() }));

export default useStore;
