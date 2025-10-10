export interface Events {
  id: string;
  name: string;
  contractID: string;
}

export interface SKU {
  id: string;
  name: string;
}

export interface Contract {
  id: string;
  name: string;
  rateRules: ContractRateRule[];
  skus: SKU[];
}

export interface RateCalculatorStore {
  events: Events[];
  contracts: Contract[];
}

export interface ContractRateRule {
  id: string;
  name: string;
  contractID: string;
  skuID: string;
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
