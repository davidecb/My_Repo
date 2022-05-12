//const base = '/api/v1';
const base = 'https://csm-modelsociety-server.herokuapp.com/api/v1';
const API = {
    STREAMATE: {
        BASE: `${base}/streamate`,
        DUPLICATED: `${base}/streamate/duplicated`
    },
    LIVEJASMIN: {
        BASE: `${base}/livejasmin`,
        APICONNECTIONS: `${base}/livejasmin/getfromapirange`
    },
    FLIRT4FREE: {
        BASE: `${base}/flirt4Free`,
        DUPLICATED: `${base}/flirt4Free/duplicated`
    },
    IMLIVE: {
        BASE: `${base}/imLive`,
        DUPLICATED: `${base}/imLive/duplicated`
    },
    CAMSODA: {
        BASE: `${base}/camsoda`,
        DUPLICATED: `${base}/camsoda/duplicated`
    },
    USER: {
        BASE: `${base}/user`,
        LOGIN: `${base}/user/login`,
        LOGOUT: `${base}/user/logout`,
        LOGOUTALL: `${base}/user/logoutAll`,
        GETUSERS: `${base}/user/getUsers`,
        GETAUTH: `${base}/user/getAuth`,
    },
    PERFORMER: {
        BASE: `${base}/performer`
    },
    NOTES: {
        BASE: `${base}/note`
    }
};

export default API;
