import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mongoDBObtainData from '../../common/js/mongoDBObtainData';
import fillModelsConnections from '../../common/js/fillModelsConnections';
import EarningsCard from '../../components/EarningsCard';
import TotalsCard from '../../components/TotalsCard';
import 'react-datepicker/dist/react-datepicker.css';
import './Historical.scss';

function Historical({ fromDate, toDate, team }) {
    const [isDataAvailable, setDataAvailable] = useState(false);
    const [modelsData, setModelsData] = useState([]);
    const [periodTotals, setPeriodTotals] = useState([]);

    const calcWorkingHours = () => {        
        const fromDateNum = new Date(fromDate.split('T')[0]).getTime();
        const toDateNum = new Date(toDate.split('T')[0]).getTime();
        const datesDiff = toDateNum - fromDateNum;
        const milisecondsToDays =  1000 * 60 * 60 * 24;
        const daysBetween = (datesDiff / milisecondsToDays) + 1;
        const workingHours = daysBetween * 5.714;
        return workingHours;        
    }
    const [workingHours, setWorkingHours] = useState(calcWorkingHours());

    useEffect(() => {
        async function fetchData() {
            try {                
                const streamate = mongoDBObtainData('streamate', fromDate, toDate);
                const livejasmin = mongoDBObtainData('livejasmin', fromDate, toDate);
                const flirt4Free = mongoDBObtainData('flirt4Free', fromDate, toDate);
                const imLive = mongoDBObtainData('imLive', fromDate, toDate);
                const [bodyStreamate, bodyLivejasmin, bodyFlirt4Free, bodyImLive] = await Promise.all([streamate, livejasmin, flirt4Free, imLive]);
                const body = [ ...bodyStreamate.data, ...bodyLivejasmin.data, ...bodyImLive.data, ...bodyFlirt4Free.data ];
                
                if (body.length > 0) {
                    setDataAvailable(true);
                    const connections = await fillModelsConnections(body, team, fromDate);
                    console.log("@connectionsHist:", connections);
                    const totals = connections.shift();
                    setPeriodTotals(totals);
                    setModelsData(connections);
                    setWorkingHours(calcWorkingHours())
                } else {
                    setDataAvailable(false);
                    setModelsData([]); 
                }            
            } catch(error) {
                console.log('@error: ', error);
            }            
        }
        fetchData();
    },[fromDate, toDate]);   
   
    return (        
        <div className="historical">
            {!isDataAvailable && <h2 className="historical__noDataTitle" >No hay datos disponibles para esta fecha</h2>}
            {isDataAvailable && 
                <div className="historical__dataView dataView">
                    <TotalsCard periodTotals={periodTotals}
                        fromDate={fromDate}
                        toDate={toDate} 
                    />
                    {modelsData.map((model, index) => {
                        return (
                            <EarningsCard index={index} 
                                key={index} 
                                info={model.info}  
                                profits={model.profits} 
                                totalTime={model.times.totalTime} 
                                freeTime={model.times.freeTime} 
                                payedTime={model.times.payedTime} 
                                pauseTime={model.times.pauseTime} 
                                notes={model.notes}
                                workingHours={workingHours} 
                            />
                        );
                    })}            
                </div>
            }           
        </div>
    );
}

const mapStateToProps = (state) => {
    return state.logInfo
}
       
export default connect(mapStateToProps)(Historical);
