import { AppContext } from '@/App'
import { useContext } from 'react'
import { useMatch, useSearchParams } from 'react-router-dom'
import { Location, LocationType, ModuleName, ModuleTabName, SearchParamKey } from './types'

export const useCurrentLocation = (): Location => {
  const { basePath } = useContext(AppContext)
  const [searchParams] = useSearchParams()
  const contractListMatch = useMatch(`${basePath}`)
  const ruleListMatch = useMatch(`${basePath}/${ModuleName.Contract}`)
  const ruleEditorMatch = useMatch(`${basePath}/${ModuleName.Contract}/${ModuleTabName.RulesEditor}`)

  if (contractListMatch) {
    return { type: LocationType.ContractList }
  }

  const contractID = searchParams.get(SearchParamKey.ContractID)

  if (!contractID) {
    // Default to contract list if no contract ID is provided
    return { type: LocationType.ContractList }
  }

  if (ruleListMatch) {
    return {
      type: LocationType.RuleList,
      contractID,
    }
  }

  if (ruleEditorMatch) {
    const sku = searchParams.get(SearchParamKey.SKU)
    return {
      type: LocationType.RuleEditor,
      contractID,
      SKU: sku,
    }
  }

  return { type: LocationType.ContractList }
}
