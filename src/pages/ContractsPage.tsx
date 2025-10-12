import { ContractGrid } from '@/components/ad-hoc/rateCalculator/ContractGrid'
import EventsGrid from '@/components/ad-hoc/rateCalculator/EventsGrid'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LocationType } from '@/lib/routing/types'
import { useNavigateTo } from '@/lib/routing/useNavigateTo'
import { useContracts } from '@/lib/store/stores/rateCalculator/getters'

enum ContractsPageTab {
  Contracts = 'contracts',
  Events = 'events',
}

export const ContractsPage = () => {
  const navigateTo = useNavigateTo()
  const contracts = useContracts()
  console.log('ContractsPage - contracts from store:', contracts)

  return (
    <Tabs defaultValue={ContractsPageTab.Contracts} className="h-full">
      <TabsList>
        <TabsTrigger value={ContractsPageTab.Contracts}>Contracts</TabsTrigger>
        <TabsTrigger value={ContractsPageTab.Events}>Events</TabsTrigger>
      </TabsList>

      <TabsContent value={ContractsPageTab.Contracts}>
        <pre>
          <code>{JSON.stringify(useContracts(), null, 2)}</code>
        </pre>
        <ContractGrid
          onSelectContract={(contractID) => {
            navigateTo({ type: LocationType.RuleList, contractID })
          }}
        />
      </TabsContent>
      <TabsContent value={ContractsPageTab.Events}>
        <EventsGrid contractID={null} />
      </TabsContent>
    </Tabs>
  )
}
