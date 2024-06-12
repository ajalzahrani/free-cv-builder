import '../../styles/ffe.css';
import { useEffect, useState } from 'react';
import { AccountSelectorMulti } from '@sb1/ffe-account-selector-react';
import { Label } from '@sb1/ffe-form-react';
import SortList from './SortList';
import useDraftStore from '../../store/useDraftStore';
import { draftSectionsType } from '../Types';

type prop = {
  accountNumber: string;
  name: string;
};
type Props = {
  draftId: string;
  preSelectedSectionElements: string[];
  heading: string;
  sectionElements: prop[];
};

export default function SelectorMulti({ draftId, preSelectedSectionElements, heading, sectionElements }: Props) {
  const [value, setValue] = useState<string>();
  const [selectedAccounts, setSelectedAccounts] = useState<any[]>([]);
  const { addDraftSectionElement3, removeDraftSectionElement } = useDraftStore();

  useEffect(() => {
    // console.log(preSelectedSectionElements);
    // preSelectedSectionElements contains the account numbers, get the account names from sectionElements
    const filteredAccounts = sectionElements.filter((acc) => preSelectedSectionElements.includes(acc.accountNumber));
    setSelectedAccounts(filteredAccounts);
  }, []);

  const onAccountSelected = (acc: any) => {
    const filteredAccounts = selectedAccounts.filter((a) => a.accountNumber !== acc.accountNumber);

    const accountAlreadySelectedAndShouldBeRemoved = filteredAccounts.length !== selectedAccounts.length;

    if (accountAlreadySelectedAndShouldBeRemoved) {
      setSelectedAccounts(filteredAccounts);
      removeDraftSectionElement(draftId, heading.toLowerCase().substring(0, heading.length - 1), acc.accountNumber);
    } else {
      setSelectedAccounts([...selectedAccounts, acc]);
      addDraftSectionElement3(draftId, heading.toLowerCase().substring(0, heading.length - 1), acc.accountNumber);
    }
  };

  const onBlur = () => {
    setValue(selectedAccounts.map((acc: any) => acc.name).join(', '));
  };

  const onFocus = () => {
    setValue('');
  };

  const onSelectAll = () => {
    selectedAccounts.length === accounts.length ? setSelectedAccounts([]) : setSelectedAccounts(accounts);
  };

  const onReset = () => {
    setValue('');
    setSelectedAccounts([]);
  };
  return (
    <div className="draft-card">
      <Label className="ffe-form-label" htmlFor="account-selector-multi" style={{ color: 'white' }}>
        {heading}
      </Label>
      <AccountSelectorMulti
        id="account-selector-multi"
        locale="nb"
        accounts={sectionElements}
        onAccountSelected={onAccountSelected}
        selectedAccounts={selectedAccounts}
        value={value}
        onChange={(val) => setValue(val)}
        showSelectAllOption={true}
        onSelectAll={onSelectAll}
        onBlur={onBlur}
        onFocus={onFocus}
        onReset={onReset}
      />

      {selectedAccounts.length > 0 && (
        <SortList
          heading={heading}
          listItems={selectedAccounts.map((acc: any) => ({ id: acc.accountNumber, title: acc.name }))}
        />
      )}
    </div>
  );
}
