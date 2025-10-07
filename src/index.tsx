import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

export const FDPApp = App;

let rootEl: HTMLElement | null = document.getElementById('fdp-root');
if (!rootEl) {
  rootEl = document.createElement('div');
  rootEl.id = 'fdp-root';
  document.body.appendChild(rootEl);
}
const root = ReactDOM.createRoot(rootEl);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
