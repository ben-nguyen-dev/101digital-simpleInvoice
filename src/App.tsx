import { useRoutes } from 'react-router-dom';
import { authRoute, notAuthRoutes } from './routers/routers';
import './App.css';

function App() {
    const contentNotAuth = useRoutes(notAuthRoutes);
    const contentAuth = useRoutes(authRoute);
    return (
        <div className="App">
            {contentNotAuth}
            {contentAuth}
        </div>
    );
}

export default App;
