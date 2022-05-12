import { useState, useEffect }  from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLogInfo } from '../../redux/actions/logInfoActions';
import {parseDate, getWeekStart} from '../../common/js/dateFormaters';
import classnames from 'classnames';
import api from '../../api';
import './Login.scss';
import DateSelector from '../../components/DateSelector';

function Login({ setLogInfo }) {
    const [loginState, setLoginState] = useState(true);
    const [username, setUsername] = useState(false);
    const [name, setName] = useState(false);
    const [password, setPassword] = useState('');
    const history = useHistory();
    const toDate = parseDate(new Date(), "actualHour");
    const fromDate = parseDate(getWeekStart(new Date()));

    useEffect(() => {
        async function cleanData() {
            try {
                const info = {
                    'role': '', 
                    'team': '',
                    'token': '',  
                    'fromDate': '',
                    'toDate': ''
                };
                setLogInfo(info)
            } catch(error) {
                console.log('@error: ', error);
            }
        }
        cleanData();
    }, [])

    const validateLogin = async () => {
        const data = {
            username,
            password
        };
        const res = await api.user.login(data);
        if (res.user && res.token) {
            const team = res.user.role === 'monitor' ? res.user.name : 'all';
            const info = {
                'role': res.user.role, 
                team,
                'token': res.token,  
                fromDate,
                toDate
            };
            setLogInfo(info);
            sessionStorage.setItem('role', res.user.role);
            sessionStorage.setItem('team', team);
            sessionStorage.setItem('token', res.token);
            setName(res.user.name)
            setTimeout(() => {
                history.push("/main/home");
            }, 3000);
        } else {
            setLoginState(false);
        }
    };

    const loginContainerClasses = () => classnames('loginContainer__loginFormContainer', {
        'loginContainer__loginFormContainer--unauthorized': !loginState
    });

    const messageClasses = () => classnames('unauthorizedMessage', {
        'unauthorizedMessage--unauthorized': !loginState
    });

    return (
        <div className="loginContainer">
            <DateSelector />
            { !name && 
                <div className={loginContainerClasses('loginContainer__loginFormContainer')}>
                    <h2 className="loginTitle">Bienvenido</h2>
                    <span className={messageClasses()}>El usuario y/o la contraseña están incorretos</span>
                    <input 
                        type="text" 
                        name="user" 
                        placeholder="Usuario" 
                        className="loginUser loginInputs"
                        onChange={
                            (e) => setUsername(e.target.value)
                        }
                        onClick={() => setLoginState(true)} 
                        />
                    <input 
                        type="password" 
                        name="pass" 
                        placeholder="Contraseña" 
                        className="loginPass loginInputs" 
                        onChange={
                            (e) => setPassword(e.target.value)
                        }
                        onClick={() => setLoginState(true)}
                        />                
                    <button className="loginButton" onClick={validateLogin}>Ingresar</button>                
                    <div className="rememberContainer">
                        <label className="rememberText"><input type="checkbox" className="rememberCheckbox" defaultChecked="checked" /> Recuerdame</label>                                     
                    </div>                
                </div>
            }
            { name && 
                <div className="welcomeMessage">
                    <h2>Bienvenido {name} !!</h2>
                </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return state 
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLogInfo: (logInfo) => dispatch(setLogInfo(logInfo))
    }
}
       
export default connect(mapStateToProps, mapDispatchToProps)(Login);
