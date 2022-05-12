import { Link } from 'react-router-dom';
import api from '../../api';
import './NavOption.scss';

function NavOption({ name, setActiveRoute, urlPath, Icon, token }) {
    const actualPath = urlPath;  

    const navOption = (
        <div className='nav__option option' onClick={async () => {
            if (name === 'Salir') {
                sessionStorage.setItem('role', '');
                sessionStorage.setItem('team', '');
                sessionStorage.setItem('token', '');
                await api.user.logout('', token);
            }                
            setActiveRoute(name);            
        }}>
            <Icon className="option__icon" title={name} />
        </div>
    );

    const navOptionLink = (
        <Link to={actualPath}>
            {navOption}
        </Link>
    );

    return navOptionLink;
}

export default NavOption;
