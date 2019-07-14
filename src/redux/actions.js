import * as types from './actiontypes';
import Fn from '../common/functions';
export function listAll() {
    return {
        type: types.LIST_ALL
    };
}

export function startFetchData() {
    return {
        type: types.FETCHING_DATA
    };
}
export function fetchDataSuccess(data) {
    return {
        type: types.FETCH_DATA_SUCCESS,
        data
    };
}
export function fetchDataFail(errMsg) {
    return {
        type: types.FETCH_DATA_FAIL,
        errMsg
    };
}

export const asynAction = api => {
    return function (dispatch) {
        dispatch(startFetchData());
        return Fn.getData(api).then(rs => {
            if(null == rs['errMsg']){
                dispatch(fetchDataSuccess(rs['data']));
            }else{
                dispatch(fetchDataFail(rs['errMsg']));
            }
        });
    };
}

export const onSortAction = (key, sortType)=>{
    return {
        type: types.ON_SORT,
        key, 
        sortType
    };
}

export const onOpenEditFormAction = id =>{
    return {
        type: types.ON_OPEN_EDIT_FORM,
        id
    };
}

export const onDeleteAction = id =>{
    return {
        type: types.ON_DELETE,
        id
    };
}

export const onChangePageAction = page =>{
    return {
        type: types.ON_CHANGE_PAGE,
        page: page
    }
}

export const onSubmitFormAction = dataModel =>{
    return {
        type: types.ON_SUBMIT_FORM,
        dataModel: dataModel
    }
}

export const onCloseFormAction = ()=>{
    return {
        type: types.ON_CLOS_FORM,
    }
}