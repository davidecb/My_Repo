import React from 'react';
import logoCSM from '../../assets/logo.png';
import './Card.scss';

function Card(props) {
   
    return (        
        <div key={props.index} className="card">            
            <img src={logoCSM} 
                alt="imagen no disponible" 
                title="CSM Model Studio"
                className="card__image" />             
            <span className="card__name">{props.name}</span>
            <span className="card__subtitle">{props.subtitle}</span>
        </div>
    );
}

export default Card;