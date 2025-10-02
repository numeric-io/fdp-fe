import { useGlobalStore } from './store';
import type { Store } from './types';

export function createSelector<ArgsType extends unknown[], ReturnType>(
  getter: (store: Store, ...args: ArgsType) => ReturnType,
): (...args: ArgsType) => ReturnType {
  return (...args: ArgsType) =>
    useGlobalStore((store: Store) => getter(store, ...args));
}
