import React, { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
const App = lazy(() => import("@/components/App"));
import { LanguageProvider } from './context/LanguageContext';
import Loader from '@/components/Loader'; // Sizda bor Loader

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Suspense fallback={<Loader />}>
            <BrowserRouter>
                <LanguageProvider>
                    <App />
                </LanguageProvider>
            </BrowserRouter>
        </Suspense>
    </StrictMode>
);
