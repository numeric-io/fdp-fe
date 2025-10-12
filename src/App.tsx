import { createContext, useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { IBackendAPIClient } from './api-client/IBackendAPIClient'
import { fetchContracts } from './lib/store/stores/api'
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

  useEffect(() => {
    fetchContracts(client)
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
