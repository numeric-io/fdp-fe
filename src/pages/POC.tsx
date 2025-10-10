import RateCalculator from '@/components/ad-hoc/rateCalculator/RateCalculator';
import UnmatchedEvents from '@/components/ad-hoc/UnmatchedEvents';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HealthCheckAPI } from '@numeric-io/fdp-api';
import { useContext } from 'react';
import { APIClientContext } from '../App';

enum TabValue {
  UnmatchedEvents = 'unmatched-events',
  RateCalculator = 'rate-calculator',
}

export const POC = () => {
  const apiClient = useContext(APIClientContext);
  return (
    <Tabs defaultValue={TabValue.RateCalculator} className="h-full">
      <Button
        onClick={async () => {
          const res = await apiClient?.request(HealthCheckAPI, undefined);
          console.log(res?.status);
        }}
      ></Button>
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
