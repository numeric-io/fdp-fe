import { SAMPLE_CONTRACTS } from '@/lib/store/stores/rateCalculator/mockData';
import { useState } from 'react';
import { ContractSelect } from './ContractSelect';
import { RateRulesGrid } from './RateRulesGrid';
import { SKUSelect } from './SKUSelect';

export const RateCalculator = () => {
  const [selectedContractID, setSelectedContractID] = useState(
    SAMPLE_CONTRACTS[0].id,
  );
  const [selectedSKUID, setSelectedSKUID] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex-shrink-0">
        <div className="flex gap-2">
          <ContractSelect
            selectedContractID={selectedContractID}
            setSelectedContractID={setSelectedContractID}
          />
          <SKUSelect
            selectedContractID={selectedContractID}
            selectedSKUID={selectedSKUID}
            setSelectedSKUID={setSelectedSKUID}
          />
        </div>
      </div>
      <div className="flex-1">
        <RateRulesGrid contractID={selectedContractID} skuID={selectedSKUID} />
      </div>
    </div>
  );
};

export default RateCalculator;
