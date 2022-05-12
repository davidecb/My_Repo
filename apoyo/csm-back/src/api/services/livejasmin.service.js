const  axios = require('axios');
const  _get = require('lodash/get');
const BaseService = require('./base.service');
let _livejasminRepository = null;
const baseUrl = 'https://partner-api.modelcenter.jasmin.com';                
class LivejasminService extends BaseService {
    constructor({ LivejasminRepository }) {
        super(LivejasminRepository);
        _livejasminRepository = LivejasminRepository;
    }
    
    async create(entity) {
        return await _livejasminRepository.create(entity);
    }    

    async getFromApi(dateNow, loopCount, range = 'minute', performerState) {
        const calcTimes = (time1, time2, option = '') => {
            switch (option) {
                case 'total':
                    return time1 + time2;       
            
                default:
                    return time1 - time2;
            }
        };

        const parseDateCOL = (dateTime) => {
            const date = new Date(dateTime);
            date.setHours(date.getHours()-6);
            date.setMilliseconds(0);                                              
            return date.toISOString();//.replace(/(:)/g, '%3A'); 
        };

        const parseDateISO = (dateTime, type = "start") => {
            const date = new Date(dateTime);
            date.setHours(date.getHours()+1);
            if (type !== "start") {                
                date.setSeconds(date.getSeconds()-1);
            }
            return date.toISOString().split(".")[0]; 
        };

        const getDuplicated = async (searchQuery) => {
            return await _livejasminRepository.getDuplicated(searchQuery);
        };

        try {
            const toDate = new Date(dateNow);
            const fromDate = new Date(dateNow);
            switch (range) {
                case 'minute':
                    fromDate.setMinutes(fromDate.getMinutes()-loopCount);
                    break; 
            
                case 'hour':
                    fromDate.setHours(fromDate.getHours()-loopCount);
                    break;
            
                case 'day':
                    fromDate.setDate(fromDate.getDate()-loopCount);
                    break;
            
                default:
                    break;
            };

            const searchQuery = {
                "startTime": parseDateCOL(fromDate),
                "endTime": parseDateCOL(toDate)
            };

            const res = await getDuplicated(searchQuery);
            const isDuplicated = res.length === 0 ? false : true;        
            if (!isDuplicated) {
                try {              
                    //const performerStates = 'performerStates[]=new&performerStates[]=pending&performerStates[]=rejected&performerStates[]=active&performerStates[]=suspended&performerStates[]=closed';
                    const performerStates = `performerStates[]=${performerState}`;
                    const queryString = `?fromDate=${parseDateCOL(fromDate)}&toDate=${parseDateCOL(toDate)}&${performerStates}`;
                    //const queryString1 = '?fromDate=2021-07-31T22:00:00.000Z&toDate=2021-08-14T22:00:00.000Z&screenNames[]=NaomiiBlack&reports[]=general-overview&reports[]=working-time';
                    console.log("@fromDateParse: ", parseDateCOL(fromDate));
                    console.log("@toDateParse: ", parseDateCOL(toDate));
                    console.log("@queryString:", queryString);
                                                                
                    const obtained = await axios.get(`${baseUrl}/v1/reports/performers${queryString}`, {
                        method: 'GET',
                        contentType: 'application/json',
                        headers: {
                            'Access-Control-Allow-Origin': '*', 
                            'Authorization': 'Bearer 42b1ecc7aa2bd20bc51afad67b6990c8454d3f8547895eb38949d576ade0fe71'
                        }
                    });            
                    const items = await _get(obtained, 'data.data', []);
                    const itemsFiltered = items.filter(({total}) => (total.earnings.value != 0 || total.workTime.value != 0));
                    const connections = itemsFiltered.map(({screenName, date, total, workingTime}) => {
                        const connection = {
                            performerNickname: screenName,
                            startTime: parseDateISO(date.from),
                            endTime: parseDateISO(date.to, "end"),
                            totalTime: total.workTime.value,
                            payedTime: calcTimes(total.workTime.value, workingTime.free.value),
                            freeTime: workingTime.free.value,
                            pauseTime: 0,
                            performerEarned: total.earnings.value
                        };
                        return connection;
                    });
                    console.log("@connections: ", connections.length);
                    return connections;
                } catch (err) {
                    throw err; 
                }
            } else {
                console.log("Este registro ya se encuentra en la BD");
                return "duplicated";                
            }                   
        } catch (err) {
            console.log(err.response ? "error" : err);
            return "error"; 
        }
    } 
}

module.exports = LivejasminService;
