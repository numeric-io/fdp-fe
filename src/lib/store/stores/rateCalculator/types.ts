export interface UnmatchedEvent {
  id: string;
  name: string;
}

export interface Contract {
  id: string;
  name: string;
  rateRules: ContractRateRule[];
}

export interface RateCalculatorStore {
  unmatchedEvents: UnmatchedEvent[];
  contracts: Contract[];
}

export interface ContractRateRule {
  id: string;
  name: string;
  contract_id: string;
  sku: string;
  rule: Rule;
  rate: number;
  currency: string;
  priority: number;
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

export interface Rule {
  op: Operator;
  conditions: Condition[];
}

export interface Condition {
  op: Operator;
  field: string;
  value: string;
}
