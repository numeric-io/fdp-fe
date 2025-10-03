import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useContract } from '@/lib/store/stores/rateCalculator/getters';
import { useContractGroupedByUnmatchedEvents } from '@/lib/store/stores/rateCalculator/memoSelectors';
import type { Contract } from '@/lib/store/stores/rateCalculator/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ContractSelectProps {
  selectedContractID: string;
  setSelectedContractID: (contractID: string) => void;
}

export const ContractSelect = ({
  selectedContractID,
  setSelectedContractID,
}: ContractSelectProps) => {
  const [open, setOpen] = useState(false);
  const contract = useContract(selectedContractID);
  const { contractsWithUnmatchedEvents, contractsWithoutUnmatchedEvents } =
    useContractGroupedByUnmatchedEvents();

  const renderContractItem = (contract: Contract) => {
    return (
      <CommandItem
        key={contract.id}
        value={contract.id}
        onSelect={() => setSelectedContractID(contract.id)}
      >
        {contract.name}
        <Check
          className={cn(
            'ml-auto',
            selectedContractID === contract.id ? 'opacity-100' : 'opacity-0',
          )}
        />
      </CommandItem>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-md justify-between"
        >
          {contract?.name ?? 'Select contract...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-md p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No contract found.</CommandEmpty>
            <CommandGroup heading="Contracts with unmatched events">
              {contractsWithUnmatchedEvents.map(renderContractItem)}
            </CommandGroup>
            <CommandGroup heading="Contracts without unmatched events">
              {contractsWithoutUnmatchedEvents.map(renderContractItem)}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
