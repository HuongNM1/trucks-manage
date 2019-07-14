import * as types from '../actiontypes';
import TruckModel from '../../services/truckModel';

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

function onSort(state, sortByInput = null, sortTypeInput = null) {
    const { dataFilterList } = state;
    const sortType = null === sortTypeInput ? state.sortType : sortTypeInput;
    const sortBy = null === sortByInput ? state.sortBy : sortByInput;
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

function handleDataAfterGet(dataServer, state) {
    const dataList = sessionStorage.getItem('dataList');
    let data = null;
    if (dataList) {
        try {
            data = JSON.parse(dataList);
        } catch (e) {
            console.log(e);
        }
    }

    if (data) {
        dataServer['dataList'] = data;
    }

    const stateTemp = Object.assign({}, state, { load: false }, {
        header: dataServer['header'],
        mapping: dataServer['mapping'],
        pageIdx: 0,
        attributesInum: dataServer['attributesInum'],
        dataList: dataServer['dataList'],
        dataFilterList: dataServer['dataList'],
        dataListPage: dataServer['dataList'].slice(state.pageIdx, state.pageIdx + state.numberItemOnePage)
    });
    return stateTemp;
}

function onSubmitForm(dataModel, state) {
    const getDataModelValue = (dataModel) => {
        let dataValue = {};
        Object.keys(dataModel).forEach((key, idx) => {
            if ('function' === typeof TruckModel[key].showValue) {
                let keyForValue = key.split('-show')[0];
                dataValue[key] = TruckModel[key].showValue(dataModel, key, dataModel[keyForValue].value, state.mapping[keyForValue]);
            } else {
                dataValue[key] = dataModel[key].value;
            }
        });
        return dataValue;
    }

    let { dataList } = state;
    if (0 === state.formType) {
        dataModel['id'].value = dataList[dataList.length - 1]['id'] + 1;
        dataList.push(getDataModelValue(dataModel));
    } else if (1 === state.formType) {
        let dataValue = getDataModelValue(dataModel);
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].id == dataValue['id']) {
                dataList[i] = { ...dataValue };
                break;
            }
        }
    }
    // this.setState({
    //     dataList: dataList
    // }, () => { this.proccessDataShow(); })
    sessionStorage.setItem('dataList', JSON.stringify(dataList));
    return { dataList, openInputForm: false };
}

function modelReducer(state = initialState, action) {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.FETCH_DATA_SUCCESS:
            return handleDataAfterGet(action.data, state);
        case types.ON_SORT:
            const sortResult = onSort(state, action.key, action.sortType);
            return Object.assign({}, state, sortResult);
        case types.ON_OPEN_EDIT_FORM:
            const openEditFormResult = onOpenEditForm(state, action.id);
            return Object.assign({}, state, openEditFormResult);
        case types.ON_DELETE:
            const deleteResult = onDelete(state, action.id);
            return Object.assign({}, state, deleteResult);
        case types.ON_CHANGE_PAGE:
            const changePageResult = onChangePage(state, action.page);
            return Object.assign({}, state, changePageResult);
        case types.ON_CLOS_FORM:
            return Object.assign({}, state, { openInputForm: false });
        case types.ON_SUBMIT_FORM:
            const dataSubmit = onSubmitForm(action.dataModel, state);
            const stateTemp = Object.assign({}, state, dataSubmit);
            const stateComplete = onSort(stateTemp);
            return Object.assign({}, state, stateComplete);
        default:
            return state;
    }
}

export default modelReducer;