import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../command'
import { Input, InputProps } from '../input'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'

export interface AutocompleteInputProps extends InputProps {
  value: string
  options: string[]
  onSelectOption: (option: string) => void
  /**
   * Default to case-insensitive string comparison.
   */
  filterFn?: (option: string, inputValue: string) => boolean
}
export const AutocompleteInput = ({ options, onSelectOption, className, ...props }: AutocompleteInputProps) => {
  const [open, setOpen] = useState(false)
  const [focusedOption, setFocusedOption] = useState<string | null>(null)

  const filterFn = props.filterFn ?? ((option, inputValue) => option.toLowerCase().includes(inputValue.toLowerCase()))

  const onSelect = (option: string) => {
    onSelectOption(option)
    setFocusedOption(null)
    setOpen(false)
  }

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) {
          setFocusedOption(null)
        }
      }}
    >
      <PopoverTrigger asChild>
        <div className={className}>
          <Input
            {...props}
            onChange={(e) => {
              props.onChange?.(e)
              setOpen(true)
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                setFocusedOption((prev) => {
                  const index = prev === null ? -1 : options.indexOf(prev)
                  return options[index + 1] ?? options[0] ?? null
                })
                e.preventDefault()
              } else if (e.key === 'ArrowUp') {
                setFocusedOption((prev) => {
                  const index = prev === null ? -1 : options.indexOf(prev)
                  return options[index - 1] ?? options[options.length - 1] ?? null
                })
                e.preventDefault()
              } else if (e.key === 'Enter' && focusedOption !== null) {
                onSelect(focusedOption)
                e.preventDefault()
              }
            }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[var(--radix-popover-trigger-width)]"
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <Command value={props.value}>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((opt) => filterFn(opt, props.value))
                .map((opt) => (
                  <CommandItem
                    key={opt}
                    onSelect={() => {
                      onSelect(opt)
                    }}
                    className={cn(focusedOption === opt && 'bg-accent text-accent-foreground')}
                  >
                    {opt}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
