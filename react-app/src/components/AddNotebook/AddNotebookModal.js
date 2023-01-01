import { Modal } from '../../context/Modal';
import AddNoteBook from './index';


function AddNotebookModal({ showNew, setShowNew }) {

    return (
        <>
            {showNew && (
                <Modal onClose={() => setShowNew(false)}>
                    <AddNoteBook setShowNew={setShowNew} />
                </Modal>
            )}
        </>
    )
}

export default AddNotebookModal;
