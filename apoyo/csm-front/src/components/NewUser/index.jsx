import { useState } from 'react';
import api from '../../api';
import './NewUser.scss';

function NewUser({ setNewUserClicked }) {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name,
            role,
            username,
            password
        };

        try {
            const res = await api.user.create(data);
            setNewUserClicked(false)
            console.log("@res:", res);
        } catch(error) {
            console.log('@error: ', error);
        }        
    }
   
    return (        
        <div className="NewUserContainer">
            <div className="NewUserContainer__editor editor">
                <h2 className="editor__title defaultTitle">Nuevo usuario</h2>
                <form className="editor__newUserForm" onSubmit={onSubmit}>                        
                    <label className="editor__label">Nombre:</label>
                    <input 
                        className="editor__input" 
                        type="text" 
                        placeholder="Nombre real del usuario" 
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label className="editor__label">rol:</label>                        
                    <select 
                        className="editor__rolSelect" 
                        name="rol"
                        onChange={(e) => setRole(e.target.value)} 
                        required>
                        <option value="" className="option">selecciona una opción</option>
                        <option value="CEO" className="option">CEO</option>
                        <option value="manager" className="option">Gerente</option>
                        <option value="financial" className="option">Financiero</option>
                        <option value="monitor" className="option">Monitor</option>
                        <option value="maintenance" className="option">Mantenimiento</option>
                    </select>
                    <label className="editor__label">username:</label>
                    <input 
                        className="editor__input" 
                        type="text" 
                        placeholder="username para inicio de sesion" 
                        name="username" 
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label className="editor__label">contraseña:</label>
                    <input 
                        className="editor__input" 
                        type="password" 
                        name="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="editor__buttonContainer">
                        <button className="editor__createButton defaultButton" type="submit">Crear</button>
                        <button className="editor__cancelButton defaultButton" onClick={() => setNewUserClicked(false)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewUser;