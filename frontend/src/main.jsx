import React from 'react';
import ReactDOM from 'react-dom/client';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import App from './App';
import { AUTH_ENABLED, msalConfig } from './authConfig';
import './styles/global.css';

let root;
if (AUTH_ENABLED) {
  const msalInstance = new PublicClientApplication(msalConfig);
  await msalInstance.initialize();
  root = (
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  );
} else {
  root = <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>{root}</React.StrictMode>
);
