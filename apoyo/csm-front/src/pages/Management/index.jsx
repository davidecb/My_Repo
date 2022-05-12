import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import NewUser from '../../components/NewUser';
import Locations from '../Locations';
import Teams from '../Teams';
import Models from '../Models';
import './Management.scss';

function Management({ logInfo }) {
    const [newUserClicked, setNewUserClicked] = useState(false);
    const [locationsClicked, setLocationsClicked] = useState(true);
    const [teamsClicked, setTeamsClicked] = useState(false);
    const [usersClicked, setUsersClicked] = useState(false);
    const [modelsClicked, setModelsClicked] = useState(false);
    const [users, setUsers] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            try {
                if (logInfo.role === 'monitor') {
                    history.push("/main/models");
                }
            } catch(error) {
                console.log('@error: ', error);
            }
        }
        fetchData();
    },[]);

    
    
    return (
        <div className="management">
            <div className="management__headerCont headerCont">
                <h2 className="headerCont__title defaultTitle">Gestión</h2>
                <button className="headerCont__viewLocations defaultButton" 
                        onClick={() => {
                            setLocationsClicked(true);
                            setTeamsClicked(false);
                            setModelsClicked(false);
                    }}>Sedes</button>
                <button className="headerCont__viewTeams defaultButton" 
                        onClick={() => {
                            setLocationsClicked(false);
                            setTeamsClicked(true);
                            setModelsClicked(false);
                    }}>Equipos</button>
                <button className="headerCont__viewModels defaultButton" 
                        onClick={() => {
                            setLocationsClicked(false);
                            setTeamsClicked(false);
                            setModelsClicked(true);
                    }}>Modelos</button>
                { logInfo.role === 'admin' && <button className="headerCont__viewUsers defaultButton" onClick={() => setUsersClicked(true)}>Usuarios</button> }
                { logInfo.role === 'admin' && <button className="headerCont__newUser defaultButton" onClick={() => setNewUserClicked(true)}>Nuevo usuario</button> }
            </div>
            <div className="management__mainContainer">
                { locationsClicked && <Locations /> }            
                { teamsClicked && <Teams /> }            
                { modelsClicked && <Models /> }            
                { newUserClicked && <NewUser setNewUserClicked={setNewUserClicked} /> }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state 
}
       
export default connect(mapStateToProps)(Management);