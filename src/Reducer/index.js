import commonReducer from './CommonReducer';
import truckReducer from './TruckReudcer';
import {combineReducers} from 'redux';
export default combineReducers({commonReducer,truckReducer});