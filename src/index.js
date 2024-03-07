import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './components/App';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-qhgfkr0etqb456hu.us.auth0.com"
    clientId="OC9tXXp10cH0oMmzs4bgkBXmPQPTe39V"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
);