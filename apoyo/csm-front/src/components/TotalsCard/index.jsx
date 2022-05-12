import { useState } from 'react';
import { timeInHMS, formatNumber } from '../../common/js/dateFormaters';
import './TotalsCard.scss';

function TotalsCard({periodTotals, fromDate, toDate}) {
    const [rate, setRate] = useState(3714.94);
    const [isProfitsClicked, setProfitsClicked] = useState(false);
    console.log("@periodTotals:", periodTotals);
    
    const timeEngagement = (totalTime, freeTime) => {
        const payedTime = totalTime - freeTime;
        const engagement = (payedTime * 100) / totalTime;
        return formatNumber(engagement, 2);
    };

    const profitsClicked = () => {        
        setProfitsClicked(!isProfitsClicked);
    };

    return(
    <div className="totalsCard">
        <div className="totalsCard__totalsContainer">
            <div className="totalsCard__modelsCount modelsCount">
                {periodTotals && periodTotals.models &&
                    <span className="modelsCount__totalModels">{periodTotals.models}</span>}
                <span className="modelsCount__totalModelsTitle periodTitle">TOTAL MODELOS</span>
            </div>
            <div className="totalsCard__periodProfit periodProfit" onClick={profitsClicked}>                
                {periodTotals && periodTotals.profits && 
                    <span className="periodProfit__profitUS">
                        $ {formatNumber(periodTotals.profits.total, 2)} USD
                    </span>}
                <span className="periodProfit__profitTitle periodTitle">GANANCIA TOTAL</span>                        
            </div>
            <div className="totalsCard__profitPerSecond profitPerSecond">
                {periodTotals && periodTotals.profits && 
                    <span className="profitPerSecond__profitUS">
                        $ {formatNumber((periodTotals.profits.total / periodTotals.times.totalTime.total), 4)} USD
                    </span>}
                <span className="profitPerSecond__profitTitle periodTitle">GANANCIA / SEG.</span>                        
            </div>
            <div className="totalsCard__periodTime periodTime">
            {periodTotals && periodTotals.times && 
                <span className="periodTime__totalFreeTime">
                    free: {timeInHMS(periodTotals.times.freeTime.total)}
                </span>}
            {periodTotals && periodTotals.times && 
                <span className="periodTime__totalPauseTime">
                    pause: {timeInHMS(periodTotals.times.pauseTime.total)}
                </span>}
            {periodTotals && periodTotals.times && 
                <span className="periodTime__totalPayedTime">
                    Pago: {timeInHMS(periodTotals.times.payedTime.total)}
                </span>}
            {periodTotals && periodTotals.times && 
                <span className="periodTime__totalTime">
                    total: {timeInHMS(periodTotals.times.totalTime.total)}
                </span>}
            {periodTotals && periodTotals.times && 
                <span className="periodTime__engagement">
                    {timeEngagement(periodTotals.times.totalTime.total, periodTotals.times.freeTime.total)} %
                </span>}
                <span className="periodTime__timeTitle periodTitle">TIEMPOS</span>                        
            </div>
            <div className="totalsCard__periodDates periodDates">
                <span className="periodDates__fromDate">Desde: {fromDate.replace("T"," ")}</span>
                <span className="periodDates__toDate">Hasta: {toDate.replace("T"," ")}</span>
                <span className="periodDates__datesTitle periodTitle">PERIODO</span>                    
            </div>
        </div>
        {isProfitsClicked && 
            <div className="totalsCard__platforms platforms">
            {
                Object.keys(periodTotals.profits).map((key, index) => {
                    if(key === "total") {return "";}
                    const imageURL = `/${key.toLowerCase()}.png`;
                    return(
                        <div key={index} className="platforms__totals totals">
                            <div className="totals__title">
                                <img src={imageURL} 
                                    alt="imagen no disponible" 
                                    title={key.toLowerCase()}
                                    width="100%" />
                            </div>
                            <div className="totals__child">
                                <span>Total</span>
                                <span>$ {formatNumber(periodTotals.profits[key], 2)}</span>
                            </div>
                            <div className="totals__child">
                                <span>Tiempo total</span>
                                <span>{timeInHMS(periodTotals.times.totalTime[key])}</span>
                            </div>
                            <div className="totals__child">
                                <span>Tiempo pago</span>
                                <span>{timeInHMS(periodTotals.times.payedTime[key])}</span>
                            </div>
                            <div className="totals__child">
                                <span>Tiempo Free</span>
                                <span>{timeInHMS(periodTotals.times.freeTime[key])}</span>
                            </div>
                            <div className="totals__child">
                                <span>Tiempo Pausa</span>
                                <span>{timeInHMS(periodTotals.times.pauseTime[key])}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>}
    </div>
    );
}

export default TotalsCard;