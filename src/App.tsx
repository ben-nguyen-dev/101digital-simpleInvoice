import { useRoutes } from 'react-router-dom';
import { authRoute, notAuthRoutes } from './routers/routers';
import './App.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {
    const contentNotAuth = useRoutes(notAuthRoutes);
    const contentAuth = useRoutes(authRoute);
    return (
        <div className="App">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {contentNotAuth}
                {contentAuth}
            </LocalizationProvider>
        </div>
    );
}

export default App;
