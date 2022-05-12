import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {IoMdArrowDropleftCircle, IoMdArrowDroprightCircle} from 'react-icons/io';
import './Notes.scss';
import NotesPreview from '../../components/NotesPreview';

function Notes({ fromDate, toDate, role }) {
    const [fromDt, setFromDt] = useState(new Date(fromDate));
    const [month, setMonth] = useState(fromDt.toLocaleString('es-ES', { month: 'long', year: 'numeric' }));                
    const [notesArray, setNotesArray] = useState([]);
    const [newNoteClicked, setNewNoteClicked] = useState(false)
    const [dayClicked, setDayClicked] = useState('')

    useEffect(() => {
        console.log("@month:", fromDt);
        async function fetchNotes() {
            const tempArray = [];
            try {
                const firstCalendarDay = new Date(fromDt);
                firstCalendarDay.setDate(1);
                while (firstCalendarDay.getDay() !== 0) {
                    firstCalendarDay.setDate(firstCalendarDay.getDate() - 1);
                }
                const lastCalendarDay = new Date(fromDt);
                lastCalendarDay.setMonth(lastCalendarDay.getMonth() + 1, 0);
                while (lastCalendarDay.getDay() !== 6) {
                    lastCalendarDay.setDate(lastCalendarDay.getDate() + 1);
                }
                let week = [];
                while (firstCalendarDay.toISOString().split('T')[0] <= lastCalendarDay.toISOString().split('T')[0]) {
                    week.push(firstCalendarDay.toISOString().split('T')[0]);
                    if (firstCalendarDay.getDay() === 6) {
                        tempArray.push(week);
                        week = [];
                    }
                    firstCalendarDay.setDate(firstCalendarDay.getDate() + 1); 
                }
                setNotesArray(tempArray);               
                console.log('@notesArray: ', notesArray);
            } catch (error) {
                console.log('@error: ', error);
            }            
        }

        fetchNotes();
    },[month]);

    const previusMonthClicked = () => {
        console.log('@previusMonthClicked: ', fromDt);
        fromDt.setMonth(fromDt.getMonth() - 1, 1);
        setMonth(fromDt.toLocaleString('es-ES', { month: 'long', year: 'numeric' }));
        console.log('@previusMonthClicked: ', fromDt);
    }

    const nextMonthClicked = () => {
        console.log('@nextMonthClicked: ', fromDt);
        fromDt.setMonth(fromDt.getMonth() + 1, 1);
        setMonth(fromDt.toLocaleString('es-ES', { month: 'long', year: 'numeric' }));
        console.log('@nextMonthClicked: ', fromDt);
    }

    const cancelNewNote = () => {
        setNewNoteClicked(false)
    }

    const createNewNote = () => {

    }


    
    return (
        <div className="notesModule">
            <div className="notesModule__viewer viewer">
                <div className="calendar">
                    <div className="calendar__monthHeader monthHeader">
                        <IoMdArrowDropleftCircle className="monthHeader__iconMonth" onClick={previusMonthClicked} />                        
                        <span className="monthHeader__actualMonth">{month.toUpperCase()}</span>
                        <IoMdArrowDroprightCircle className="monthHeader__iconMonth" onClick={nextMonthClicked} />                        
                    </div>
                    <div className="calendar__daysOfWeek">
                        <span className="dayOfWeek">D</span>
                        <span className="dayOfWeek">L</span>
                        <span className="dayOfWeek">M</span>
                        <span className="dayOfWeek">W</span>
                        <span className="dayOfWeek">J</span>
                        <span className="dayOfWeek">V</span>
                        <span className="dayOfWeek">S</span>                
                    </div>
                    <div className="calendar__notesWall notesWall">
                        {notesArray.map( (week, ind) => {
                                console.log(week);
                                return(
                                    <div className="notesWall__week" key={ind}>{
                                        week.map( (day, index) => {
                                            return(
                                                <div className="notesWall__day" key={index}>
                                                    <NotesPreview day={day} setNewNoteClicked={setNewNoteClicked} setDayClicked={setDayClicked} />
                                                    <span>{day}</span>
                                                </div>
                                            )
                                        })
                                    }</div>
                                );
                            })
                        }
                    </div>
                </div>
                {newNoteClicked && 
                <div className="viewer__NewNoteContainer NewNoteContainer">                
                    <div className="NewNoteContainer__editor editor">
                        <h2 className="editor__title">Nueva nota</h2>
                        <h4 className="editor__date">({dayClicked})</h4>
                        <form className="editor__noteForm">
                            <label className="editor__Label" for="models">Elige una modelo:</label>
                            <select className="editor__modelSelect" name="models">
                                <option value="" className="option">selecciona una modelo</option>
                                <option value="select" className="option">selecciona una modelo</option>
                            </select>
                            <label className="editor__Label" for="tipoNota">Elige un tipo de nota:</label>
                            <select className="editor__noteTypeSelect" name="tipoNota">
                                <option value="" className="option">selecciona una opción</option>
                                <option value="select" className="option">Incapacidad</option>
                                <option value="select" className="option">Llegada tarde</option>
                                <option value="select" className="option">Falta</option>
                                <option value="select" className="option">Permiso</option>
                                { role !== 'monitor' && <option value="select" className="option">Franja roja</option>}
                                { role !== 'monitor' && <option value="select" className="option">Franja verde</option>}
                            </select>
                            <div className="editor__buttonContainer">
                                <button className="editor__createButton" onClick={createNewNote} >Crear</button>
                                <button className="editor__cancelButton" onClick={cancelNewNote} >Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state.logInfo
}

export default connect(mapStateToProps)(Notes);
