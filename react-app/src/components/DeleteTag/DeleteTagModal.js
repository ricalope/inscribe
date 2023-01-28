import { Modal } from '../../context/Modal';
import DeleteTag from './index';


function DeleteTagModal({ tagId, showDel, setShowDel }) {

    return (
        <>
            {showDel && (
                <Modal onClose={() => setShowDel(false)}>
                    <DeleteTag tagId={tagId} setShowDel={setShowDel} />
                </Modal>
            )}
        </>
    )
}

export default DeleteTagModal;
