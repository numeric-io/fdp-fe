import { createContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IBackendAPIClient } from './api-client/IBackendAPIClient';
import POC from './pages/POC';

interface AppContextType {
  client: IBackendAPIClient | null;
  navigate: (path: string) => void;
}

export const AppContext = createContext<AppContextType>({
  client: null,
  navigate: () => {},
});

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/fdp" />} />
      <Route path="/fdp" element={<POC />} />
      <Route path="/fdp/*" element={<POC />} />
    </Routes>
  );
};

export default App;
