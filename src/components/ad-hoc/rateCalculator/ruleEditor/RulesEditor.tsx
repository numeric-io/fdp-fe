import { Label } from '@/components/ui/numeric-ui/label';
import { SKUSelect } from './SKUSelector';

export interface RulesEditorProps {
  contractID: string;
  skuID: string | null;
  onSelectSKU: (skuID: string) => void;
}

const WIDTH = 300;

export const RulesEditor = ({
  contractID,
  skuID,
  onSelectSKU,
}: RulesEditorProps) => {
  return (
    <div className={`h-full w-[${WIDTH}px] flex flex-col gap-2`}>
      <div className="flex flex-col gap-1">
        <Label>SKU</Label>
        <SKUSelect
          contractID={contractID}
          selectedSKUID={skuID}
          onSelectSKU={onSelectSKU}
        />
      </div>
    </div>
  );
};
