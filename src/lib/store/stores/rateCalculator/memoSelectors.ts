import { partition } from '@/lib/utils';
import { useMemo } from 'react';
import { useContracts, useUnmatchedEvents } from './getters';
import type { Contract } from './types';

export const useContractGroupedByUnmatchedEvents = (): {
  contractsWithUnmatchedEvents: Contract[];
  contractsWithoutUnmatchedEvents: Contract[];
} => {
  const unmatchedEvents = useUnmatchedEvents();
  const contracts = useContracts();

  return useMemo(() => {
    const unmatchedEventContractIDs = new Set(
      unmatchedEvents.map((event) => event.contractID),
    );
    const [contractsWithUnmatchedEvents, contractsWithoutUnmatchedEvents] =
      partition(contracts, (contract) =>
        unmatchedEventContractIDs.has(contract.id),
      );
    return { contractsWithUnmatchedEvents, contractsWithoutUnmatchedEvents };
  }, [unmatchedEvents, contracts]);
};
