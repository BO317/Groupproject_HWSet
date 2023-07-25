import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import App_input from './input';
import App1 from './App1';
import App2 from './App2';
import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App1 />
    </BrowserRouter>
)
