import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mongoDBObtainData from '../../common/js/mongoDBObtainData';
import fillModelsConnections from '../../common/js/fillModelsConnections';
import Card from '../../components/Card';
import NewModel from '../../components/NewModel';
import './Models.scss';


function Models({ fromDate, toDate, team, token }) {
    const [isDataAvailable, setDataAvailable] = useState(false);
    const [newModelClicked, setNewModelClicked] = useState(false);
    

    const [modelsData, setModelsData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const streamate = mongoDBObtainData('streamate', fromDate, toDate);
                const livejasmin = mongoDBObtainData('livejasmin', fromDate, toDate);
                const flirt4Free = mongoDBObtainData('flirt4Free', fromDate, toDate);
                const imLive = mongoDBObtainData('imLive', fromDate, toDate);
                const [bodyStreamate, bodyLivejasmin, bodyFlirt4Free, bodyImLive] = await Promise.all([streamate, livejasmin, flirt4Free, imLive]);
                const body = [ ...bodyStreamate.data, ...bodyLivejasmin.data, ...bodyFlirt4Free.data, ...bodyImLive.data ];
                
                if (body.length > 0) {
                    setDataAvailable(true);
                    console.log("fromDate:", fromDate)
                    const connections = await fillModelsConnections(body, team, fromDate);
                    const totals = connections.shift();
                    setModelsData(connections);
                }
            } catch(error) {
                console.log('@error: ', error);
            }
        }
        fetchData();
    },[fromDate, toDate]);

    return (
        <div className="models">
            <div className='models__headerCont headerCont'>
                <h2 className="headerCont__title defaultTitle">Modelos</h2>
                <button className="defaultButton" onClick={() => setNewModelClicked(true)}>Nueva</button>
            </div>
            <div className="models__viewer">
                {modelsData.map((model, index) => {
                    return(
                        <Card index={index} key={index} name={model.info.modelName} />
                    );
                })}
            </div>
            { newModelClicked && <NewModel setNewModelClicked={setNewModelClicked} token={token} /> }
        </div>
    );
}

const mapStateToProps = (state) => {
    return state.logInfo
}

export default connect(mapStateToProps)(Models);
