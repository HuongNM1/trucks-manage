
import axios from 'axios';
import { GET_DATA_ERROR } from '../services/messages';
import { SCUCCESS_CODE } from '../services/consts';

var Functions = (function () {
    return {
        getData: async function (apiLink) {
            const result = await axios.get(apiLink);
            if (result && SCUCCESS_CODE === result.status) {
                return { data: result.data };
            } else {
                return { errMsg: GET_DATA_ERROR, data: [] };
            }
        }
    }
})();

export default Functions;