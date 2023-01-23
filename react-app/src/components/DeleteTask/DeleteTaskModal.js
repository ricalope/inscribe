import { Modal } from '../../context/Modal';
import DeleteTask from './index';


function DeleteTaskModal({ taskId, showDelete, setShowDelete, setShowEdit }) {
    return (
        <>
            {showDelete && (
                <Modal onClose={() => setShowDelete(false)}>
                    <DeleteTask taskId={taskId} setShowDelete={setShowDelete} setShowEdit={setShowEdit} />
                </Modal>
            )}
        </>
    )
}

export default DeleteTaskModal;
