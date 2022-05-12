import api from '../../api';
import fieldExtractor from '../../common/js/fieldExtractor';

const calcTimes = (time1, time2, option = '') => {
    switch (option) {
        case 'total':
            return parseInt(time1) + parseInt(time2);       
    
        default:
            return parseInt(time1) - parseInt(time2);
    }
};

const parseDate = (dateTime, type) => {
    const date = new Date();
    date.setFullYear(dateTime.substring(0, 4), dateTime.substring(4, 6) - 1, dateTime.substring(6, 8));
    switch (type) {
        case "start":
            date.setHours(0, 0, 0);
            break;
        case "end":
            date.setHours(23, 59, 59);
            break;
    
        default:
            break;
    }        
    date.setHours(date.getHours()-5);
    return date.toISOString().split(".")[0]; 
}; 

const streamateDataLoad = async (streamateData) => {
    const parseDate = (dateTime) => {        
        const date = new Date(dateTime);
        date.setHours(date.getHours()-5);
        return date.toISOString().split(".")[0]; 
    };    
    const streamateDataJson = {
        "performerNickname": fieldExtractor(streamateData, 1),
        "endTime": parseDate(fieldExtractor(streamateData, 4)),
        "totalTime": calcTimes(fieldExtractor(streamateData, 5).replace("N/A","0"), 0, 'total'),
        "payedTime": fieldExtractor(streamateData, 5).replace("N/A","0"),
        "freeTime": "0",
        "pauseTime": "0",
        "type": fieldExtractor(streamateData, 6),
        "performerEarned": fieldExtractor(streamateData, 8),
        "transactionId": fieldExtractor(streamateData, 12)
    };
    try {
        const res = await api.streamate.getDuplicated(`?transactionId=${fieldExtractor(streamateData, 12)}`);
        const isDuplicated = res.data.length === 0 ? false : true;        
        if (!isDuplicated) {
            return await api.streamate.create(streamateDataJson);
        } else {
            console.log("Este registro ya se encuentra en la BD");
            return "duplicate entry";
        }
        
    } catch(error) {
        console.error(error);
    }
};

const flirt4FreeDataLoad = async (flirt4FreeData, query) => {
    const flirt4FreeDataJson = {
        "performerNickname": fieldExtractor(flirt4FreeData, 1),
        "startTime": parseDate(query.split('-')[1], 'start'),
        "endTime": parseDate(query.split('-')[2], 'end'),
        "totalTime": fieldExtractor(flirt4FreeData, 3),
        "payedTime": "0",
        "freeTime": "0",
        "pauseTime": fieldExtractor(flirt4FreeData, 4),
        "performerEarned": fieldExtractor(flirt4FreeData, 25)
    };
    try {
        const res = await api.flirt4Free.getDuplicated(`?performerNickname=${fieldExtractor(flirt4FreeData, 1)}&startTime=${parseDate(query.split('-')[1], 'start')}&endTime=${parseDate(query.split('-')[2], 'end')}`);
        const isDuplicated = res.data.length === 0 ? false : true;        
        if (!isDuplicated) {
            return await api.flirt4Free.create(flirt4FreeDataJson);
        } else {
            console.log("Este registro ya se encuentra en la BD");
            return "duplicate entry";
        }
    } catch(error) {
        console.error(error);
    }
};

const camsodaDataLoad = async (camsodaData, query) => {  
    const camsodaDataJson = {
        "performerNickname": fieldExtractor(camsodaData, 0),
        "startTime": parseDate(query.split('-')[1], 'start'),
        "endTime": parseDate(query.split('-')[2], 'end'),
        "totalTime": (fieldExtractor(camsodaData, 1) * 3600),
        "payedTime": "0",
        "freeTime": "0",
        "pauseTime": "0",
        "performerEarned": fieldExtractor(camsodaData, 7)
    };
    try {
        const res = await api.camsoda.getDuplicated(`?performerNickname=${fieldExtractor(camsodaData, 0)}&startTime=${parseDate(query.split('-')[1], 'start')}&endTime=${parseDate(query.split('-')[2], 'end')}`);
        const isDuplicated = res.data.length === 0 ? false : true;        
        if (!isDuplicated) {
            return await api.camsoda.create(camsodaDataJson);
        } else {
            console.log("Este registro ya se encuentra en la BD");
            return "duplicate entry";
        }
    } catch(error) {
        console.error(error);
    }
};

const livejasminDataLoad = async (livejasminData) => {    
    const startDate = livejasminData[0];
    const endDate = livejasminData[1];
    const loopCount = livejasminData[2];
    const range = livejasminData[3];
    const query = `?startDate=${startDate}&endDate=${endDate}&loopCount=${loopCount}&range=${range}&`;
    return await api.livejasmin.getAPIConnections(query); 
}; 

const imLiveDataLoad = async (imLiveData) => {  
    const parseDate = (dateTime) => {        
        const date = new Date(dateTime);
        date.setHours(date.getHours()-5);
        date.setDate(date.getDate()+1);
        return date.toISOString().split(".")[0]; 
    };  
    const calculateTime = (totalEarnings, averageHour) => {
        const total = parseFloat(totalEarnings);
        const average = parseFloat(averageHour);
        const time = average === 0 ? 0 : ((total / average) * 3600);
        return time.toFixed(0);
    };        
    const imLiveDataJson = {
        "performerNickname": fieldExtractor(imLiveData, 12),
        "endTime": parseDate(fieldExtractor(imLiveData, 6)),
        "totalTime": calculateTime(fieldExtractor(imLiveData, 9), fieldExtractor(imLiveData, 10)),
        "payedTime": "0",
        "freeTime": "0",
        "pauseTime": "0",
        "performerEarned": fieldExtractor(imLiveData, 9)
    };
    try {
        const res = await api.imLive.getDuplicated(`?performerNickname=${fieldExtractor(imLiveData, 2)}&endTime=${parseDate(fieldExtractor(imLiveData, 6))}`);
        const isDuplicated = res.data.length === 0 ? false : true;        
        if (!isDuplicated) {
            return await api.imLive.create(imLiveDataJson);
        } else {
            console.log("Este registro ya se encuentra en la BD");
            return "duplicate entry";
        }
        
    } catch(error) {
        console.error(error);
    }
};

const newNoteDataLoad = async (noteData) => {
    try {
        return await api.notes.create(noteData);        
    } catch(error) {
        console.error(error);
    }
}

async function mongoDBLoadData(data, platform) {
    try {
        if (platform === 'streamate') {            
            await streamateDataLoad(data);
        } else if (platform.includes('flirt4Free')) {                
            await flirt4FreeDataLoad(data, platform);
        } else if (platform === 'imLive') {
            await imLiveDataLoad(data);
        } else if (platform === 'livejasmin') {
            await livejasminDataLoad(data);
        } else if (platform.includes('camsoda')) {
            await camsodaDataLoad(data, platform);
        } else if (platform === 'newNote') {
            await newNoteDataLoad(data);
        }
    } catch(error) {
        console.error(error);
    };    
};

export default mongoDBLoadData;