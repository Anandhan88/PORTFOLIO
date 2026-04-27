import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './common/ErrorBoundary.jsx';
import './index.css';

function mountApp() {
    try {
        const rootEl = document.getElementById('root');
        if (!rootEl) {
            console.error('Root element not found');
            return;
        }
        console.log('[Boot] JS Loaded. Mounting React app...');
        const root = createRoot(rootEl);
        root.render(
            <StrictMode>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </StrictMode>
        );
    } catch (e) {
        console.error('Failed to mount React app', e);
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', mountApp, { once: true });
} else {
    mountApp();
}