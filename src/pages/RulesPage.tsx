import EventsGrid from '@/components/ad-hoc/rateCalculator/EventsGrid';
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
  if (location.type !== LocationType.RuleList) return null;

  return (
    <Tabs defaultValue={RulesPageTab.Rules} className="h-full">
      <TabsList>
        <TabsTrigger value={RulesPageTab.Rules}>Rules</TabsTrigger>
        <TabsTrigger value={RulesPageTab.Events}>Events</TabsTrigger>
      </TabsList>

      <TabsContent value={RulesPageTab.Rules}>
        <RateRulesGrid contractID={location.contractID} />
      </TabsContent>
      <TabsContent value={RulesPageTab.Events}>
        <EventsGrid contractID={location.contractID} />
      </TabsContent>
    </Tabs>
  );
};
