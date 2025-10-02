import { Search } from 'lucide-react';
import { Input } from '../input';

export interface SearchFieldProps {
  query: string;
  setQuery: (query: string) => void;
}

export const SearchField = ({ query, setQuery }: SearchFieldProps) => {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 pr-9"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          X
        </button>
      )}
    </div>
  );
};
