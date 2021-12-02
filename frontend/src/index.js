import React from 'react';
import ReactDom from 'react-dom';
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'


import 'bootstrap/dist/css/bootstrap.min.css';

ReactDom.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();