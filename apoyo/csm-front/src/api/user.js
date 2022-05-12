import { getHttp, postHttp, getHttpAuth, postHttpAuth } from './http';
import _get from 'lodash/get';

const create = (data) => {
    return postHttp('USER.BASE', data).then(res => {
        return _get(res, 'data');
    });
};

const login = (data) => {
    return postHttp('USER.LOGIN', data).then(res => {
        return _get(res, 'data');
    });
};

const logout = (data, token) => {
    return postHttpAuth('USER.LOGOUTALL', data, token).then(res => {
        return _get(res, 'data');
    });
};

const getUsers = (queryParams) => {
    return getHttp('USER.GETUSERS', queryParams).then(res => {
        return _get(res, 'data');
    });
};

const getAuth = (queryParams, token) => {
    return getHttpAuth('USER.GETAUTH', queryParams, token).then(res => {
        return _get(res, 'data');
    });
};

const user = {
    create,
    login,
    logout,
    getUsers,
    getAuth
};  

export default user;
