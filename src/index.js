import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App, Game} from './App';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();
