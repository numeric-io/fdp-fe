import { Button } from '@/components/ui/button'
import { useKeyOptionsByContractID } from '@/lib/store/stores/rateCalculator/memoSelectors'
import { generateShortUID } from '@/lib/utils'
import { APIRule, ComparisonType, Operator, RateType } from '@numeric-io/fdp-api'
import { useState } from 'react'
import { RuleEditor } from './RuleEditor'

interface RulesListProps {
  contractID: string
  sku: string | null
  rules: APIRule[]
  updateRules: (rules: APIRule[]) => void
}

export const RulesList = ({ contractID, sku, rules, updateRules }: RulesListProps) => {
  const keyOptions = useKeyOptionsByContractID(contractID)
  const [expandedRuleIndices, setExpandedRuleIndices] = useState<number[]>([])
  if (!sku) {
    return null
  }
  return (
    <div className="h-full flex flex-col gap-2 overflow-auto">
      {rules.map((rule, index) => (
        <RuleEditor
          key={index}
          rule={rule}
          isExpanded={expandedRuleIndices.includes(index)}
          keyOptions={keyOptions}
          onClick={() =>
            setExpandedRuleIndices((prev) =>
              prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
            )
          }
          onDeleteRule={() => updateRules(rules.filter((r, i) => i !== index))}
          onUpdateRule={(rule) => updateRules(rules.map((r, i) => (i === index ? rule : r)))}
        />
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const maxPriority = rules.length ? Math.max(...rules.map((rule) => rule.priority)) : 0
          const newRule = createDefaultRule({
            priority: maxPriority + 1,
          })

          updateRules([...rules, newRule])
          setExpandedRuleIndices((prev) => [...prev, rules.length]) // Expand the new rule by default
        }}
      >
        + Add Rule
      </Button>
    </div>
  )
}

const createDefaultRule = ({ priority }: { priority: number }): APIRule => {
  const randomUID = generateShortUID(4)
  return {
    name: `Rule ${randomUID}`,
    priority,
    andExpression: {
      op: Operator.And,
      conditions: [
        {
          op: Operator.Equal,
          field: '',
          value: '',
          type: ComparisonType.String,
        },
      ],
    },
    rate: {
      t: RateType.Number,
      val: '0',
    },
  }
}
