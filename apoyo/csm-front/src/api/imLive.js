import { getHttp, postHttp } from './http';
import _get from 'lodash/get';

const create = (data) => {
    return postHttp('IMLIVE.BASE', data).then(res => {
        return _get(res, 'data');
    });
};

const getConnections = (queryParams) => {
    return getHttp('IMLIVE.BASE', queryParams).then(res => {
        return _get(res, 'data');
    });
};

const getDuplicated = (queryParams) => {
    return getHttp('IMLIVE.DUPLICATED', queryParams).then(res => {
        return _get(res, 'data');
    });
};

const imLive = {
    create,
    getConnections,
    getDuplicated
};  

export default imLive;
