import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import {AuthProvider} from '../src/Context/index'
import {SearchProvider} from '../src/Context/search'
import {CartProvider} from '../src/Context/cart'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <Router>
            <App />
          </Router>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
);

