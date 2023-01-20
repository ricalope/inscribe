import { Modal } from '../../context/Modal';
import AddTask from './index';


function AddTaskModal({ showNew, setShowNew }) {

    return (
        <>
            {showNew && (
                <Modal onClose={() => setShowNew(false)}>
                    <AddTask setShowNew={setShowNew} />
                </Modal>
            )}
        </>
    )
}

export default AddTaskModal;
