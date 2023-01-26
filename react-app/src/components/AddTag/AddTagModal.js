import { Modal } from '../../context/Modal';
import AddTag from './index';


function AddTagModal({ showNew, setShowNew }) {

    return (
        <>
            {showNew && (
                <Modal onClose={() => setShowNew(false)}>
                    <AddTag setShowNew={setShowNew} />
                </Modal>
            )}
        </>
    )
}

export default AddTagModal;
