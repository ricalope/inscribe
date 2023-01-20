import { Modal } from '../../context/Modal';
import EditNotebook from './index';


function EditNotebookModal({ showEdit, setShowEdit, notebookId }) {

    return (
        <>
            {showEdit && (
                <Modal onClose={() => setShowEdit(false)}>
                    <EditNotebook setShowEdit={setShowEdit} notebookId={notebookId} />
                </Modal>
            )}
        </>
    )
}

export default EditNotebookModal;
