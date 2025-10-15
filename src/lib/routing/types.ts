export const BASE_PATH = '/fdp'

export enum ModuleName {
  Contract = 'contract',
}

export enum ModuleTabName {
  RulesEditor = 'rules_editor',
}

export enum SearchParamKey {
  ContractID = 'contract_id',
  SKU = 'sku',
}

export enum LocationType {
  ContractList = 'contract_list',
  RuleList = 'rule_list',
  RuleEditor = 'rule_editor',
}

export type Location =
  | {
      type: LocationType.ContractList
    }
  | {
      type: LocationType.RuleList
      contractID: string
    }
  | {
      type: LocationType.RuleEditor
      contractID: string
      SKU: string | null
    }
