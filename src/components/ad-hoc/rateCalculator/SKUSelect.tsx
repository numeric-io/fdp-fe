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
import type { SKU } from '@/lib/store/stores/rateCalculator/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SKUSelectProps {
  selectedContractID: string;
  selectedSKUID: string | null;
  setSelectedSKUID: (skuID: string | null) => void;
}

export const SKUSelect = ({
  selectedContractID,
  selectedSKUID,
  setSelectedSKUID,
}: SKUSelectProps) => {
  const [open, setOpen] = useState(false);
  const contract = useContract(selectedContractID);
  const skus = contract?.skus;
  const selectedSKU = skus?.find((sku) => sku.id === selectedSKUID);

  const renderSKUItem = (sku: SKU) => {
    return (
      <CommandItem
        key={sku.id}
        value={sku.id}
        onSelect={() =>
          setSelectedSKUID(sku.id === selectedSKUID ? null : sku.id)
        }
      >
        {sku.name}
        <Check
          className={cn(
            'ml-auto',
            selectedSKUID === sku.id ? 'opacity-100' : 'opacity-0',
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
          className="w-sm justify-between"
        >
          {selectedSKU?.name ?? 'Select SKU...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-sm p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No SKU found.</CommandEmpty>
            <CommandGroup>{skus?.map(renderSKUItem)}</CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
