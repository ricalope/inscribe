import { Modal } from '../../context/Modal';
import DeleteNotebook from './index';


function DeleteNotebookModal({ showDelete, setShowDelete }) {

    return(
        <>
            {showDelete && (
                <Modal onClose={() => setShowDelete(false)}>
                    <DeleteNotebook setShowDelete={setShowDelete}/>
                </Modal>
            )}
        </>
    )
}

export default DeleteNotebookModal;
