import { getHttp, postHttp } from './http';
import _get from 'lodash/get';

const create = (data) => {
    return postHttp('CAMSODA.BASE', data).then(res => {
        return _get(res, 'data');
    });
};

const getConnections = (queryParams) => {
    return getHttp('CAMSODA.BASE', queryParams).then(res => {
        return _get(res, 'data');
    });
};

const getDuplicated = (queryParams) => {
    return getHttp('CAMSODA.DUPLICATED', queryParams).then(res => {
        return _get(res, 'data');
    });
};

const camsoda = {
    create,
    getConnections,
    getDuplicated
};  

export default camsoda;
