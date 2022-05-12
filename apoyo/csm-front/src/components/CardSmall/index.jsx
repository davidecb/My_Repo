import React from 'react';
import './CardSmall.scss';

function CardSmall(props) {
   
    return (        
        <div key={props.index} className="cardSmall">            
            <span className="cardSmall__name">{props.name}</span>
            <div className="cardSmall__container container">
                <div className="container__time">{props.time}</div>
                <div className="container__earnings">${props.earnings}</div>
            </div>
        </div>
    );
}

export default CardSmall;