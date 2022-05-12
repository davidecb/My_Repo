import { SET_LOG_INFO, SET_FROM_DATE, SET_TO_DATE } from '../actions/logInfoActions';
import { getWeekStart, parseDate } from '../../common/js/dateFormaters';

const initialState = {
        'role': sessionStorage.getItem('role'),
        'team': sessionStorage.getItem('team'),
        'token': sessionStorage.getItem('token'),
        'fromDate': parseDate(getWeekStart(new Date())),
        'toDate': parseDate(new Date())
};
  
function logInfo (state = initialState, action) {
    switch (action.type) {
        case SET_LOG_INFO:            
            return {
                ...state,
                'role': action.payload.role,
                'team': action.payload.team,
                'token': action.payload.token,
                'fromDate': action.payload.fromDate,
                'toDate': action.payload.toDate
            }

        case SET_FROM_DATE:            
            return {
                ...state,
                'fromDate': action.payload
            }

        case SET_TO_DATE:            
            return {
                ...state,
                'toDate': action.payload
            }

        default:
            return state
    }
}
  
export default logInfo;