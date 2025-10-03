import { SAMPLE_CONTRACTS } from '@/lib/store/stores/rateCalculator/mockData';
import { useState } from 'react';
import { ContractSelect } from './ContractSelect';
import { RateRulesGrid } from './RateRulesGrid';

export const RateCalculator = () => {
  const [selectedContractID, setSelectedContractID] = useState(
    SAMPLE_CONTRACTS[0].id,
  );

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex-shrink-0">
        <ContractSelect
          selectedContractID={selectedContractID}
          setSelectedContractID={setSelectedContractID}
        />
      </div>
      <div className="flex-1">
        <RateRulesGrid contractID={selectedContractID} />
      </div>
    </div>
  );
};

export default RateCalculator;
