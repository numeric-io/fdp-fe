import { clsx, type ClassValue } from 'clsx';
import ShortUniqueId from 'short-unique-id';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function partition<T>(
  array: T[],
  predicate: (item: T) => boolean,
): [T[], T[]] {
  return array.reduce(
    (acc, item) => {
      acc[predicate(item) ? 0 : 1].push(item);
      return acc;
    },
    [[], []] as [T[], T[]],
  );
}

const defaultUniqueIDGenerator = new ShortUniqueId({ length: 7 });

export function generateShortUID(length?: number): string {
  const generator =
    length === undefined
      ? defaultUniqueIDGenerator
      : new ShortUniqueId({ length });
  return generator.randomUUID();
}
