import { LocationType } from '@/lib/routing/types'
import { useCurrentLocation } from '@/lib/routing/useCurrentLocation'
import { useNavigateTo } from '@/lib/routing/useNavigateTo'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../ui/breadcrumb'

export const BreadcrumbNav = () => {
  const location = useCurrentLocation()
  const navigateTo = useNavigateTo()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {location.type === LocationType.ContractList ? (
            <BreadcrumbPage>Billing & Revenue</BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              onClick={() => {
                navigateTo({ type: LocationType.ContractList })
              }}
            >
              {'Billing & Revenue'}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {(location.type === LocationType.RuleList || location.type === LocationType.RuleEditor) && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {location.type === LocationType.RuleEditor ? (
                <BreadcrumbLink
                  onClick={() => {
                    navigateTo({ type: LocationType.RuleList, contractID: location.contractID })
                  }}
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
              <BreadcrumbPage>{`Edit Rules`}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
