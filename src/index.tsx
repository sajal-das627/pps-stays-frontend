import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { apolloClient } from './apollo/client';
import { store } from './app/store';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </BrowserRouter>
);
