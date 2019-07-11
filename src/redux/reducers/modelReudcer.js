import * as types from '../actiontypes';

const initialState = {
    header: [],
    dataList: [],
    sortBy: 0,
    sortType: 0,
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

function modelReducer(state = initialState, action) {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.FETCH_DATA_SUCCESS:
            const st = Object.assign({}, state, { load: false }, action.data);
            console.log('FETCH_DATA_SUCCESS reducer', st);
            return st;
        default:
            return state;
    }
}

export default modelReducer;