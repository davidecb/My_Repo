import { getHttp, postHttp } from './http';
import _get from 'lodash/get';

const create = (data) => {
    return postHttp('NOTES.BASE', data).then(res => {
        return _get(res, 'data');
    });
};

const getConnections = (queryParams) => {
    return getHttp('NOTES.BASE', queryParams).then(res => {
        return _get(res, 'data');
    });
};

const getDuplicated = (queryParams) => {
    return getHttp('NOTES.DUPLICATED', queryParams).then(res => {
        return _get(res, 'data');
    });
};

const notes = {
    create,
    getConnections,
    getDuplicated
};  

export default notes;
