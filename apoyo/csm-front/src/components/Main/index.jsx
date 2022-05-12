import { Route, Switch } from 'react-router';
import Historical from '../../pages/Historical';
import Models from '../../pages/Models';
import Notes from '../../pages/Notes';
/* import Maintenance from '../../pages/Maintenance'; */
import UploadData from '../../pages/UploadData';
import Management from '../../pages/Management';
import './Main.scss';

function Main() {    
    
    return (
        <div className="main">
            <Switch>
                <Route path="/main/upload-data" component={UploadData} />
                <Route path="/main/home" component={Historical} />
                <Route path="/main/management" component={Management} />
                <Route path="/main/models" component={Models} />               
                <Route path="/main/notes" component={Notes} />               
            </Switch>
        </div>
    );
}

export default Main;

/* 
                                                   
                
                <Route path="/main/notes" component={Notes} /> 
                <Route path="/main/teams" component={Models} />
                <Route path="/main/locations" component={Models} />
                <Route path="/main/maintenance" component={Maintenance} />
                <Route path="/main/reports/damage" component={Models} />
                <Route path="/main/reports/goals" component={Models} />
                <Route path="/main/yields" component={Models} />
                <Route path="/main/financial" component={Models} /> */  