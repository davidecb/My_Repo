//import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../../api';
import './Maintenance.scss';

function Maintenance() {   
    const [dataList, setDataList] = useState([]);

    const LivejazminApiReq = () => {
        console.log(dataList);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await api.livejasmin.getLivejasminApi();
                /* const body = await axios.get("https://partner-api.modelcenter.jasmin.com/v1/transactions?fromDate=2021-04-19&limit=100", {
                    method: "GET",
                    contentType: 'application/json',
                    headers: new Headers({
                      'Access-Control-Allow-Origin': '*',
                      'Authorization': "Bearer 6ad087c59d7522334cd5628febd720b347e1a2acc0de7fd25404c3aed58d4c7a"
                    })
                  });
                const data = await body.json();
                console.log('@body: ', body); */
                console.log('@dataqqq: ', data);
                const results = data.results;
                setDataList(results);
            } catch(error) {
                console.log('@error: ', error);
            }            
        }
        fetchData();
    }, []);
    return (
        <div className="maintenance">
            <h2>Maintenance</h2>
            <button onClick={LivejazminApiReq} >LIVEJAZMIN</button>
        </div>
    );
}

export default Maintenance;
