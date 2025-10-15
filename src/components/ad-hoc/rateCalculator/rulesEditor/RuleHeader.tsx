import { Text } from '@/components/ui/numeric-ui/text'
import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export interface RuleHeaderProps {
  showPriority?: boolean
  rule: ContractRateRule
  isExpanded?: boolean
  onClick?: () => void
}

export const RuleHeader = ({ showPriority = false, rule, isExpanded = false, onClick }: RuleHeaderProps) => {
  return (
    <div className={cn('flex', 'w-full', onClick && 'cursor-pointer')} onClick={onClick}>
      <div className="flex gap-4 flex-1">
        {showPriority && <div>{rule.priority}</div>}
        <div className="flex flex-col gap-1">
          <Text>{`Rule-${rule.priority}`}</Text>
          {/* <Text>{`RuleHeader: ${rule.id}`}</Text> */}
          {/* <Text>{`No matches yet`}</Text> */}
        </div>
      </div>
      <ChevronDown className={cn('opacity-50', !onClick && 'text-gray-400', !isExpanded && 'rotate-270')} />
    </div>
  )
}
