import React, { useState, useMemo } from 'react';
import { Accordion, AccordionItem } from '@sb1/ffe-accordion-react';
import { AccountSelectorMulti } from '@sb1/ffe-account-selector-react';
import useStore from '../../store/RepoLocalStorage';
import SelectorMulti from './SelectorMulti';
import { sectionType } from '../Types';

interface PartialSectionType {
  id: string;
  title: string;
}
export default function SectionsAccordion({ heading, section }: { heading: string; section: sectionType[] }) {
  const [openElementId, setOpenElementId] = useState(0);
  const [selectedAccounts, setSelectedAccounts] = useState<any[]>([]);
  const store = useStore();

  const sectionAccount = useMemo(
    () =>
      section.map((item: any) => ({
        accountNumber: item.id,
        name: item.title,
      })),
    [],
  );

  const createOnToggleOpenHandler = (id: number) => (isOpen: boolean) => {
    if (isOpen) {
      setOpenElementId(id);
    }
  };
  return (
    <Accordion headingLevel={6}>
      <AccordionItem
        onToggleOpen={createOnToggleOpenHandler(0)}
        // defaultOpen={section.title == 'Headers'}
        heading={heading}
      >
        <SelectorMulti heading={heading} sectionElements={sectionAccount} />
      </AccordionItem>
    </Accordion>
  );
}
