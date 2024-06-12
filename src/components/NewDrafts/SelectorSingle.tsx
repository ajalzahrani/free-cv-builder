import '../../styles/ffe.css';
import { useEffect, useState } from 'react';
import { Label } from '@sb1/ffe-form-react';
import { AccountSelector } from '@sb1/ffe-account-selector-react';
import useDraftStore from '../../store/useDraftStore';

type Props = {
  draftId: string;
  preSelectedSectionElement: string;
  heading: string;
  sectionElements: {
    accountNumber: string;
    name: string;
  }[];
};

export default function SelectorSingle({ draftId, preSelectedSectionElement, heading, sectionElements }: Props) {
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const { addDraftSectionElement4 } = useDraftStore();

  useEffect(() => {
    const elementId = parseInt(preSelectedSectionElement, 10);
    if (elementId > 0 && elementId <= sectionElements.length) {
      setSelectedAccount(sectionElements[elementId - 1].name);
    } else {
      setSelectedAccount('');
    }
  }, []);

  const handleAccountSelected = (acc: { accountNumber: string; name: string }) => {
    addDraftSectionElement4(draftId, heading.toLowerCase().substring(0, heading.length - 1), acc.accountNumber);
    setSelectedAccount(acc.name);
  };

  return (
    <div className="draft-card">
      <Label className="ffe-form-label" htmlFor="account-selector-single" style={{ color: 'white' }}>
        {heading}
      </Label>

      <AccountSelector
        id="account-selector-single"
        locale="nb"
        accounts={sectionElements}
        labelledById="label1"
        onAccountSelected={handleAccountSelected}
        onReset={() => setSelectedAccount('')}
        selectedAccount={selectedAccount}
      />

      {selectedAccount && (
        <div>
          <Label className="ffe-form-label" htmlFor="account-selector-single" style={{ color: 'white' }}>
            Selected Account
          </Label>
          <p>{selectedAccount}</p>
        </div>
      )}
    </div>
  );
}
