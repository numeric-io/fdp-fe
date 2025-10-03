import { SAMPLE_CONTRACTS } from '@/lib/store/stores/rateCalculator/mockData';
import { useState } from 'react';
import { RateRulesGrid } from './RateRulesGrid';

export const RateCalculator = () => {
  const [selectedContractID, _setSelectedContractID] = useState(
    SAMPLE_CONTRACTS[0].id,
  );

  return (
    <div className="h-full flex flex-col gap-2">
      {/* TODO: Add a dropdown to select the contract */}
      <div className="flex-shrink-0">Dropdown</div>
      <div className="flex-1">
        <RateRulesGrid contractID={selectedContractID} />
      </div>
    </div>
  );
};

export default RateCalculator;
