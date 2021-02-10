import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'jotai';
import { QueryClient, QueryClientProvider } from 'react-query';
import './assets/styles/index.css';
import "react-toastify/dist/ReactToastify.min.css";
import App from './App';
import reportWebVitals from './reportWebVitals';

// import { AppProvider } from './store/context';

export const history = createBrowserHistory();

const queryClient = new QueryClient()

ReactDOM.render(
  <Router history={history}>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <App />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
