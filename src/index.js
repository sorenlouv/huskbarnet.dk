import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ListDetails from './components/ListDetails';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ListDetails />, document.getElementById('root'));
registerServiceWorker();
