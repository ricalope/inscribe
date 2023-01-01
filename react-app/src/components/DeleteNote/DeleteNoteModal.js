import { Modal } from '../../context/Modal';
import DeleteNote from './index';


function DeleteNoteModal({ noteId, showDelNote, setShowDelNote }) {

    return (
        <>
            {showDelNote && (
                <Modal onClose={() => setShowDelNote(false)}>
                    <DeleteNote setShowDelNote={setShowDelNote} noteId={noteId}/>
                </Modal>
            )}
        </>
    )
}

export default DeleteNoteModal
