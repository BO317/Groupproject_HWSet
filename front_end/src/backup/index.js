import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import App_input from './input';
import App1 from './App1';
import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <App1 />
    </StrictMode>
)
