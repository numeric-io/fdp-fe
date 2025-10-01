import { APIClient } from '@/api-client/api-client';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import './App.css';

const App = () => {
  const apiClient = useMemo(() => new APIClient('http://localhost:3006'), []);
  return (
    <div className="content">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button
        variant="destructive"
        onClick={async () => {
          const res = await apiClient.request('/');
          console.log(res);
        }}
      >
        Button
      </Button>
    </div>
  );
};

export default App;
