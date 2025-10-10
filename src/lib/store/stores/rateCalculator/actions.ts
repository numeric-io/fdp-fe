import { produce } from 'immer';
import { useGlobalStore } from '../../store';
import type { Store } from '../../types';
import type { Events } from './types';

export const updateEvents = (events: Events[]) => {
  useGlobalStore.setState((store: Store) => {
    return produce(store, (draft) => {
      draft.rateCalculatorStore.events = events;
    });
  });
};
