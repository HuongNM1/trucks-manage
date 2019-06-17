import axios from 'axios';

class Data{
    async getData(apiLink, cbSuccess, cbFail) {
        const result = await axios.get('http://localhost:3008/');
        if (result && 200 === result.status && result.data) {
            return result;
        }
    }
}

export default Data;

