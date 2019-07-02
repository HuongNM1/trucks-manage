import React from 'react';
import ReactDOM from 'react-dom';

import truckReducer from './TruckReducer/index';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './App';
import './custom.scss';
import * as serviceWorker from './serviceWorker';

const store = createStore(truckReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
