import { useState, useEffect } from 'react';
import api from '../../api';
import Card from '../../components/Card';
import CardSmall from '../../components/CardSmall';
import './Locations.scss';

function Locations({ setNewUserClicked }) {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
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

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name,
            role,
            username,
            password
        };

        try {
            const res = await api.user.create(data);
            setNewUserClicked(false)
            console.log("@res:", res);
        } catch(error) {
            console.log('@error: ', error);
        }        
    }
   
    return (        
        <div className="locations">
            <div className="locations__card locationCard">
                <div className="locationCard__title defaultTitle">El Tesoro</div>
                <div className="models__viewer">
                    {modelsData.filter((model) => model.location === "Tesoro").map((model, index) => {                    
                        return(
                            <CardSmall index={index} key={index} name={model.modelName} time="00:00:00" earnings="0.00" />
                        );
                    })}
                </div>
            </div>
            <div className="locations__card locationCard">
                <div className="locationCard__title defaultTitle">Conquistadores</div>
                <div className="models__viewer">
                    {modelsData.filter((model) => model.location === "Conquistadores").map((model, index) => {                    
                        return(
                            <CardSmall index={index} key={index} name={model.modelName} time="00:00:00" earnings="0.00" />
                        );
                    })}
                </div>
            </div>
            <div className="locations__card locationCard">
                <div className="locationCard__title defaultTitle">Satélites</div>
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

export default Locations;