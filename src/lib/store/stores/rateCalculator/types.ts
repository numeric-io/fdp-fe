import { APIBillingRecord, APIContract, APIRule } from '@numeric-io/fdp-api'

export type Events = APIBillingRecord
export type Contract = APIContract
export type ContractRateRule = APIRule
export type SKU = APIRule['sku']

export interface EditingRules {
  contractID: string
  skuID: string
  rules: ContractRateRule[]
}

export interface RateCalculatorStore {
  events: APIBillingRecord[]
  contracts: Contract[]
  rules: ContractRateRule[]
  // Only one set (contractID, skuID) of editing rules is stored at a time
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
