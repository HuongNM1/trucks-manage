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

function searchBy(state, searchBy, searchString) {
    let { dataList, dataFilterList, header } = state;
    // handle search
    dataFilterList = dataList.filter((value, index) => {
        if ('' === searchBy) {
            for (let i = 0; i < header.length; i++) {
                if (header[i].searchAble &&
                    value[header[i].key].toString().toLowerCase().indexOf(searchString.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        } else {
            return value[searchBy].toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
        }
    });
    return {
        pageIdx: 0,
        dataFilterList,
        dataListPage: dataFilterList.slice(state.pageIdx, state.pageIdx + state.numberItemOnePage)
    };
}

function onSort(state, sortBy, sortType) {
    const { dataFilterList } = state;
    dataFilterList.sort((d1, d2) => {
        if (0 === sortType) {// sort a->z, min->max
            if (d1[sortBy] > d2[sortBy]) {
                return 1;
            } else if (d1[sortBy] < d2[sortBy]) {
                return -1;
            } else {
                return 0;
            }
        } else if (1 === sortType) {// sort z->a, max->min
            if (d1[sortBy] > d2[sortBy]) {
                return -1;
            } else if (d1[sortBy] < d2[sortBy]) {
                return 1;
            } else {
                return 0;
            }
        }
    });
    return {
        sortBy,
        sortType,
        dataFilterList,
        dataListPage: dataFilterList.slice(state.pageIdx, state.pageIdx + state.numberItemOnePage)
    };
}

function onOpenEditForm(state, truckId) {
    let dataModel = {};
    for (let i = 0; i < state.dataList.length; i++) {
        if (truckId === state.dataList[i]['id']) {
            Object.keys(state.dataList[i]).forEach((key, idx) => {
                dataModel[key] = { value: state.dataList[i][key], errorCode: null }
            });
            return {
                openInputForm: true,
                formType: 1,
                dataModel: dataModel
            };
        }
    }
}

function onDelete(state, truckId) {
    let cf = window.confirm('Do you really want to delete this truck information?');
    if (true === cf) {
        let { dataList } = state;
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i]['id'] === truckId) {
                dataList.splice(i, 1);
                sessionStorage.setItem('dataList', JSON.stringify(dataList));
                searchBy(state, state.searchBy, state.searchString);
                onSort(state, state.sortBy, state.sortType);
                return {
                    dataList: dataList
                };
            }
        }
    }
}

function onChangePage(state, pageIdx) {
    return {
        pageIdx: pageIdx,
        dataListPage: state.dataFilterList.slice((pageIdx * state.numberItemOnePage), (pageIdx * state.numberItemOnePage + state.numberItemOnePage))
    };
}

function modelReducer(state = initialState, action) {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.FETCH_DATA_SUCCESS:
            const st = Object.assign({}, state, { load: false }, action.data);
            return st;
        case types.ON_SORT:
            const sortResult = onSort(state, action.key, action.sortType)
            return Object.assign({}, state, sortResult);
        case types.ON_OPEN_EDIT_FORM:
            const openEditFormResult = onOpenEditForm(state, action.id);
            return Object.assign({}, state, openEditFormResult);
        case types.ON_DELETE:
            const deleteResult = onDelete(state, action.id);
            return Object.assign({}, state, deleteResult);
        case types.ON_CHANGE_PAGE:
            const changePageResult = onChangePage(state, action.id);
            return Object.assign({}, state, changePageResult);
        default:
            return state;
    }
}

export default modelReducer;