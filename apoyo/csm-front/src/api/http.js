import axios from 'axios';
import _get from 'lodash/get';
import config from './config';
import API from '../common/constants/api';

function getHttp(constAPI, params = '') {
    return axios.get(`${_get(API, constAPI)}${params}`, config);
}
 
function postHttp(constAPI, data) {
    return axios.post(_get(API, constAPI), data, config);
}

function getHttpAuth(constAPI, params = '', token) {
    return axios.get(`${_get(API, constAPI)}${params}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
    });
}
 
function postHttpAuth(constAPI, data, token) {
    return axios.post(_get(API, constAPI), data, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
    });
}

function putHttp(constAPI, id, data) {
    const url = _get(API, constAPI);
    const requestUrl = encodeURI(`${url}/${id}`);
    return axios.put(requestUrl, data, config);
}

function deleteHttp(constAPI, id) {
    const url = _get(API, constAPI);
    const requestUrl = encodeURI(`${url}/${id}`);
    return axios.delete(requestUrl, config);
}

export {
    getHttp,
    postHttp,
    putHttp,
    deleteHttp,
    getHttpAuth,
    postHttpAuth
};
