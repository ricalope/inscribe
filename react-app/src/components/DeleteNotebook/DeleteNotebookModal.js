import { Modal } from '../../context/Modal';
import DeleteNotebook from './index';


function DeleteNotebookModal({ showDelete, setShowDelete, notebookId }) {

    return(
        <>
            {showDelete && (
                <Modal onClose={() => setShowDelete(false)}>
                    <DeleteNotebook setShowDelete={setShowDelete} notebookId={notebookId} />
                </Modal>
            )}
        </>
    )
}

export default DeleteNotebookModal;
