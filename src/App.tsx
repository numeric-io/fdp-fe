import { GetContractsAPI } from '@numeric-io/fdp-api'
import { createContext, useCallback, useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { IBackendAPIClient } from './api-client/IBackendAPIClient'
import { writeContracts } from './lib/store/stores/rateCalculator/write'
import POC from './pages/POC'

interface AppContextType {
  client: IBackendAPIClient | null
  basePath: string
}

export const AppContext = createContext<AppContextType>({
  client: null,
  basePath: '',
})

const App = () => {
  const { client } = useContext(AppContext)

  const fetchContracts = useCallback(async () => {
    try {
      console.log('Fetching contracts...')
      const contractsRes = await client?.request(GetContractsAPI, undefined)
      console.log('Contracts response:', contractsRes)
      if (!contractsRes) {
        console.error('No contracts found')
        return
      }
      console.log('Writing contracts to store:', contractsRes.contracts)
      writeContracts(contractsRes.contracts)
      console.log('Contracts written to store successfully')
    } catch (error) {
      console.error('Error fetching contracts:', error)
    }
  }, [client])

  useEffect(() => {
    if (!client) return console.error('Client not found')
    fetchContracts()
  }, [client, fetchContracts])

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/fdp" />} />
      <Route path="/fdp" element={<POC />} />
      <Route path="/fdp/*" element={<POC />} />
    </Routes>
  )
}

export default App
