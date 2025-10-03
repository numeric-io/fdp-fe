import RateCalculator from '@/components/ad-hoc/rateCalculator/RateCalculator';
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
        <TabsTrigger value={TabValue.RateCalculator}>
          Rate Calculator
        </TabsTrigger>
        <TabsTrigger value={TabValue.UnmatchedEvents}>
          Unmatched Events
        </TabsTrigger>
      </TabsList>

      <TabsContent value={TabValue.RateCalculator}>
        <RateCalculator />
      </TabsContent>
      <TabsContent value={TabValue.UnmatchedEvents}>
        <UnmatchedEvents />
      </TabsContent>
    </Tabs>
  );
};

export default POC;
