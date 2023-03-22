import { useRoutes } from 'react-router-dom';
import { notAuthRoutes } from './routers/routers';
import './App.css';

function App() {
    const contentNotAuth = useRoutes(notAuthRoutes);
    return <div className="App">{contentNotAuth}</div>;
}

export default App;
