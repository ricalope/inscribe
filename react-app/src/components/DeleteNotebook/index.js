import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteNotebookThunk } from '../../store/notebook';


function DeleteNotebook() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { notebookId } = useParams();

    const onSubmit = async () => {
        await dispatch(deleteNotebookThunk(notebookId))
        history.push('/notebooks')
    }

    const onCancel = () => {
        history.push(`/notebooks/${notebookId}`)
    }

    return (
        <div className="del-nb-main-container">
            <div className="delete-nb-header">
                <h2>Delete notebook?</h2>
            </div>
            <div className="delete-nb-body">
                <h5>Any notes in the notebook will be deleted as well. This cannot be undone.</h5>
            </div>
            <div className="delete-buttons">
                <div>
                    <button onClick={onCancel} className="cancel-delete">Cancel</button>
                </div>
                <div>
                    <button onClick={onSubmit} className="confirm-delete">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteNotebook;