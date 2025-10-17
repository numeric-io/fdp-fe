import { AppContext } from '@/App'
import { BreadcrumbNav } from '@/components/ad-hoc/rateCalculator/BreadcrumbNav'
import { Button } from '@/components/ui/button'
import { LocationType } from '@/lib/routing/types'
import { useCurrentLocation } from '@/lib/routing/useCurrentLocation'
import { useNavigateTo } from '@/lib/routing/useNavigateTo'
import { saveRules } from '@/lib/store/stores/api'
import { useEditingRules } from '@/lib/store/stores/rateCalculator/getters'
import { useEditingRulesBySKU } from '@/lib/store/stores/rateCalculator/memoSelectors'
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  LicenseManager,
  ModuleRegistry,
  RowDragModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  ValidationModule,
} from 'ag-grid-enterprise'
import { useContext } from 'react'
import { ContractsPage } from './ContractsPage'
import { RulesEditorPage } from './RulesEditorPage'
import { RulesPage } from './RulesPage'

LicenseManager.setLicenseKey(process.env.PUBLIC_AG_GRID_LICENSE)
ModuleRegistry.registerModules([AllCommunityModule])
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  RowDragModule,
  ...(process.env.NODE_ENV !== 'production' ? [ValidationModule] : []),
])

export const POC = () => {
  const location = useCurrentLocation()
  const navigateTo = useNavigateTo()
  const { client } = useContext(AppContext)
  const contractID = location.type === LocationType.RuleEditor ? location.contractID : null
  const sku = location.type === LocationType.RuleEditor ? location.SKU : null
  // TODO: no need to rerender when this changes, move this into Button handler
  const editingRulesBySKU = useEditingRulesBySKU(contractID, sku)
  const editingRules = useEditingRules()

  const renderPage = (): React.ReactNode => {
    switch (location.type) {
      case LocationType.ContractList:
        return <ContractsPage />
      case LocationType.RuleList:
        return <RulesPage />
      case LocationType.RuleEditor:
        return <RulesEditorPage />
    }
  }

  return (
    <div className="h-full gap-2 flex flex-col" id="fdp-poc">
      <div className="flex-shrink-0">
        <div className="flex justify-between items-center">
          <BreadcrumbNav />

          {location.type === LocationType.RuleList && (
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                navigateTo({ type: LocationType.RuleEditor, contractID: location.contractID, SKU: null })
              }}
            >
              Add Rule
            </Button>
          )}
          {location.type === LocationType.RuleEditor && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigateTo({
                    type: LocationType.RuleList,
                    contractID: location.contractID,
                  })
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (location.SKU === null || editingRules === null) return
                  saveRules(client, {
                    sku: location.SKU,
                    contractID: location.contractID,
                    rules: editingRulesBySKU,
                    month: editingRules.period.month,
                    year: editingRules.period.year,
                  })
                }}
                disabled={editingRules?.rules === null}
              >
                Save Rules
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{renderPage()}</div>
    </div>
  )
}

export default POC
