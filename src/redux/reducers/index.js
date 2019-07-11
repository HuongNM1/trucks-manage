import CommonReducer from './commonReducer';
import ModelReudcer from './modelReudcer';
import {combineReducers} from 'redux';
export default combineReducers({common: CommonReducer,model: ModelReudcer});