import { Text } from '@/components/ui/numeric-ui/text';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types';
import { ICellRendererParams } from 'ag-grid-community';
import { ChevronDown } from 'lucide-react';

interface RuleEditorProps {
  rule: ContractRateRule;
  onUpdateRule: (rule: ContractRateRule) => void;
}

export const RuleEditor = ({ rule }: RuleEditorProps) => {
  return (
    <div className="flex flex-col">
      <RuleBody rule={rule} />
    </div>
  );
};

export const RuleHeaderRenderer = (
  params: ICellRendererParams<ContractRateRule>,
) => {
  const rule = params.data;
  if (!rule) {
    return null;
  }
  return (
    <>
      <div className="absolute top-[12px] left-[18px] rule-header-priority">
        {rule.priority}
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <Text>{`RuleHeader: ${rule.id}`}</Text>
          <Text>{`No matches yet`}</Text>
        </div>
        <ChevronDown className="opacity-50" />
      </div>
    </>
  );
};

enum RuleBodyTab {
  Include = 'include',
  Exclude = 'exclude',
}

const RuleBody = ({ rule }: { rule: ContractRateRule }) => {
  return (
    <Tabs defaultValue={RuleBodyTab.Include} className="h-full">
      <TabsList>
        <TabsTrigger value={RuleBodyTab.Include}>Include</TabsTrigger>
        <TabsTrigger value={RuleBodyTab.Exclude}>Exclude</TabsTrigger>
      </TabsList>

      <TabsContent value={RuleBodyTab.Include}></TabsContent>
      <TabsContent value={RuleBodyTab.Exclude}></TabsContent>
    </Tabs>
  );
};
