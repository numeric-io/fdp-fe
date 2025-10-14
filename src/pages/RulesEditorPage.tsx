import { EventsGrid } from '@/components/ad-hoc/rateCalculator/EventsGrid'
import { RulesEditor } from '@/components/ad-hoc/rateCalculator/rulesEditor/RulesEditor'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/numeric-ui/text'
import { LocationType } from '@/lib/routing/types'
import { useCurrentLocation } from '@/lib/routing/useCurrentLocation'
import { useNavigateTo } from '@/lib/routing/useNavigateTo'
import { useEvents } from '@/lib/store/stores/rateCalculator/getters'

export const RulesEditorPage = () => {
  const location = useCurrentLocation()
  const navigateTo = useNavigateTo()
  const events = useEvents()
  const unmatchedEvents = events.filter((event) => event.rule_id === null)

  if (location.type !== LocationType.RuleEditor) return null

  const { contractID, SKUID } = location
  return (
    <div className="h-full flex gap-2">
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex-shrink-0 bg-gray-100 flex justify-between items-center p-4 rounded-md">
          <Text>
            {unmatchedEvents.length
              ? `${unmatchedEvents.length} / ${events.length} unmatched events`
              : 'Congrats! All events are matched'}
          </Text>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigateTo({
                type: LocationType.RuleList,
                contractID,
              })
            }}
          >
            Refresh
          </Button>
        </div>
        <EventsGrid contractID={contractID} />
      </div>
      <div className="flex-shrink-0">
        <RulesEditor
          contractID={contractID}
          skuID={SKUID}
          onSelectSKU={(newSKUID) => {
            navigateTo({
              type: LocationType.RuleEditor,
              contractID,
              SKUID: newSKUID,
            })
          }}
        />
      </div>
    </div>
  )
}
