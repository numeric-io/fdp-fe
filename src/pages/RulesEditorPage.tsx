import { AppContext } from '@/App'
import { EventsGrid } from '@/components/ad-hoc/rateCalculator/EventsGrid'
import { RulesEditor } from '@/components/ad-hoc/rateCalculator/rulesEditor/RulesEditor'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/numeric-ui/text'
import { LocationType } from '@/lib/routing/types'
import { useCurrentLocation } from '@/lib/routing/useCurrentLocation'
import { useNavigateTo } from '@/lib/routing/useNavigateTo'
import { fetchRules, runRules } from '@/lib/store/stores/api'
import { useEditingRules, useEvents } from '@/lib/store/stores/rateCalculator/getters'
import { useContractRateRulesBysku, useEditingRulesBySKU } from '@/lib/store/stores/rateCalculator/memoSelectors'
import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types'
import { CreateRuleRequest } from '@numeric-io/fdp-api'
import { useCallback, useContext, useEffect } from 'react'

export const RulesEditorPage = () => {
  const location = useCurrentLocation()
  const navigateTo = useNavigateTo()
  const period = useEditingRules()?.period
  const rules = useContractRateRulesBysku(
    location.type === LocationType.RuleEditor ? location.contractID : null,
    location.type === LocationType.RuleEditor ? location.SKU : null
  )
  const editingRulesBySKU = useEditingRulesBySKU(
    location.type === LocationType.RuleEditor ? location.contractID : null,
    location.type === LocationType.RuleEditor ? location.SKU : null
  )
  const events = useEvents()
  const { client } = useContext(AppContext)
  const unmatchedEvents = events.filter((event) => event.rule_id === null)

  const contractID = location.type === LocationType.RuleEditor ? location.contractID : null
  const sku = location.type === LocationType.RuleEditor ? location.SKU : null

  useEffect(() => {
    if (!contractID) return
    fetchRules(client, contractID)
  }, [client, contractID])

  const onRunRules = useCallback(
    (rules: ContractRateRule[]) => {
      if (!contractID || !sku || !period) return
      runRules(client, {
        contractID,
        sku,
        period: period,
        rules: rules.map((rule) => {
          if (!sku) {
            throw new Error('SKU ID is required')
          }
          const createRuleRequest: CreateRuleRequest = {
            contract_id: contractID,
            sku: sku,
            andExpression: rule.andExpression,
            rate: rule.rate,
            priority: rule.priority,
          }
          return createRuleRequest
        }),
      })
    },
    [contractID, sku, period, client]
  )

  useEffect(() => {
    onRunRules(rules)
  }, [contractID, rules, onRunRules])

  if (!contractID) return null

  return (
    <div className="h-full flex gap-2">
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex-shrink-0 bg-gray-100 flex justify-between items-center p-4 rounded-md">
          <Text>
            {unmatchedEvents.length
              ? `${unmatchedEvents.length} / ${events.length} unmatched events`
              : `Congrats! All ${events.length} events are matched`}
          </Text>
          <Button variant="outline" size="sm" onClick={() => onRunRules(editingRulesBySKU)}>
            Refresh
          </Button>
        </div>
        <EventsGrid contractID={contractID} />
      </div>
      <div className="flex-shrink-0">
        <RulesEditor
          contractID={contractID}
          sku={sku}
          onSelectSKU={(newsku) => {
            navigateTo({
              type: LocationType.RuleEditor,
              contractID,
              SKU: newsku,
            })
          }}
        />
      </div>
    </div>
  )
}
