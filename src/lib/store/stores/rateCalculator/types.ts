import { APIBillingRecord, APIContract, APIRule } from '@numeric-io/fdp-api'

export type Events = APIBillingRecord
export type Contract = APIContract
export type Rate = APIRule['rate']
export type ContractRateRuleCondition = APIRule['conditions']['conditions'][number]
export type ContractRateRuleConditions = APIRule['conditions']['conditions']
export type ContractRateRule = APIRule

export type SKU = APIRule['sku']

export interface EditingRules {
  contractID: string
  sku: string
  period: { month: number; year: number }
  rules: ContractRateRule[] | null
}

export interface RateCalculatorStore {
  events: APIBillingRecord[]
  contracts: Contract[]
  rules: ContractRateRule[]
  // Only one set (contractID, sku) of editing rules is stored at a time
  editingRules: EditingRules | null
}

export enum Operator {
  And = 'AND',
  Or = 'OR',
  NotEqual = '!=',
  Equal = '==',
  GreaterThanOrEqual = '>=',
  LessThanOrEqual = '<=',
  GreaterThan = '>',
  LessThan = '<',
}

export interface Condition {
  op: Operator
  field: string
  value: string
}
