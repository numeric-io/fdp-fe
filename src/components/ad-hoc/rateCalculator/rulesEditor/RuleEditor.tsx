import { Text } from '@/components/ui/numeric-ui/text';
import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types';
import { ICellRendererParams } from 'ag-grid-community';
import { ChevronDown } from 'lucide-react';

export const RuleHeaderRenderer = (
  params: ICellRendererParams<ContractRateRule>,
) => {
  const rule = params.data;
  if (!rule) {
    return null;
  }
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <Text>{`RuleHeader: ${rule.id}`}</Text>
        <Text>{`No matches yet`}</Text>
      </div>
      <ChevronDown className="opacity-50 text-gray-400" />
    </div>
  );
};

// enum RuleBodyTab {
//   Include = 'include',
//   Exclude = 'exclude',
// }

// export const RuleEditorRenderer = ({ rule }: { rule: ContractRateRule }) => {
//   return (
//     <div className="h-md">
//       <Tabs defaultValue={RuleBodyTab.Include} className="h-full">
//         <TabsList>
//           <TabsTrigger value={RuleBodyTab.Include}>Include</TabsTrigger>
//           <TabsTrigger value={RuleBodyTab.Exclude}>Exclude</TabsTrigger>
//         </TabsList>

//         <TabsContent value={RuleBodyTab.Include}></TabsContent>
//         <TabsContent value={RuleBodyTab.Exclude}></TabsContent>
//       </Tabs>
//     </div>
//   );
// };
