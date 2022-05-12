import store from '../../redux/store';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from '../Header';
import Main from '../Main';
import Login from '../../pages/Login';
import './App.scss';

function App() {

return (
    <BrowserRouter>
        <Provider store={store}>
            <div className="App">
                <Route exact path="/" component={Login} />
                <Route path="/main" component={Header} />
                <Route path="/main" component={Main} />
            </div>
        </Provider>
    </BrowserRouter>   
);
}

export default App;
