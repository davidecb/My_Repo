import { useState } from 'react';
import api from '../../api';
import { MdAddCircle, MdCancel } from 'react-icons/md';
import './NewModel.scss';

function NewModel({ setNewModelClicked, token }) {    
    const [newModelInfo, setNewModelInfo] = useState({});
    const [currentTag, setCurrentTag] = useState('');
    const [tags, setTags] = useState([]);
    
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...newModelInfo,
                platformNames: tags,
                status: true,
                lastDateOnline: new Date() 
            };
            console.log("@Creating new model:", data);        
            const res = await api.performer.create(data, token);
            console.log("@res:", res);
            setCurrentTag('');
            setTags([]);
            setNewModelInfo({});
            setNewModelClicked(false);
        } catch(error) {
            console.log('@error: ', error);
        }        
    }

    const handleForm = (e) => {
        const { name, value } = e.target;
        
        setNewModelInfo({
            ...newModelInfo,
            [name]: value
        })
    }  

    const addTag = () => {
        if (!tags.includes(currentTag) && currentTag !== '') {
            setTags([
                ...tags,
                currentTag
            ])
        }
        const tagInput = document.getElementById('newTagInput');
        tagInput.value = '';
    }

    const removeTag = (cancelTag) => {
        console.log("@cancelTag:", cancelTag);
        const newTags = tags.filter((tag) => tag !== cancelTag);
        console.log("@newTags:", newTags);
        setTags(newTags);
    }

    return (        
        <div className="NewModelContainer">
            <div className="NewModelContainer__editor editor">
                <h2 className="editor__title defaultTitle">Nueva modelo</h2>
                <form className="editor__newModelForm" onSubmit={onSubmit}>                    
                    <div className="editor__inputCont">
                        <label className="editor__label">Modelo:</label>
                        <input 
                            className="editor__input" 
                            type="text" 
                            placeholder="Nombre artístico" 
                            name="modelName"
                            onChange={handleForm}
                            required
                        />
                    </div>
                    <div className="editor__inputCont">
                        <label className="editor__label">Tags:</label>
                        <input 
                            className="editor__input"
                            id="newTagInput" 
                            type="text" 
                            placeholder="Nombre en plataforma" 
                            name="tag"
                            onChange={(e) => setCurrentTag(e.target.value)}                                
                        />
                        <MdAddCircle className="editor__addTag" onClick={() => addTag()} />
                    </div>
                    <div className="editor__tagsContainer tagsContainer">
                        {
                            tags.map((tag, index) => {
                                return(
                                    <div key={index} className="tagsContainer__tagButton">
                                        <span className="tagsContainer__tag">{tag}</span>
                                        <MdCancel className="tagsContainer__cancel" onClick={() => removeTag(tag)} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="editor__inputCont">                       
                        <label className="editor__label">Sede:</label>                        
                        <select 
                            className="editor__selectInput" 
                            name="location"
                            onChange={handleForm} 
                            required>
                            <option value="" className="option">selecciona una opción</option>
                            <option value="conquistadores" className="option">Conquistadores</option>
                            <option value="tesoro" className="option">Tesoro</option>
                            <option value="satélite" className="option">Satélite</option>
                        </select>
                    </div>
                    <div className="editor__inputCont">
                        <label className="editor__label">Turno:</label>                        
                        <select 
                            className="editor__selectInput" 
                            name="modelShift"
                            onChange={handleForm} 
                            required>
                            <option value="" className="option">selecciona una opción</option>
                            <option value="mañana" className="option">Mañana</option>
                            <option value="tarde" className="option">Tarde</option>
                            <option value="noche" className="option">Noche</option>
                            <option value="satélite" className="option">Satélite</option>
                        </select>
                    </div>
                    <div className="editor__inputCont">                    
                        <label className="editor__label">Nombre:</label>
                        <input 
                            className="editor__input" 
                            type="text" 
                            placeholder="Nombre real" 
                            name="realName"
                            onChange={handleForm}
                            required
                        />
                    </div>
                    <div className="editor__inputCont">                    
                        <label className="editor__label">Email:</label>
                        <input 
                            className="editor__input" 
                            type="text" 
                            placeholder="correo electrónico" 
                            name="email"
                            onChange={handleForm}
                            required
                        />
                    </div>
                    <div className="editor__inputCont">                    
                        <label className="editor__label">Cédula:</label>
                        <input 
                            className="editor__input" 
                            type="text" 
                            placeholder="CC o identificación" 
                            name="ID"
                            onChange={handleForm}
                            required
                        />
                    </div>
                    <div className="editor__inputCont">                       
                        <label className="editor__label">Tipo cuenta:</label>                        
                        <select 
                            className="editor__selectInput" 
                            name="accountType"
                            onChange={handleForm} 
                            required>
                            <option value="" className="option">selecciona una opción</option>
                            <option value="ahorros" className="option">Ahorros</option>
                            <option value="corriente" className="option">Corriente</option>
                            <option value="nequi" className="option">Nequi</option>
                        </select>
                    </div>
                    <div className="editor__inputCont">                       
                        <label className="editor__label">Banco:</label>                        
                        <select 
                            className="editor__selectInput" 
                            name="bank"
                            onChange={handleForm} 
                            required>
                            <option value="" className="option">selecciona una opción</option>
                            <option value="bancolombia" className="option">Bancolombia</option>
                            <option value="davivienda" className="option">Davivienda</option>
                            <option value="BBVA" className="option">BBVA</option>
                            <option value="banco de bogotá" className="option">Banco de Bogotá</option>
                        </select>
                    </div>
                    <div className="editor__inputCont">                    
                        <label className="editor__label">Cuenta:</label>
                        <input 
                            className="editor__input" 
                            type="text" 
                            placeholder="Número de cuenta" 
                            name="accountID"
                            onChange={handleForm}
                            required
                        />
                    </div>
                    <div className="editor__inputCont">                       
                        <label className="editor__label">Retención:</label>                        
                        <select 
                            className="editor__selectInput" 
                            name="retention"
                            onChange={handleForm} 
                            required>
                            <option value="" className="option">selecciona una opción</option>
                            <option value="0.04" className="option">4%</option>
                            <option value="0.06" className="option">6%</option>
                        </select>
                    </div>
                    <div className="editor__buttonContainer">
                        <button className="editor__createButton defaultButton" type="submit" >Crear</button>
                        <button className="editor__cancelButton defaultButton" type="button" onClick={() => {
                            setNewModelClicked(false);
                            setCurrentTag('');
                            setTags([]);
                            setNewModelInfo({});
                        }} >Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewModel;