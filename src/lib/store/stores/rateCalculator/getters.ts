import { createSelector } from '../../createSelector';
import type { Store } from '../../types';

export const getUnmatchedEvents = (store: Store) =>
  store.rateCalculatorStore.unmatchedEvents;
export const useUnmatchedEvents = createSelector(getUnmatchedEvents);
