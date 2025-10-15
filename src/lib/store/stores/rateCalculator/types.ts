import { APIBillingRecord, APIContract, APIRule, ComparisonCondition } from '@numeric-io/fdp-api'

export type Events = APIBillingRecord
export type Contract = APIContract
export type Rate = APIRule['rate']
export type ContractRateRuleCondition = ComparisonCondition
export type ContractRateRuleConditions = ComparisonCondition[]
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
