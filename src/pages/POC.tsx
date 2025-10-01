import RateCalculator from '@/components/ad-hoc/RateCalculator';
import UnmatchedEvents from '@/components/ad-hoc/UnmatchedEvents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

enum TabValue {
  UnmatchedEvents = 'unmatched-events',
  RateCalculator = 'rate-calculator',
}

export const POC = () => {
  return (
    <Tabs defaultValue={TabValue.UnmatchedEvents} className="h-full">
      <TabsList>
        <TabsTrigger value={TabValue.UnmatchedEvents}>
          Unmatched Events
        </TabsTrigger>
        <TabsTrigger value={TabValue.RateCalculator}>
          Rate Calculator
        </TabsTrigger>
      </TabsList>
      <TabsContent value={TabValue.UnmatchedEvents}>
        <UnmatchedEvents />
      </TabsContent>
      <TabsContent value={TabValue.RateCalculator}>
        <RateCalculator />
      </TabsContent>
    </Tabs>
  );
};

export default POC;
