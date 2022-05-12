import { getHttp, postHttp } from './http';
import _get from 'lodash/get';

const create = (data) => {
    return postHttp('STREAMATE.BASE', data).then(res => {
        return _get(res, 'data');
    });
};

const getConnections = (queryParams) => {
    return getHttp('STREAMATE.BASE', queryParams).then(res => {
        return _get(res, 'data');
    });
};

const getDuplicated = (queryParams) => {
    return getHttp('STREAMATE.DUPLICATED', queryParams).then(res => {
        return _get(res, 'data');
    });
};

const streamate = {
    create,
    getConnections,
    getDuplicated
};  

export default streamate;
