import { sortRules } from '@/components/ad-hoc/rateCalculator/rulesEditor/utils'
import { useMemo } from 'react'
import { useContract, useContractRateRules, useEditingRules, useEvents } from './getters'
import type { ContractRateRule, Events, SKU } from './types'

export const useEventsByContractID = (contractID: string | null): Events[] => {
  const events = useEvents()
  return useMemo(() => {
    if (contractID === null) {
      return events
    }
    return events.filter((event) => event.contract_id === contractID)
  }, [events, contractID])
}

// TODO: correct this to use events
export const useKeyOptionsByContractID = (contractID: string | null): string[] => {
  const rules = useContractRateRulesByContractID(contractID)
  return useMemo(() => {
    return Array.from(
      new Set(rules.map((rule) => rule.andExpression.conditions.map((condition) => condition.field)).flat())
    )
  }, [rules])
}

export const useSKUsByContractID = (contractID: string): SKU[] => {
  const contract = useContract(contractID)
  return useMemo(() => {
    return contract?.skus ?? []
  }, [contract])
}

export const useContractRateRulesByContractID = (contractID: string | null): ContractRateRule[] => {
  const rateRules = useContractRateRules()
  return useMemo(() => {
    if (contractID === null) {
      return rateRules
    }
    return rateRules.filter((rule) => rule.contract_id === contractID)
  }, [rateRules, contractID])
}

export const useContractRateRulesBysku = (contractID: string | null, sku: string | null): ContractRateRule[] => {
  const rateRules = useContractRateRulesByContractID(contractID)

  return useMemo(() => {
    if (sku === null) {
      return rateRules
    }
    return rateRules.filter((rule) => rule.sku === sku)
  }, [rateRules, sku])
}

export const useEditingRulesBySKU = (contractID: string | null, sku: string | null): ContractRateRule[] => {
  const editingRules = useEditingRules()
  const contractRateRules = useContractRateRulesBysku(contractID, sku)
  return useMemo(() => {
    if (editingRules !== null && (editingRules.contractID !== contractID || editingRules.sku !== sku)) {
      return []
    }
    return sortRules([...(editingRules?.rules ?? contractRateRules)])
  }, [editingRules, contractID, sku, contractRateRules])
}
