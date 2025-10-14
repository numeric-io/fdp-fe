import { IBackendAPIClient } from '@/api-client/IBackendAPIClient'
import { GetContractsAPI } from '@numeric-io/fdp-api'
import { Result } from '@numeric-io/result'
import { Contract } from './rateCalculator/types'

export async function fetchContracts(client: IBackendAPIClient | null) {
  if (!client) return console.error('Client not found')

  const contractsRes = (await client.request(GetContractsAPI, undefined)) as unknown as Result<{
    contracts: Contract[]
  }>
  if (!contractsRes || !contractsRes.ok) return console.error('No contracts found')
  // writeContracts(contractsRes.data.contracts)
}
