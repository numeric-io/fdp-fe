import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types';
import { RuleHeader } from './RuleHeader';

interface RuleEditorProps {
  rule: ContractRateRule;
  isExpanded: boolean;
  onClick: () => void;
}

enum RuleBodyTab {
  Include = 'include',
  Exclude = 'exclude',
}

export const RuleEditor = ({ rule, isExpanded, onClick }: RuleEditorProps) => {
  const body = (
    <Tabs defaultValue={RuleBodyTab.Include} className="h-full w-full p-2">
      <TabsList>
        <TabsTrigger value={RuleBodyTab.Include}>Include</TabsTrigger>
        <TabsTrigger value={RuleBodyTab.Exclude}>Exclude</TabsTrigger>
      </TabsList>

      <TabsContent value={RuleBodyTab.Include}></TabsContent>
      <TabsContent value={RuleBodyTab.Exclude}></TabsContent>
    </Tabs>
  );
  return (
    <div className="flex flex-col gap-2">
      {/* should match RULE_HEADER_HEIGHT but tailwind doesn't like dynamic classes */}
      <div className={`h-[68px] px-4 flex items-center w-full`}>
        <RuleHeader
          showPriority
          rule={rule}
          isExpanded={isExpanded}
          onClick={onClick}
        />
      </div>
      {isExpanded && <div className="flex-1 w-full bg-gray-100">{body}</div>}
    </div>
  );
};
