import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AutocompleteInput } from '@/components/ui/numeric-ui/autocompleteInput'
import { Label } from '@/components/ui/numeric-ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types'
import { APIRule, apiRuleDefinitionOperator } from '@numeric-io/fdp-api'
import { HTMLInputTypeAttribute, useState } from 'react'
import { RuleHeader } from './RuleHeader'

interface RuleEditorProps {
  rule: ContractRateRule
  isExpanded: boolean
  onClick: () => void
  onUpdateRule: (rule: ContractRateRule) => void
}

enum RuleBodyTab {
  Include = 'include',
  Exclude = 'exclude',
}

export const RuleEditor = ({ rule, isExpanded, onClick, onUpdateRule }: RuleEditorProps) => {
  const matchConditions = (
    <div>
      <Label>Match when</Label>
      <ConditionItems
        conditions={rule.conditions}
        setConditions={(condition) => onUpdateRule({ ...rule, conditions: condition })}
      />
    </div>
  )
  const body = (
    <Tabs
      defaultValue={RuleBodyTab.Include}
      className="h-full w-full p-2"
      onValueChange={(value) => {
        onUpdateRule({ ...rule, rate: value === RuleBodyTab.Include ? '' : '0' })
      }}
    >
      <TabsList>
        <TabsTrigger value={RuleBodyTab.Include}>Include</TabsTrigger>
        <TabsTrigger value={RuleBodyTab.Exclude}>Exclude</TabsTrigger>
      </TabsList>

      <TabsContent value={RuleBodyTab.Include}>
        <div className="flex flex-col gap-2">
          <RateEditor value={rule.rate} onChange={(value) => onUpdateRule({ ...rule, rate: value })} />
          {matchConditions}
        </div>
      </TabsContent>
      <TabsContent value={RuleBodyTab.Exclude}>{matchConditions}</TabsContent>
    </Tabs>
  )
  return (
    <div className="flex flex-col gap-2">
      {/* should match RULE_HEADER_HEIGHT but tailwind doesn't like dynamic classes */}
      <div className={`h-[68px] px-4 flex items-center w-full`}>
        <RuleHeader showPriority rule={rule} isExpanded={isExpanded} onClick={onClick} />
      </div>
      {isExpanded && <div className="flex-1 w-full bg-purple-50">{body}</div>}
    </div>
  )
}

interface ConditionItemsProps {
  conditions: APIRule['conditions']
  setConditions: (condition: APIRule['conditions']) => void
}

const ConditionItems = ({ conditions, setConditions }: ConditionItemsProps) => {
  return (
    <div className="flex flex-col gap-2">
      {conditions.map((condition, index) => {
        return (
          <ConditionItem
            key={index}
            condition={{ ...condition, index }}
            onUpdate={(condition) => {
              setConditions(conditions.map((c, i) => (i === index ? condition : c)))
            }}
            onDelete={() => {
              setConditions(conditions.filter((_, i) => i !== index))
            }}
          />
        )
      })}
      <Button
        variant="outline"
        size="sm"
        className="flex-shrink-0 w-1/3"
        onClick={() => {
          setConditions([...conditions, { key: '', operator: apiRuleDefinitionOperator.Equals, value: '' }])
        }}
      >
        + Add Condition
      </Button>
    </div>
  )
}

interface RuleCondition {
  index: number
  key: string
  operator: apiRuleDefinitionOperator
  value: string
}

interface ConditionItemProps {
  condition: RuleCondition
  onUpdate: (condition: RuleCondition) => void
  onDelete: () => void
}

const ConditionItem = ({ condition, onUpdate, onDelete }: ConditionItemProps) => {
  return (
    <div className="flex gap-2 bg-gray-50 p-1 rounded-md">
      <div className="flex flex-row gap-2 flex-wrap flex-1 ">
        <AutocompleteInput
          className="w-3/4"
          value={condition.key}
          options={['test', 'test2']}
          onSelectOption={(option) => {
            onUpdate({ ...condition, key: option })
          }}
          onChange={(e) => {
            onUpdate({ ...condition, key: e.target.value })
          }}
        />
        {/* TODO: change to a select */}
        <Input
          className="w-1/5"
          value={condition.operator}
          onChange={(e) => {
            if (
              e.target.value === apiRuleDefinitionOperator.Equals ||
              e.target.value === apiRuleDefinitionOperator.NotEquals
            ) {
              onUpdate({ ...condition, operator: e.target.value })
            }
          }}
        />
        <Input
          className="w-full"
          value={condition.value}
          onChange={(e) => {
            onUpdate({ ...condition, value: e.target.value })
          }}
        />
      </div>
      <Button variant="ghost" size="sm" className="flex-shrink-0" onClick={onDelete}>
        X
      </Button>
    </div>
  )
}

enum RateType {
  FlatRate = 'flat-rate',
  RateExpression = 'rate-expression',
}

const RateEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>('number')
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Label>Rate Type:</Label>
        <RadioGroup
          defaultValue={RateType.FlatRate}
          className="flex"
          onValueChange={(value) => setInputType(value === RateType.FlatRate ? 'number' : 'text')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={RateType.FlatRate} id={RateType.FlatRate} />
            <Label htmlFor={RateType.FlatRate}>Flat Rate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={RateType.RateExpression} id={RateType.RateExpression} />
            <Label htmlFor={RateType.RateExpression}>Rate Expression</Label>
          </div>
        </RadioGroup>
      </div>

      <Input value={value} onChange={(e) => onChange(e.target.value)} type={inputType} />
    </div>
  )
}
