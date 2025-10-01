import './App.css';
import POC from './pages/POC';

const App = () => {
  // const apiClient = useMemo(() => new APIClient('http://localhost:3005'), []);
  return (
    <div className="h-full p-4">
      <POC />
      {/* <Button
        variant="destructive"
        onClick={async () => {
          const res = await apiClient.request('/health');
          console.log(res);
        }}
      >
        Button
      </Button> */}
    </div>
  );
};

export default App;
