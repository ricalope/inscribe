import { Modal } from '../../context/Modal';
import DeleteTask from './index';


function DeleteTaskModal({ taskId, showDelete, setShowDelete }) {
    return (
        <>
            {showDelete && (
                <Modal onClose={() => setShowDelete(false)}>
                    <DeleteTask taskId={taskId} setShowDelete={setShowDelete} />
                </Modal>
            )}
        </>
    )
}

export default DeleteTaskModal;
