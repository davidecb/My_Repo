import { getHttp, postHttp, getHttpAuth, postHttpAuth } from './http';
import _get from 'lodash/get';

const create = (data, token) => {
    return postHttpAuth('PERFORMER.BASE', data, token).then(res => {
        return _get(res, 'data');
    });
};

const getPerformers = (queryParams) => {
    return getHttp('PERFORMER.BASE', queryParams).then(res => {
        return _get(res, 'data');
    });
};

const performer = {
    create,
    getPerformers
};  

export default performer;
