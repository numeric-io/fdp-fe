import { BreadcrumbNav } from '@/components/ad-hoc/BreadcrumbNav';
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

  return (
    <div className="h-full gap-2 flex flex-col">
      <div className="flex-shrink-0">
        <BreadcrumbNav />
      </div>
      <div className="flex-1">
        {location.type === LocationType.ContractList ? (
          <ContractsPage />
        ) : (
          <RulesPage />
        )}
      </div>
    </div>
  );
};

export default POC;
