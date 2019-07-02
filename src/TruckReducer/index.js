import TruckModel from '../services/truckModel';
import * as types from '../constants/index';
import { listAll } from '../actions/index';

const initialState = {
    header: [],
    dataList: [],
    sortBy: 0,
    sortType: 0,
    load: true,
    dataFilterList: [],
    dataListPage: [],
    openInputForm: false,
    typeInputForm: 0,
    dataModel: {},
    formType: 0,
    pageIdx: 0,
    maxDisplayPages: 5,
    numberItemOnePage: 10,
    searchBy: '',
    searchString: ''
};

function truckReducer(state = initialState, action) {
    switch (action.type) {
        case types.LIST_ALL:
            console.log(types.LIST_ALL);
            return state;
    }
    console.log(state);
    return state;
}
export default truckReducer;