import { useState, useEffect } from 'react';
import api from '../../api';
import Card from '../../components/Card';
import CardSmall from '../../components/CardSmall';
import './Teams.scss';

function Teams({ setNewUserClicked }) {

    const [modelsData, setModelsData] = useState([]);
    
    useEffect(() => {
        async function loadModelsData() {
            const fromDate = new Date();
            fromDate.toISOString()
            await api.performer.getPerformers(
                `?fromDate=${fromDate.toISOString()}`
            ).then((models) => {
                setModelsData(models.data)
            });
        } 
        loadModelsData();               
    },[]);
   
    return (        
        <div className="teams">
            <div className="teams__card teamCard">
                <div className="teamCard__title defaultTitle">El Tesoro Mañana</div>
                <div className="models__viewer">
                    {modelsData.filter((model) => model.location === "Tesoro" && model.modelShift === "mañana").map((model, index) => {                    
                        return(
                            <CardSmall index={index} key={index} name={model.modelName} time="00:00:00" earnings="0.00" />
                        );
                    })}
                </div>
            </div>
            <div className="teams__card teamCard">
                <div className="teamCard__title defaultTitle">El Tesoro Tarde</div>
                <div className="models__viewer">
                    {modelsData.filter((model) => model.location === "Tesoro"  && model.modelShift === "tarde").map((model, index) => {                    
                        return(
                            <CardSmall index={index} key={index} name={model.modelName} time="00:00:00" earnings="0.00" />
                        );
                    })}
                </div>
            </div>
            <div className="teams__card teamCard">
                <div className="teamCard__title defaultTitle">El Tesoro Noche</div>
                <div className="models__viewer">
                    {modelsData.filter((model) => model.location === "Tesoro" && model.modelShift === "noche").map((model, index) => {                    
                        return(
                            <CardSmall index={index} key={index} name={model.modelName} time="00:00:00" earnings="0.00" />
                        );
                    })}
                </div>
            </div>
            <div className="teams__card teamCard">
                <div className="teamCard__title defaultTitle">Conquistadores Mañana</div>
                <div className="models__viewer">
                    {modelsData.filter((model) => model.location === "Conquistadores" && model.modelShift === "mañana").map((model, index) => {                    
                        return(
                            <CardSmall index={index} key={index} name={model.modelName} time="00:00:00" earnings="0.00" />
                        );
                    })}
                </div>
            </div>
            <div className="teams__card teamCard">
                <div className="teamCard__title defaultTitle">Conquistadores Tarde</div>
                <div className="models__viewer">
                    {modelsData.filter((model) => model.location === "Conquistadores" && model.modelShift === "tarde").map((model, index) => {                    
                        return(
                            <CardSmall index={index} key={index} name={model.modelName} time="00:00:00" earnings="0.00" />
                        );
                    })}
                </div>
            </div>
            <div className="teams__card teamCard">
                <div className="teamCard__title defaultTitle">Conquistadores Noche</div>
                <div className="models__viewer">
                    {modelsData.filter((model) => model.location === "Conquistadores" && model.modelShift === "noche").map((model, index) => {                    
                        return(
                            <CardSmall index={index} key={index} name={model.modelName} time="00:00:00" earnings="0.00" />
                        );
                    })}
                </div>
            </div>
            <div className="teams__card teamCard">
                <div className="teamCard__title defaultTitle">Satélites</div>
                <div className="models__viewer">
                    {modelsData.filter((model) => model.location === "satélite").map((model, index) => {                    
                        return(
                            <CardSmall index={index} key={index} name={model.modelName} time="00:00:00" earnings="0.00"  />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Teams;