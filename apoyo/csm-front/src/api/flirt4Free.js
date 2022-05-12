import { getHttp, postHttp } from './http';
import _get from 'lodash/get';

const create = (data) => {
    return postHttp('FLIRT4FREE.BASE', data).then(res => {
        return _get(res, 'data');
    });
};

const getConnections = (queryParams) => {
    return getHttp('FLIRT4FREE.BASE', queryParams).then(res => {
        return _get(res, 'data');
    });
};

const getDuplicated = (queryParams) => {
    return getHttp('FLIRT4FREE.DUPLICATED', queryParams).then(res => {
        return _get(res, 'data');
    });
};

const flirt4Free = {
    create,
    getConnections,
    getDuplicated
};  

export default flirt4Free;
