import { Modal } from '../../context/Modal';
import EditNotebook from './index';


function EditNotebookModal({ showEdit, setShowEdit }) {

    return (
        <>
            {showEdit && (
                <Modal onClose={() => setShowEdit(false)}>
                    <EditNotebook setShowEdit={setShowEdit} />
                </Modal>
            )}
        </>
    )
}

export default EditNotebookModal;
