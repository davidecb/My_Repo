import { getHttp, postHttp } from './http';
import _get from 'lodash/get';

const create = (data) => {
    return postHttp('LIVEJASMIN.BASE', data).then(res => {
        return _get(res, 'data');
    });
};

const getConnections = (queryParams) => {
    return getHttp('LIVEJASMIN.BASE', queryParams).then(res => {
        return _get(res, 'data');
    });
};

const getAPIConnections = (queryParams) => {
    return getHttp('LIVEJASMIN.APICONNECTIONS', queryParams).then(res => {
        return _get(res, 'data');
    });
};

const livejasmin = {
    create,
    getConnections,
    getAPIConnections
};  

export default livejasmin;
