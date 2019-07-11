import { FETCHING_DATA } from '../actiontypes';
const initialState = {
    load: true
}
export default function commonReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_DATA:
            return state;
        default:
            return state;
    }
}
