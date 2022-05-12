import { BiMessageAdd } from 'react-icons/bi';
import './NotesPreview.scss';

function NotesPreview({ day, setNewNoteClicked, setDayClicked }) {

    const addNewNote = async () => {
        setNewNoteClicked(true)
        setDayClicked(day)
    }

    return(
        <div className="notesPreview">
            <BiMessageAdd className="notesPreview__newNote" onClick={addNewNote} />
        </div>
    );
}

export default NotesPreview;