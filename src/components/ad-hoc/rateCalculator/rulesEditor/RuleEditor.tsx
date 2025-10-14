import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AutocompleteInput } from '@/components/ui/numeric-ui/autocompleteInput'
import { Label } from '@/components/ui/numeric-ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ContractRateRule,
  ContractRateRuleCondition,
  ContractRateRuleConditions,
} from '@/lib/store/stores/rateCalculator/types'
import { ComparisonType, Operator } from '@numeric-io/fdp-api'
import { HTMLInputTypeAttribute, useState } from 'react'
import { RuleHeader } from './RuleHeader'

interface RuleEditorProps {
  rule: ContractRateRule
  isExpanded: boolean
  keyOptions: string[]
  onClick: () => void
  onUpdateRule: (rule: ContractRateRule) => void
}

enum RuleBodyTab {
  Include = 'include',
  Exclude = 'exclude',
}

export const RuleEditor = ({ rule, isExpanded, keyOptions, onClick, onUpdateRule }: RuleEditorProps) => {
  const matchConditions = (
    <div>
      <Label>Match when</Label>
      <ConditionItems
        conditions={rule.conditions.conditions}
        keyOptions={keyOptions}
        setConditions={(conditions) => onUpdateRule({ ...rule, conditions: { ...rule.conditions, conditions } })}
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
  conditions: ContractRateRuleConditions
  keyOptions: string[]
  setConditions: (conditions: ContractRateRuleConditions) => void
}

const ConditionItems = ({ conditions, keyOptions, setConditions }: ConditionItemsProps) => {
  return (
    <div className="flex flex-col gap-2">
      {conditions.map((condition, index) => {
        return (
          <ConditionItem
            key={index}
            keyOptions={keyOptions}
            condition={condition}
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
          setConditions([...conditions, { op: Operator.Equal, field: '', value: '', type: ComparisonType.String }])
        }}
      >
        + Add Condition
      </Button>
    </div>
  )
}

interface ConditionItemProps {
  condition: ContractRateRuleCondition
  keyOptions: string[]
  onUpdate: (condition: ContractRateRuleCondition) => void
  onDelete: () => void
}

const ConditionItem = ({ condition, keyOptions, onUpdate, onDelete }: ConditionItemProps) => {
  if (condition.op === Operator.Nullish) {
    console.error('Not implemented: Nullish condition')
    return null
  }
  return (
    <div className="flex gap-2 bg-gray-50 p-1 rounded-md">
      <div className="flex flex-row gap-2 flex-wrap flex-1 ">
        <AutocompleteInput
          className="w-3/4"
          value={condition.field}
          options={keyOptions}
          onSelectOption={(option) => {
            onUpdate({ ...condition, field: option })
          }}
          onChange={(e) => {
            onUpdate({ ...condition, field: e.target.value })
          }}
        />
        <Select
          value={condition.op}
          onValueChange={(value) => {
            if (value === Operator.Equal || value === Operator.NotEqual) {
              onUpdate({ ...condition, op: value, type: condition.type })
            }
          }}
        >
          <SelectTrigger className="w-1/5">
            <SelectValue>{condition.op}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Operator.Equal}>{Operator.Equal}</SelectItem>
            <SelectItem value={Operator.NotEqual}>{Operator.NotEqual}</SelectItem>
          </SelectContent>
        </Select>

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
