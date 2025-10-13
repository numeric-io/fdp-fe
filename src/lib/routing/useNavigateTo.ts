import { AppContext } from '@/App'
import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Location, LocationType, ModuleName, ModuleTabName, SearchParamKey } from './types'

export const useNavigateTo = (): ((location: Location) => void) => {
  const navigate = useNavigate()
  const { basePath } = useContext(AppContext)

  return useCallback(
    (location: Location) => {
      navigate(`${locationToPath(location, basePath)}`)
    },
    [navigate, basePath]
  )
}

export const locationToPath = (location: Location, basePath: string) => {
  let path = basePath
  switch (location.type) {
    case LocationType.RuleList:
      path += `/${ModuleName.Contract}`
      break
    case LocationType.RuleEditor:
      path += `/${ModuleName.Contract}/${ModuleTabName.RulesEditor}`
      break
  }
  const params = new URLSearchParams({})

  if (location.type === LocationType.RuleList || location.type === LocationType.RuleEditor) {
    params.set(SearchParamKey.ContractID, location.contractID)
  }

  if (location.type === LocationType.RuleEditor && location.SKUID) {
    params.set(SearchParamKey.SKUID, location.SKUID)
  }

  const searchString = params ? `?${new URLSearchParams(params).toString()}` : ''

  return `${path}${searchString}`
}
