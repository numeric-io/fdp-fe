import { createContext } from 'react';
import { IBackendAPIClient } from './api-client/IBackendAPIClient';
import POC from './pages/POC';

export const APIClientContext = createContext<IBackendAPIClient | null>(null);

const App = () => {
  return <POC />;
};

export default App;
