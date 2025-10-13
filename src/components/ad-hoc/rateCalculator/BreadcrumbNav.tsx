import { AppContext } from '@/App'
import { LocationType } from '@/lib/routing/types'
import { useCurrentLocation } from '@/lib/routing/useCurrentLocation'
import { locationToPath } from '@/lib/routing/useNavigateTo'
import { useContext } from 'react'
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
  const { basePath } = useContext(AppContext)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {location.type === LocationType.ContractList ? (
            <BreadcrumbPage>Billing & Revenue</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={locationToPath({ type: LocationType.ContractList }, basePath)}>
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
                  href={locationToPath(
                    {
                      type: LocationType.RuleList,
                      contractID: location.contractID,
                    },
                    basePath
                  )}
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
