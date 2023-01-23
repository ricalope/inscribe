import { Modal } from '../../context/Modal';
import EditOneTask from './EditOneTask';


function EditTaskModal({ taskId, taskBody, taskDate, showEdit, setShowEdit, setShowDelete }) {

    return (
        <>
            {showEdit && (
                <Modal onClose={() => setShowEdit(false)}>
                    <EditOneTask
                        taskId={taskId}
                        taskBody={taskBody}
                        taskDate={taskDate}
                        setShowEdit={setShowEdit}
                        setShowDelete={setShowDelete}
                    />
                </Modal>
            )}
        </>
    )
}

export default EditTaskModal;
