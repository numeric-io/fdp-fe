import { BreadcrumbNav } from '@/components/ad-hoc/BreadcrumbNav';
import { ContractGrid } from '@/components/ad-hoc/rateCalculator/ContractGrid';
import { LocationType } from '@/lib/routing/types';
import { useCurrentLocation } from '@/lib/routing/useCurrentLocation';
import { useNavigateTo } from '@/lib/routing/useNavigateTo';
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
  const navigateTo = useNavigateTo();

  return (
    <div className="h-full gap-2 flex flex-col">
      <div className="flex-shrink-0">
        <BreadcrumbNav />
      </div>
      <div className="flex-1">
        {location.type === LocationType.ContractList ? (
          <ContractGrid
            onSelectContract={(contractID) => {
              navigateTo({ type: LocationType.RuleList, contractID });
            }}
          />
        ) : (
          <RulesPage />
        )}
      </div>
    </div>
  );
};

export default POC;
