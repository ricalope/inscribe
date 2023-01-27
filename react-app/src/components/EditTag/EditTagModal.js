import { Modal } from '../../context/Modal';
import EditTag from './index';


function EditTagModal({ noteId, showEdit, setShowEdit, tagNoteArray }) {

    return (
        <>
            {showEdit && (
                <Modal onClose={() => setShowEdit(false)}>
                    <EditTag setShowEdit={setShowEdit} noteId={noteId} tagNoteArray={tagNoteArray} />
                </Modal>
            )}
        </>
    )
}

export default EditTagModal;
