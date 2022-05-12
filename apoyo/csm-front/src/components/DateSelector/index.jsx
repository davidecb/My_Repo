import { useState } from 'react';
import { connect } from 'react-redux';
import { setFromDate, setToDate } from '../../redux/actions/logInfoActions';
import { parseDate, getWeekStart, getMonthStart } from '../../common/js/dateFormaters';
import DatePicker from 'react-datepicker';
import './DateSelector.scss';

function DateSelector({ fromDate, toDate, setFromDate, setToDate }) {    
    let dNow = new Date();

    const weekRangeSelector = () => {
        dNow = new Date();   
        setEndDate(dNow);
        setToDate(parseDate(dNow, "actualHour"));
        setStartDate(getWeekStart(dNow));
        setFromDate(parseDate(getWeekStart(dNow)));
        //setDateChanging(!isDateChanging);
    };

    const monthRangeSelector = () => {
        dNow = new Date();   
        setEndDate(dNow);
        setToDate(parseDate(dNow, "actualHour"));
        setStartDate(getMonthStart(dNow));
        setFromDate(parseDate(getMonthStart(dNow)));
        //setDateChanging(!isDateChanging);
    };

    const todayRangeSelector = () => {
        dNow = new Date();   
        setEndDate(dNow);
        setToDate(parseDate(dNow, "actualHour"));
        setStartDate(dNow);
        setFromDate(parseDate(dNow));
        //setDateChanging(!isDateChanging);
    };

    const startDateSelected = (date) => {
        setStartDate(date);  
        setFromDate(parseDate(date));
        //setDateChanging(!isDateChanging);
    };

    const endDateSelected = (date) => {        
        setEndDate(date);  
        setToDate(parseDate(date, "finalHour"));
        //setDateChanging(!isDateChanging);
    };
       
    const [startDate, setStartDate] = useState(new Date(fromDate));
    const [endDate, setEndDate] = useState(new Date(toDate));
   
    return(
        <div className="DateSelector">
            <div className="DateSelector__pickerContainer">
                <DatePicker
                    selected={startDate}
                    onChange={startDateSelected}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                />
                <DatePicker
                    selected={endDate}
                    onChange={endDateSelected}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
            </div>
            <button className="DateSelector__monthButton" onClick={monthRangeSelector}>Mes</button>
            <button className="DateSelector__weekButton" onClick={weekRangeSelector}>Sem</button>
            <button className="DateSelector__todayButton" onClick={todayRangeSelector}>Hoy</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state.logInfo 
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFromDate: (fromDate) => dispatch(setFromDate(fromDate)),
        setToDate: (toDate) => dispatch(setToDate(toDate))
    }
}
       
export default connect(mapStateToProps, mapDispatchToProps)(DateSelector);
