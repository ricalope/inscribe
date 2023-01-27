import { Modal } from '../../context/Modal';
import EditTag from './index';


function EditTagModal({ noteId, showEdit, setShowEdit }) {

    return (
        <>
            {showEdit && (
                <Modal onClose={() => setShowEdit(false)}>
                    <EditTag setShowEdit={setShowEdit} noteId={noteId} />
                </Modal>
            )}
        </>
    )
}

export default EditTagModal;
