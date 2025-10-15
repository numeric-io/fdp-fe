import { IBackendAPIClient } from '@/api-client/IBackendAPIClient'
import {
  CreateRuleRequest,
  GetBillingRecordsAPI,
  GetContractRulesAPI,
  GetContractsAPI,
  RunContractRulesAPI,
  SaveContractRulesAPI,
} from '@numeric-io/fdp-api'
import { Temporal } from '@numeric-io/temporal'
import { ContractRateRule } from './rateCalculator/types'
import { writeClearingRules, writeContractRateRules, writeContracts, writeEvents } from './rateCalculator/write'

export async function fetchContracts(client: IBackendAPIClient | null) {
  if (!client) return console.error('Client not found')

  const contractsRes = await client.request(GetContractsAPI, {})
  if (!contractsRes || !contractsRes.ok) return console.error('No contracts found')
  writeContracts(contractsRes.data.contracts)
}

export async function fetchRules(client: IBackendAPIClient | null, contractID: string) {
  if (!client) return console.error('Client not found')

  const rulesRes = await client.request(GetContractRulesAPI, { contract_id: contractID })
  if (!rulesRes || !rulesRes.ok) return console.error('No rules found')

  writeContractRateRules(rulesRes.data.rules as ContractRateRule[])
}

export async function fetchEvents(
  client: IBackendAPIClient | null,
  args: { contractID?: string; month: number; year: number }
) {
  if (!client) return console.error('Client not found')

  const startOfMonth = Temporal.PlainDate.from({ year: args.year, month: args.month, day: 1 })
  const endOfMonth = startOfMonth.with({ day: startOfMonth.daysInMonth })

  const eventsRes = await client.request(GetBillingRecordsAPI, {
    contract_id: args.contractID,
    start_date: startOfMonth,
    end_date: endOfMonth,
  })
  if (!eventsRes || !eventsRes.ok) return console.error('No events found')
  writeEvents(eventsRes.data.billing_records)
}

export const runRules = async (
  client: IBackendAPIClient | null,
  {
    contractID,
    sku,
    startDate,
    endDate,
    rules,
  }: {
    contractID: string
    sku: string
    startDate: Temporal.PlainDate
    endDate: Temporal.PlainDate
    rules: CreateRuleRequest[]
  }
) => {
  if (!client) return console.error('Client not found')

  const rulesRes = await client.request(RunContractRulesAPI, {
    contract_id: contractID,
    sku,
    rules,
    start_date: startDate,
    end_date: endDate,
  })
  if (!rulesRes || !rulesRes.ok) return console.error('No rules found')

  writeEvents(rulesRes.data.billing_records)
}

export const saveRules = async (
  client: IBackendAPIClient | null,
  {
    contractID,
    rules,
    month,
    year,
  }: {
    contractID: string
    rules: CreateRuleRequest[]
    month: number
    year: number
  }
) => {
  if (!client) return console.error('Client not found')
  const startOfMonth = Temporal.PlainDate.from({ year, month, day: 1 })
  const endOfMonth = startOfMonth.with({ day: startOfMonth.daysInMonth })

  const rulesRes = await client.request(SaveContractRulesAPI, {
    contract_id: contractID,
    rules,
    start_date: startOfMonth,
    end_date: endOfMonth,
  })
  if (!rulesRes || !rulesRes.ok) return console.error('No rules found')

  writeContractRateRules(rulesRes.data.rules)
  writeClearingRules()
}
