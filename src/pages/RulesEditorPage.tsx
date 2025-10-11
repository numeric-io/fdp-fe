import { EventsGrid } from '@/components/ad-hoc/rateCalculator/EventsGrid';
import { RulesEditor } from '@/components/ad-hoc/rateCalculator/rulesEditor/RulesEditor';
import { LocationType } from '@/lib/routing/types';
import { useCurrentLocation } from '@/lib/routing/useCurrentLocation';
import { useNavigateTo } from '@/lib/routing/useNavigateTo';

export const RulesEditorPage = () => {
  const location = useCurrentLocation();
  const navigateTo = useNavigateTo();

  if (location.type !== LocationType.RuleEditor) return null;

  const { contractID, SKUID } = location;
  return (
    <div className="h-full flex gap-2">
      <div className="flex-1">
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
            });
          }}
        />
      </div>
    </div>
  );
};
