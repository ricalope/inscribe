import { useDispatch } from 'react-redux';
import { deleteNoteThunk, getAllNotesThunk } from '../../store/note';


function DeleteNote({ noteId, setShowDelNote }) {
    const dispatch = useDispatch();

    const onSubmit = async () => {
        await dispatch(deleteNoteThunk(noteId))
        await dispatch(getAllNotesThunk())
        setShowDelNote(false)
    }

    return (
        <div className="delete-note-main-container">
            <div className="delete-header">
                <h2>Confirm Delete Note?</h2>
            </div>
            <div className="delete-body">
                <h5>Please confirm you would like to permanently this note</h5>
            </div>
            <div className="delete-buttons">
                <div>
                    <button className="nb-btn one" onClick={() => setShowDelNote(false)}>Cancel</button>
                </div>
                <div>
                    <button className="nb-btn two" onClick={onSubmit}>Confirm Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteNote;
