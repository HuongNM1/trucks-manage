import React from 'react';
import ReactDOM from 'react-dom';

import Reducers from './Reducer/index';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './App';
import './custom.scss';
import * as serviceWorker from './serviceWorker';

const store = createStore(Reducers);
console.log('store.getState: ',store.getState());
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
