import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Text } from '@/components/ui/numeric-ui/text'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useContract } from '@/lib/store/stores/rateCalculator/getters'
import type { SKU } from '@/lib/store/stores/rateCalculator/types'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface SKUSelectProps {
  contractID: string
  selectedsku: string | null
  onSelectSKU: (sku: string) => void
}

export const SKUSelect = ({ contractID: selectedContractID, selectedsku, onSelectSKU }: SKUSelectProps) => {
  const [open, setOpen] = useState(false)
  const contract = useContract(selectedContractID)
  const skus = contract?.skus
  const selectedSKU = skus?.find((sku) => sku === selectedsku)

  const renderSKUItem = (sku: SKU) => {
    return (
      <CommandItem
        key={sku}
        value={sku}
        onSelect={() => {
          onSelectSKU(sku)
          setOpen(false)
        }}
      >
        <Text>{sku}</Text>
        <Check className={cn('ml-auto', selectedsku === sku ? 'opacity-100' : 'opacity-0')} />
      </CommandItem>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={`w-full justify-between`}>
          {selectedSKU ?? 'Select SKU...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent minWidthMatchTriggerWidth className={`p-1`} align="end">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No SKU found.</CommandEmpty>
            <CommandGroup>{skus?.map(renderSKUItem)}</CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
