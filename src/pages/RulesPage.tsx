import EventsGrid from '@/components/ad-hoc/EventsGrid';
import { RateRulesGrid } from '@/components/ad-hoc/rateCalculator/RateRulesGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocationType } from '@/lib/routing/types';
import { useCurrentLocation } from '@/lib/routing/useCurrentLocation';
import { useNavigateTo } from '@/lib/routing/useNavigateTo';

enum RulesPageTab {
  Rules = 'rules',
  Events = 'events',
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
    <Tabs defaultValue={RulesPageTab.Rules} className="h-full">
      <TabsList>
        <TabsTrigger value={RulesPageTab.Rules}>Rules</TabsTrigger>
        <TabsTrigger value={RulesPageTab.Events}>Events</TabsTrigger>
      </TabsList>

      <TabsContent value={RulesPageTab.Rules}>
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
      <TabsContent value={RulesPageTab.Events}>
        <EventsGrid contractID={contractID} />
      </TabsContent>
    </Tabs>
  );
};
