import { BreadcrumbNav } from '@/components/ad-hoc/rateCalculator/BreadcrumbNav';
import { LocationType } from '@/lib/routing/types';
import { useCurrentLocation } from '@/lib/routing/useCurrentLocation';
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  LicenseManager,
  ModuleRegistry,
  RowDragModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  ValidationModule,
} from 'ag-grid-enterprise';
import { ContractsPage } from './ContractsPage';
import { RulesEditorPage } from './RulesEditorPage';
import { RulesPage } from './RulesPage';

LicenseManager.setLicenseKey(process.env.PUBLIC_AG_GRID_LICENSE);
ModuleRegistry.registerModules([AllCommunityModule]);
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  RowDragModule,
  ...(process.env.NODE_ENV !== 'production' ? [ValidationModule] : []),
]);

export const POC = () => {
  const location = useCurrentLocation();

  const renderPage = (): React.ReactNode => {
    switch (location.type) {
      case LocationType.ContractList:
        return <ContractsPage />;
      case LocationType.RuleList:
        return <RulesPage />;
      case LocationType.RuleEditor:
        return <RulesEditorPage />;
    }
  };

  return (
    <div className="h-full gap-2 flex flex-col">
      <div className="flex-shrink-0">
        <BreadcrumbNav />
      </div>
      <div className="flex-1 overflow-hidden">{renderPage()}</div>
    </div>
  );
};

export default POC;
