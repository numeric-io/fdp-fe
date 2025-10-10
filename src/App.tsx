import { createContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IBackendAPIClient } from './api-client/IBackendAPIClient';
import POC from './pages/POC';

export const APIClientContext = createContext<IBackendAPIClient | null>(null);

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
