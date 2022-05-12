export const SET_LOG_INFO = 'SET_LOG_INFO'
export const SET_FROM_DATE = 'SET_FROM_DATE'
export const SET_TO_DATE = 'SET_TO_DATE'


export const setLogInfo = (logInfo) => ({
    type: SET_LOG_INFO,
    payload: logInfo
})

export const setFromDate = (fromDate) => ({
    type: SET_FROM_DATE,
    payload: fromDate
})

export const setToDate = (toDate) => ({
    type: SET_TO_DATE,
    payload: toDate
})