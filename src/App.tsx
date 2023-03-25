import { useRoutes } from 'react-router-dom';
import { authRoute, notAuthRoutes } from './routers/routers';
import './App.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import ToastMessageView from './components/ToastMessage/ToastMessage';
import { Navigate, NavigateRef } from './hooks/useNavigateRef';

function App() {
    const contentNotAuth = useRoutes(notAuthRoutes);
    const contentAuth = useRoutes(authRoute);
    return (
        <div className="App">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {contentNotAuth}
                {contentAuth}
            </LocalizationProvider>
            <ToastMessageView />
            <Navigate ref={NavigateRef} />
        </div>
    );
}

export default App;
