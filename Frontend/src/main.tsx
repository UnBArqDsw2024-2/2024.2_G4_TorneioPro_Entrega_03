import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './theme/theme.css'
import App from './App.tsx'
import {AuthProvider} from "./context/AuthContext.tsx";
import {ThemeProvider} from './context/ThemeProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider>
                <App/>
            </ThemeProvider>
        </AuthProvider>
    </StrictMode>
)