export const parseDate = (dateTime, option = "") => {
    const date = new Date(dateTime);
            
    if(option === "actualHour") {
        date.setHours(date.getHours()-5);
        return date.toISOString().split(".")[0];
    }else if(option === "finalHour") {
        date.setHours(18, 59, 59);
        return date.toISOString().split(".")[0];
    }else {
        date.setHours(-5, 0, 0);
        return date.toISOString().split(".")[0];
    }
};

export const getWeekStart = (dateOfWeek) => {
    const date = new Date(dateOfWeek);
    while (date.getDay() !== 0) {
        date.setDate(date.getDate()-1);
    }
    return date;
};

export const getMonthStart = (dateOfMonth) => {
    const date = new Date(dateOfMonth);    
    date.setDate(1);
    return date;
};

export const timeInHMS = (seconds) => {
    const timeHMS = {
        'hours':'0',
        'minutes':'0',
        'seconds':'0'
    };        
    timeHMS.hours = Math.floor(seconds / 3600);
    timeHMS.minutes = Math.floor((seconds - (timeHMS.hours * 3600)) / 60);
    timeHMS.seconds = seconds - (timeHMS.hours * 3600) - (timeHMS.minutes * 60);
  
    return timeHMS.hours.toString().padStart(2,'0') 
        + ":" + timeHMS.minutes.toString().padStart(2,'0') 
        + ":" + timeHMS.seconds.toString().padStart(2,'0');
};

export const formatNumber = (number, decimals = 0) => {
    return number.toLocaleString('en-EN', {minimumFractionDigits: 0, maximumFractionDigits: decimals});
};
