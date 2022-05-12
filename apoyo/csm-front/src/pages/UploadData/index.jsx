import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import api from "../../api";
import mongoDBLoadData from '../../common/js/mongoDBLoadData';
import DragAndDrop from '../../components/DragAndDrop';
import './UploadData.scss';
const wholeFileRegex = /\r\n|\n/;
const rowRegex = /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/;

function UploadData() { 
    const [isLoading, setLoading] = useState(false);                 
    const [file, setFile] = useState();
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

    useEffect(() => {
        async function csvUpload() {
            for (const key in file) {
                if(key >= 0) {
                    await readCsvFile(file[key]);
                    
                }
            }
        }
        csvUpload();
        
    },[file]);
    
    const readCsvFile = async (file) => {
        const reader = new FileReader();     
        reader.onload = async (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            const cleanedData = file.name.includes("earnings") ? data.replace(/(")/g, '') : data;
            return await processData(cleanedData, file.name);
        };
        reader.readAsBinaryString(file);
        return await reader;
    };

    const handleDrop = async (file) => {
        setLoading(true);
        setFile(file);       
    };
    // process CSV data
    const processData = async (dataString, fileName) => {
        let platform = "";
        let filteredLines = [];
        const dataStringLines = dataString.split(wholeFileRegex);
        const dataStringLineOne = dataStringLines.shift();
        const headers = dataStringLineOne.split(rowRegex);
        const list = dataStringLines.reduce((accumulator, dataStringLine) => {
            const row = dataStringLine.split(rowRegex);
            if (row.length > 1) {                    
                accumulator.push(row);
            }
            return accumulator;
        }, []);
        if(fileName.includes("earnings")){
            platform = "streamate";
            console.log("@platform: ", platform);
            filteredLines = list;
        } else if(fileName.includes("overview")){
            platform = fileName.split('.')[0].replace('overview', 'flirt4Free');
            let flag = 0;
            console.log("@platform: ", platform);
            filteredLines = list.filter( (data) => {
                if (data[0] === "Studio") {
                    flag = 1;
                    return false;
                }
                return flag === 1;
            });
        } else if (fileName.includes("HostReport")) {
            platform = "imLive";
            console.log("@platform: ", platform);
            filteredLines = list;
        } else if (fileName.includes("livejasmin")) {
            platform = "livejasmin";
            console.log("@platform: ", platform);
            filteredLines = list;
        } else if (fileName.includes("Studio Accounting")) {            
            platform = fileName.split('.')[0].replace('Studio Accounting', 'camsoda');
            console.log("@platform: ", platform);
            filteredLines = list.filter( (data) => {
                let flag = false;
                modelsData.map((model) => {
                    if (model.platformNames.includes(data[0])) {
                        flag = true;
                    }
                })
                return flag;
            });
        } else {
            platform = "Unknown";
            console.log("@platform: ", platform); 
        }
        console.log("@filteredLines: ", filteredLines);
        const loadedData = [];
        for (const filteredLine of filteredLines) {
            const loaded = await mongoDBLoadData(filteredLine, platform);
            loadedData.push(loaded);
        }        
        setLoading(false);
        return await loadedData;
    }
 
    return ( 
        <div className="uploadData"> 
            <div className="uploadData__dropContainer"> 
            { isLoading && <span className="uploadData__title">Cargando...</span> }
                { !isLoading && <DragAndDrop handleDrop={handleDrop}>                
                    <h2 className="uploadData__title" >Arrastra aquí <br/> los archivos</h2>       
                </DragAndDrop> }                
            </div>
        </div>
    );
}

export default UploadData;
