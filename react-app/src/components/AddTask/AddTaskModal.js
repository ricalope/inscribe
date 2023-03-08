import { Modal } from '../../context/Modal';
import AddTask from './index';


function AddTaskModal({ showNew, setShowNew, notebookId }) {

    return (
        <>
            {showNew && (
                <Modal onClose={() => setShowNew(false)}>
                    <AddTask setShowNew={setShowNew} notebookId={notebookId} />
                </Modal>
            )}
        </>
    )
}

export default AddTaskModal;
