import api from '../../api';
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';

function mongoDBObtainData(service, param1, param2) {
    const apiService = _get(api, `${service}.getConnections`);

    if (_isFunction(apiService)) {
            return apiService(`?fromDate=${param1}&toDate=${param2}`)
                    .then(res => {
                        return res;
                    })
                    .catch(console.error);        
    }
    
    return [];
}

export default mongoDBObtainData;