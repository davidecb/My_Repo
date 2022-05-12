import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLogInfo } from '../../redux/actions/logInfoActions';
import api from '../../api';
import NavOption from '../NavOption';
import DateSelector from '../DateSelector';
import navOptions from './navOptions';
import logoCSM from '../../assets/logoHeader.png';
import './Header.scss';


function Header({ logInfo , setLogInfo }) {
    const [activeRoute, setActiveRoute] = useState('Home');
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            try {                
                await api.user.getAuth('', logInfo.token);
            } catch(error) {
                history.push("/");
                alert('Debes iniciar sesión para continuar')
            }
        }
        fetchData();
    })
    
    return (
        <header className="header">
            <div className="header__logo">
                <img src={logoCSM} 
                    alt="imagen no disponible" 
                    title="CSM Model Studio"  
                    width="150px"/>
            </div>
            <div className="header__nav nav">
                {
                    navOptions && navOptions.filter((option, key) => {                        
                        if(option.role.includes(logInfo.role)){
                            return true;
                        }
                        else return false;                        
                    }).map((option, key) => {
                        return (
                            <NavOption 
                                setActiveRoute={setActiveRoute}
                                urlPath={option.urlPath}
                                Icon={option.Icon}
                                name={option.name}
                                key={key}
                                token={logInfo.token}
                            />
                            );
                        })
                    }
            </div>
            <DateSelector />
        </header>
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
     
export default connect(mapStateToProps, mapDispatchToProps)(Header);
