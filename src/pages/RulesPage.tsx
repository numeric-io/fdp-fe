import EventsGrid from '@/components/ad-hoc/EventsGrid';
import { RateRulesGrid } from '@/components/ad-hoc/rateCalculator/RateRulesGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocationType } from '@/lib/routing/types';
import { useCurrentLocation } from '@/lib/routing/useCurrentLocation';

enum RulesPageTab {
  Rules = 'rules',
  Events = 'events',
}

export const RulesPage = () => {
  const location = useCurrentLocation();

  if (
    location.type !== LocationType.RuleList &&
    location.type !== LocationType.RuleEditor
  ) {
    return null;
  }

  const { contractID } = location;
  return (
    <Tabs defaultValue={RulesPageTab.Rules} className="h-full">
      <TabsList>
        <TabsTrigger value={RulesPageTab.Rules}>Rules</TabsTrigger>
        <TabsTrigger value={RulesPageTab.Events}>Events</TabsTrigger>
      </TabsList>

      <TabsContent value={RulesPageTab.Rules}>
        {location.type === LocationType.RuleList ? (
          <RateRulesGrid contractID={contractID} />
        ) : (
          <RateRulesGrid contractID={contractID} />
        )}
      </TabsContent>
      <TabsContent value={RulesPageTab.Events}>
        <EventsGrid contractID={contractID} />
      </TabsContent>
    </Tabs>
  );
};
