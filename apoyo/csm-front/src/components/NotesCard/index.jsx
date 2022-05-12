
import './NotesCard.scss';

function NotesCard(props) {

    return(
        <div className="notesCard">
            <h3 className="notesCard__modelName">{props.modelName}</h3>
            <span className="notesCard__date">{props.date}</span>
            <textarea className="notesCard__note" rows="3">{props.note}</textarea>
        </div>
    );
}

export default NotesCard;