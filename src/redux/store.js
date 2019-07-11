import { createStore, applyMiddleware } from 'redux';
import rootReducers from './reducers';
import * as middlewares from './middlewares';
const appMiddleware = applyMiddleware(middlewares.asynFn);
export default createStore(rootReducers, appMiddleware);