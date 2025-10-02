import { produce } from 'immer';
import { useGlobalStore } from '../../store';
import type { Store } from '../../types';
import type { UnmatchedEvent } from './types';

export const updateUnmatchedEvents = (events: UnmatchedEvent[]) => {
  useGlobalStore.setState((store: Store) => {
    return produce(store, (draft) => {
      draft.rateCalculatorStore.unmatchedEvents = events;
    });
  });
};
