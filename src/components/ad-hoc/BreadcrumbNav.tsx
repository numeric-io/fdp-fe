import { LocationType } from '@/lib/routing/types';
import { useCurrentLocation } from '@/lib/routing/useCurrentLocation';
import { locationToPath } from '@/lib/routing/useNavigateTo';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

export const BreadcrumbNav = () => {
  const location = useCurrentLocation();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {location.type === LocationType.ContractList ? (
            <BreadcrumbPage>Billing & Revenue</BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              href={locationToPath({ type: LocationType.ContractList })}
            >
              Billing & Revenue
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {(location.type === LocationType.RuleList ||
          location.type === LocationType.RuleEditor) && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {location.type === LocationType.RuleEditor ? (
                <BreadcrumbLink
                  href={locationToPath({
                    type: LocationType.RuleList,
                    contractID: location.contractID,
                  })}
                >
                  {location.contractID}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{location.contractID}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}
        {location.type === LocationType.RuleEditor && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{location.SKUID}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
