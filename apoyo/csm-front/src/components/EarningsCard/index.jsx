import React, { useState } from 'react';
import classnames from 'classnames';
import { timeInHMS, formatNumber } from '../../common/js/dateFormaters';
import { ImCoinDollar, ImClock, ImClipboard } from 'react-icons/im';
import { HiBadgeCheck, HiExclamationCircle } from 'react-icons/hi';
import { GiSteelDoor } from 'react-icons/gi';
import { MdLocationOn } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { FiSunrise, FiSun, FiMoon } from 'react-icons/fi';
import Notes from '../Structure/Notes';
import './EarningsCard.scss';

function EarningsCard({ index, info, profits, totalTime, freeTime, payedTime, pauseTime, notes, workingHours }) {
    const [isProfitsClicked, setProfitsClicked] = useState(false);    

    const flagClasses = (totalTime) => classnames('earndReports__timeFlag timeFlag', {
        'earndReports__timeFlag--redFlag': !validateFlag(totalTime)
    });

    const flagPercentClasses = (totalTime) => classnames('timeFlag__flagPercent', {
        'timeFlag__flagPercent--redFlag': !validateFlag(totalTime)
    });

    const workingHoursClasses = (totalTime) => classnames('timeFlag__workingHours', {
        'timeFlag__workingHours--redFlag': !validateFlag(totalTime)
    });

    const calculatePercent = (totalTime) => {
        let percent = (totalTime * 100) / workingHours;
        return percent.toFixed(0);
    };

    const validateFlag = (totalTime) => {
        if(timeInHours(totalTime) < workingHours){
            return false;
        }else return true;
    }; 

    const profitsClicked = () => {        
        setProfitsClicked(!isProfitsClicked);
    };
    
    const timeEngagement = (totalTime, freeTime) => {
        if (totalTime === 0) {return 100;}
        const payedTime = totalTime - freeTime;
        const engagement = (payedTime * 100) / totalTime;
        return formatNumber(engagement, 2);
    };

    const timeInHours = (seconds, decimals = 2) => (seconds/3600).toFixed(decimals);
   
    return (        
        <div key={index} className="earningsCard">
            <div className="earningsCard__overview overview">
                <div className="overview__id earnId">
                    <span className="earnId__name">{info.modelName}</span>
                    <div className="earnId__locationContainer">
                        <MdLocationOn className="earnId__locationIcon" />
                        <span className="earnId__location">{info.location}</span>
                    </div>
                    {info.location !== "Satélite" && info.location !== "Retirada" && <div className="earnId__infoContainer">
                        <div className="earnId__infoContainer__child">
                            <RiTeamFill className="earnId__infoIcon" />
                            <span className="earnId__team">{info.team}</span>
                        </div>
                        <div className="earnId__infoContainer__child">
                            <GiSteelDoor className="earnId__infoIcon" />
                            <span className="earnId__room">{info.room}</span>
                        </div>
                        <div className="earnId__infoContainer__child">
                            {info.modelShift === "morning" && <FiSunrise className="earnId__infoIcon" />}
                            {info.modelShift === "afternoon" && <FiSun className="earnId__infoIcon" />}
                            {info.modelShift === "night" && <FiMoon className="earnId__infoIcon" />}
                        </div> 
                    </div>}
                    <div className="earnId__platformsContainer platformsContainer">
                        {Object.keys(profits).map((key, index) => {
                            if(key === "total") {return "";}
                            const imageURL = `/${key.toLowerCase()}-logo.png`;
                            return(                                
                                <img className="platformsContainer__logo" 
                                    key={index} 
                                    src={imageURL} 
                                    alt="imagen no disponible" 
                                    title={key.toLowerCase()}
                                    width="25%" />                                
                            )
                        })}
                    </div>
                </div>             
                <div className="overview__values earnValues">
                    <div className="earnValues__profits profits" onClick={profitsClicked}>
                        <div className="profits__iconContainer iconContainer">
                            <ImCoinDollar className="iconContainer__icon" />                    
                        </div>
                        <span className="profits__profitText">$ {formatNumber(profits.total, 2)}</span>
                    </div>
                    <div className="earnValues__times times">
                        <div className="times__iconContainer iconContainer">
                            <ImClock className="iconContainer__icon" />                    
                        </div>
                        <span className="times__freeTime">Free: {timeInHMS(freeTime.total)}</span>
                        <span className="times__freeTime">Pausa: {timeInHMS(pauseTime.total)}</span>
                        <span className="times__payedTime">Pago: {timeInHMS(payedTime.total)}</span>
                        <span className="times__totalTime">Total: {timeInHMS(totalTime.total)}</span>
                        <span className="times__engagement">{timeEngagement(totalTime.total, freeTime.total)} %</span>
                    </div>
                </div>             
                <div className="overview__reports earndReports">
                    <div className="earndReports__notes notes">
                        <div className="notes__notesIcon iconContainer">
                            <ImClipboard className="iconContainer__icon" />                    
                        </div>
                        <div className="notes__notesListContainer notesListContainer">
                            {   
                                Notes.length > 0 && <ul className="notesListContainer__notesList">
                                    {
                                        notes.map((note, index) => (
                                            <li key={index}>{note.note}</li>    
                                        ))
                                    }
                                </ul> 
                            }
                            {Notes.length === 0 && <span className="notesListContainer__noNotes">Sin notas...</span>}  
                        </div>
                    </div> 
                    <div className={flagClasses(totalTime.total)}>
                        <div className="timeFlag__flagContainer flagContainer">
                            {!validateFlag(totalTime.total) && <HiExclamationCircle className="flagContainer__icon--redFlag" /> }
                            {validateFlag(totalTime.total) && <HiBadgeCheck className="flagContainer__icon" />}                
                        </div>
                        <div className="timeFlag__textContainer">
                            <div className={flagPercentClasses(totalTime.total)}>{calculatePercent(timeInHours(totalTime.total))} %</div>
                            <div className={workingHoursClasses(totalTime.total)}>{timeInHours(totalTime.total, 1)} H de {workingHours.toFixed(1)} H</div>
                        </div>
                    </div>                
                </div>
            </div>
            { isProfitsClicked && 
                <div className="earningsCard__platforms platforms">
                {
                    Object.keys(profits).map((key, index) => {
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
                                    <span>$ {formatNumber(profits[key], 2)}</span>
                                </div>
                                <div className="totals__child">
                                    <span>Tiempo total</span>
                                    <span>{timeInHMS(totalTime[key])}</span>
                                </div>
                                <div className="totals__child">
                                    <span>Tiempo pago</span>
                                    <span>{timeInHMS(payedTime[key])}</span>
                                </div>
                                <div className="totals__child">
                                    <span>Tiempo Free</span>
                                    <span>{timeInHMS(freeTime[key])}</span>
                                </div>
                                <div className="totals__child">
                                    <span>Tiempo Pausa</span>
                                    <span>{timeInHMS(pauseTime[key])}</span>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            }
        </div>
    );
}

export default EarningsCard;
