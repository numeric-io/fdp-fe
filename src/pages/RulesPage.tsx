import { RateRulesGrid } from '@/components/ad-hoc/rateCalculator/RateRulesGrid';
import UnmatchedEvents from '@/components/ad-hoc/UnmatchedEvents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocationType } from '@/lib/routing/types';
import { useCurrentLocation } from '@/lib/routing/useCurrentLocation';
import { useNavigateTo } from '@/lib/routing/useNavigateTo';

enum TabValue {
  RateCalculator = 'rate_calculator',
  UnmatchedEvents = 'unmatched_events',
}

export const RulesPage = () => {
  const location = useCurrentLocation();
  const navigateTo = useNavigateTo();

  if (
    location.type !== LocationType.RuleList &&
    location.type !== LocationType.RuleEditor
  ) {
    return null;
  }

  const onSelectSKUID = (skuID: string | null) => {
    navigateTo({
      type: LocationType.RuleEditor,
      contractID: location.contractID,
      SKUID: skuID,
    });
  };

  const { contractID } = location;
  return (
    <Tabs defaultValue={TabValue.RateCalculator} className="h-full">
      <TabsList>
        <TabsTrigger value={TabValue.RateCalculator}>
          Rate Calculator
        </TabsTrigger>
        <TabsTrigger value={TabValue.UnmatchedEvents}>
          Unmatched Events
        </TabsTrigger>
      </TabsList>

      <TabsContent value={TabValue.RateCalculator}>
        {location.type === LocationType.RuleList ? (
          <RateRulesGrid
            contractID={contractID}
            skuID={null}
            setSelectedSKUID={onSelectSKUID}
          />
        ) : (
          <RateRulesGrid
            contractID={contractID}
            skuID={location.SKUID}
            setSelectedSKUID={() => {}}
          />
        )}
      </TabsContent>
      <TabsContent value={TabValue.UnmatchedEvents}>
        <UnmatchedEvents />
      </TabsContent>
    </Tabs>
  );
};
