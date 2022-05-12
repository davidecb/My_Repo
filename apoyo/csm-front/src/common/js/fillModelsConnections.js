//import ModelsInfo from '../../components/Structure/ModelsInfo';
import api from "../../api";

async function fillModelsConnections(connectionsData, team, fromDate) {
    
    return await api.performer.getPerformers(
        `?fromDate=${fromDate}`
    ).then((ModelsData) => {
        const ModelsInfo = ModelsData.data;
        const modelsFinal = [];
        console.log("ModelsInfo:", ModelsInfo);
        if (connectionsData && connectionsData.length>0 ) {
        
            let modelName = connectionsData[0].performerNickname;
            let platform = connectionsData[0].platform;
            let profits = 0;
            let time = 0;
            let freeTime = 0;
            let payedTime = 0;
            let pauseTime = 0;
            const totals = {
                "profits": {
                    "total": 0
                }, 
                "times": {
                    "totalTime": {
                        "total": 0
                    },
                    "payedTime": {
                        "total": 0
                    },
                    "freeTime": {
                        "total": 0
                    },
                    "pauseTime": {
                        "total": 0
                    },
                },
                "models": 0
            };
            let connectionsArray = [];
            let modelsArray = [];
    
            const searchModelInfo = (modelName) => {
                const notFounded = {
                    modelName,
                    "location": "Desconocida",
                    "modelShift": "Desconocida"
                };            
                console.log("modelName:", modelName)
                const searchResult = ModelsInfo.find(
                    (model) => model.platformNames.includes(modelName)
                );
                console.log("searchResult:", searchResult)
                const modelInfo = searchResult 
                        ? searchResult 
                        : notFounded;
                return modelInfo;
            }; 
    
            const insertConnection = (currProfit, currTime, currFreeTime = 0, currPayedTime = 0, currPauseTime = 0) => {
                profits += currProfit;
                time += currTime;
                payedTime += currPayedTime;
                freeTime += currFreeTime;
                pauseTime += currPauseTime;            
            };
    
            const insertModel = () => {
                const modelInfo = searchModelInfo(modelName);
                const userName = modelInfo.location.toLowerCase() 
                        +" "+ modelInfo.modelShift;
                            
                if (team === 'all' || userName === team) {            
                    modelsArray = [
                        ...modelsArray,
                        {
                            "modelName": modelInfo.modelName,
                            "totalProfits": profits, 
                            "totalTime": time, 
                            "payedTime": payedTime, 
                            "freeTime": freeTime, 
                            "pauseTime": pauseTime, 
                            "platform": platform, 
                            "location": modelInfo.location,                             
                            "modelShift": modelInfo.modelShift, 
                            "connections": connectionsArray,
                            "notes": [{
                                "noteDate": "21-04-2021",
                                "note": "NotaPrueba"
                            }]                   
                        }
                    ]; 
                }        
            };
    
            const resetStats = (newModelName, newPlatform) => {
                modelName = newModelName;
                platform = newPlatform;
                profits = 0;
                time = 0;
                payedTime = 0;
                freeTime = 0;
                pauseTime = 0;
                connectionsArray = [];
            };
    
            const insertTotals = (platform, totalProfits, totalTime, payedTime, freeTime, pauseTime, isNew) => {
                if (!totals.profits[platform]) {
                    totals.profits[platform] = 0;
                    totals.times.totalTime[platform] = 0;
                    totals.times.payedTime[platform] = 0;
                    totals.times.freeTime[platform] = 0;
                    totals.times.pauseTime[platform] = 0;    
                }
                totals.profits.total += totalProfits;
                totals.profits[platform] += totalProfits;
                totals.times.totalTime.total += totalTime;
                totals.times.totalTime[platform] += totalTime;
                totals.times.payedTime.total += payedTime;
                totals.times.payedTime[platform] += payedTime;
                totals.times.freeTime.total += freeTime;
                totals.times.freeTime[platform] += freeTime;
                totals.times.pauseTime.total += pauseTime;
                totals.times.pauseTime[platform] += pauseTime;
            };
    
            const mergeModels = (models) => {
                const mergedModels = [];
                const modelsSorted = models.sort((a, b) => {
                    const fa = a.modelName.toLowerCase(),
                            fb = b.modelName.toLowerCase();
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;                    
                });
                console.log("@modelsSorted:", modelsSorted);
                const modelsFiltered = modelsSorted.filter((model) => {
                    if (team === 'all') {
                        return true;
                    } else {
                        if (model.team == team) {
                            return true;
                        } else {return false;}
                    }
                });
                console.log("@modelsFiltered:", modelsFiltered);
                modelsSorted.map((model) => {
                    const modelIndex = mergedModels.findIndex((mergedModel) => mergedModel.info.modelName === model.modelName);
                    if (modelIndex < 0) {
                        const modelObj = {                    
                            "info": {
                                "modelName": model.modelName,
                                "team": model.team, 
                                "location": model.location,                             
                                "modelShift": model.modelShift,  
                                "room": model.room
                            },
                            "profits": {
                                "total": 0
                            }, 
                            "times": {
                                "totalTime": {
                                    "total": 0
                                },
                                "payedTime": {
                                    "total": 0
                                },
                                "freeTime": {
                                    "total": 0
                                },
                                "pauseTime": {
                                    "total": 0
                                },
                            },
                            "notes": [{
                                "noteDate": "02-07-2021",
                                "note": "NotaPrueba"
                            }]
                        };
                        modelObj.profits[model.platform] = model.totalProfits;
                        modelObj.times.totalTime[model.platform] = model.totalTime;
                        modelObj.times.payedTime[model.platform] = model.payedTime;
                        modelObj.times.freeTime[model.platform] = model.freeTime;
                        modelObj.times.pauseTime[model.platform] = model.pauseTime;
    
                        modelObj.profits.total = model.totalProfits;
                        modelObj.times.totalTime.total = model.totalTime;
                        modelObj.times.payedTime.total = model.payedTime;
                        modelObj.times.freeTime.total = model.freeTime;
                        modelObj.times.pauseTime.total = model.pauseTime;
    
                        insertTotals(model.platform, model.totalProfits, model.totalTime, model.payedTime, model.freeTime, model.pauseTime, true);
                        mergedModels.push(modelObj);
                    } else {
                        mergedModels[modelIndex].profits[model.platform] = model.totalProfits;
                        mergedModels[modelIndex].times.totalTime[model.platform] = model.totalTime;
                        mergedModels[modelIndex].times.payedTime[model.platform] = model.payedTime;
                        mergedModels[modelIndex].times.freeTime[model.platform] = model.freeTime;
                        mergedModels[modelIndex].times.pauseTime[model.platform] = model.pauseTime;
    
                        mergedModels[modelIndex].profits.total += model.totalProfits;
                        mergedModels[modelIndex].times.totalTime.total += model.totalTime;
                        mergedModels[modelIndex].times.payedTime.total += model.payedTime;
                        mergedModels[modelIndex].times.freeTime.total += model.freeTime;
                        mergedModels[modelIndex].times.pauseTime.total += model.pauseTime;
    
                        insertTotals(model.platform, model.totalProfits, model.totalTime, model.payedTime, model.freeTime, model.pauseTime, false);
                    }
                });
                totals.models = mergedModels.length;
                mergedModels.unshift(totals);
                console.log("@mergedModels:", mergedModels);
                return mergedModels;            
            };
    
            connectionsData.map((connection, index) => {
                let currProfit = parseFloat(connection.performerEarned.replace("$",""));
                let currTime = parseFloat(connection.totalTime.replace("N/A","0"));            
                let currPayedTime = parseFloat(connection.payedTime) || 0;            
                let currFreeTime = parseFloat(connection.freeTime) || 0;            
                let currPauseTime = parseFloat(connection.pauseTime) || 0;            
    
                if (index === connectionsData.length-1) { //---- Last connection data ----
                    if (modelName !== connection.performerNickname) {
                        insertModel();
                        resetStats(connection.performerNickname, connection.platform);
                    }
                    insertConnection(currProfit, currTime, currFreeTime, currPayedTime, currPauseTime);
                    insertModel();
                }else if (modelName === connection.performerNickname) {//---- same model data connection ----
                    insertConnection(currProfit, currTime, currFreeTime, currPayedTime, currPauseTime);
                }else {                                //---- new model data connection ----
                    insertModel();
                    resetStats(connection.performerNickname, connection.platform);
                    insertConnection(currProfit, currTime, currFreeTime, currPayedTime, currPauseTime);                     
                }
            });
            
            return mergeModels(modelsArray);
        }
    })    
}

export default fillModelsConnections;