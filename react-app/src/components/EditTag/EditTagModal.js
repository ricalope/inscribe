import { Modal } from '../../context/Modal';
import EditTag from './index';


function EditTagModal({ noteId, showEdit, setShowEdit, noteTags }) {

    return (
        <>
            {showEdit && (
                <Modal onClose={() => setShowEdit(false)}>
                    <EditTag setShowEdit={setShowEdit} noteId={noteId} noteTags={noteTags} />
                </Modal>
            )}
        </>
    )
}

export default EditTagModal;
