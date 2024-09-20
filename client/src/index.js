import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import {AuthProvider} from '../src/Context/index'
import {SearchProvider} from '../src/Context/search'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
      <SearchProvider>
          <Router>
            <App />
          </Router>
      </SearchProvider>
    </AuthProvider>
);

