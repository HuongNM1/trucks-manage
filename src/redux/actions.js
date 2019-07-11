import * as types from './actiontypes';
import Fn from '../common/functions';
export function listAll() {
    return {
        type: types.LIST_ALL
    }
}

export function startFetchData() {
    return {
        type: types.FETCHING_DATA
    }
}
export function fetchDataSuccess(data) {
    return {
        type: types.FETCH_DATA_SUCCESS,
        data
    }
}
export function fetchDataFail(errMsg) {
    return {
        type: types.FETCH_DATA_FAIL,
        errMsg
    }
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

    }
}