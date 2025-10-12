import { GetContractsAPI } from '@numeric-io/fdp-api'
import { createContext, useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { IBackendAPIClient } from './api-client/IBackendAPIClient'
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

  async function fetchContracts() {
    const contractsRes = await client?.request(GetContractsAPI, undefined)
    console.log(contractsRes)
  }

  useEffect(() => {
    if (!client) return console.error('Client not found')
    fetchContracts()
  }, [client])

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/fdp" />} />
      <Route path="/fdp" element={<POC />} />
      <Route path="/fdp/*" element={<POC />} />
    </Routes>
  )
}

export default App
