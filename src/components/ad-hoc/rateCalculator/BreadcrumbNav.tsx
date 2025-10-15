import { LocationType } from '@/lib/routing/types'
import { useCurrentLocation } from '@/lib/routing/useCurrentLocation'
import { useNavigateTo } from '@/lib/routing/useNavigateTo'
import { useContract } from '@/lib/store/stores/rateCalculator/getters'
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
  const contract = useContract(
    location.type === LocationType.RuleList || location.type === LocationType.RuleEditor ? location.contractID : null
  )

  const contractName = contract?.customer_name ?? 'Unknown Contract'

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
                  {contractName}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{contractName}</BreadcrumbPage>
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
