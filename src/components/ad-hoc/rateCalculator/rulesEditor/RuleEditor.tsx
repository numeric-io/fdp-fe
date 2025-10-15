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
  Rate,
} from '@/lib/store/stores/rateCalculator/types'
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
        onUpdateRule({ ...rule, rate: { t: 'number', val: value === RuleBodyTab.Include ? '' : '0' } })
      }}
    >
      <TabsList>
        <TabsTrigger value={RuleBodyTab.Include}>Include</TabsTrigger>
        <TabsTrigger value={RuleBodyTab.Exclude}>Exclude</TabsTrigger>
      </TabsList>

      <TabsContent value={RuleBodyTab.Include}>
        <div className="flex flex-col gap-2">
          <RateEditor rate={rule.rate} onChange={(rate) => onUpdateRule({ ...rule, rate })} />
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
          setConditions([...conditions, { op: 'eq', field: '', value: '', type: 'string' }])
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

const OperatorLabelMap = {
  eq: '=',
  neq: '≠',
  gt: '>',
  gte: '≥',
  lt: '<',
  lte: '≤',
  nullish: 'is empty',
}

const ConditionItem = ({ condition, keyOptions, onUpdate, onDelete }: ConditionItemProps) => {
  return (
    <div className="flex gap-2 bg-gray-50 p-1 rounded-md">
      <div className="flex flex-row gap-2 flex-wrap flex-1 ">
        <AutocompleteInput
          className="w-3/5"
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
          onValueChange={(newOp) => {
            const value = condition.op === 'nullish' ? '' : condition.value
            if (newOp === 'eq' || newOp === 'neq') {
              onUpdate({ ...condition, op: newOp, type: 'string', value })
            } else if (newOp === 'gt' || newOp === 'gte' || newOp === 'lt' || newOp === 'lte') {
              onUpdate({ ...condition, op: newOp, type: 'number', value })
            } else if (newOp === 'nullish') {
              onUpdate({ ...condition, op: newOp })
            } else {
              return
            }
          }}
        >
          <SelectTrigger className="w-1/3">
            <SelectValue>{OperatorLabelMap[condition.op] ?? condition.op}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'eq'}>{OperatorLabelMap.eq}</SelectItem>
            <SelectItem value={'neq'}>{OperatorLabelMap.neq}</SelectItem>
            <SelectItem value={'gt'}>{OperatorLabelMap.gt}</SelectItem>
            <SelectItem value={'gte'}>{OperatorLabelMap.gte}</SelectItem>
            <SelectItem value={'lt'}>{OperatorLabelMap.lt}</SelectItem>
            <SelectItem value={'lte'}>{OperatorLabelMap.lte}</SelectItem>
            <SelectItem value={'nullish'}>{OperatorLabelMap.nullish}</SelectItem>
          </SelectContent>
        </Select>
        {condition.op !== 'nullish' && (
          <Input
            className="w-full"
            value={condition.value}
            onChange={(e) => {
              onUpdate({ ...condition, value: e.target.value })
            }}
          />
        )}
      </div>
      <Button variant="ghost" size="sm" className="flex-shrink-0" onClick={onDelete}>
        X
      </Button>
    </div>
  )
}

const RateEditor = ({ rate, onChange }: { rate: Rate; onChange: (value: Rate) => void }) => {
  const inputType = rate.t === 'number' ? 'number' : 'text'
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Label>Rate Type:</Label>
        <RadioGroup
          defaultValue={'number'}
          value={rate.t}
          className="flex"
          onValueChange={(value) => {
            if (value !== 'number' && value !== 'expression') return

            onChange(value === 'number' ? { t: 'number', val: rate.val } : { t: 'expression', val: rate.val })
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={'number'} id={'number'} />
            <Label htmlFor={'number'}>Flat Rate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={'expression'} id={'expression'} />
            <Label htmlFor={'expression'}>Rate Expression</Label>
          </div>
        </RadioGroup>
      </div>

      <Input value={rate.val} onChange={(e) => onChange({ ...rate, val: e.target.value })} type={inputType} />
    </div>
  )
}
