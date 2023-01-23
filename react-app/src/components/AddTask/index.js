import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskThunk } from '../../store/task';

function AddTask({ setShowNew }) {

    const dispatch = useDispatch();

    const [ body, setBody ] = useState('');
    const [ taskDate, setTaskDate ] = useState('');
    const [ errors, setErrors ] = useState([]);
    const [ submitted, setSubmitted ] = useState(false)

    const formattedDate = date => {
        const removeT = date.replace('T', ' ')
        const removeZ = removeT.replace('.000Z', '')
        return removeZ.slice(0, -3)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (errors.length > 0) return

        let formatDate = new Date(taskDate).toJSON()
        const formData = {
            body,
            taskDate: formattedDate(formatDate)
        }
        const data = await dispatch(addTaskThunk(formData))
        if (data && data.errors) {
            setErrors(data.errors)
            return
        }
        setShowNew(false);
        return
    }

    return (
        <div className="add-task-main-container">
            <form onSubmit={onSubmit}>
                <div className="add-task-header">
                    <h3>Add a Task</h3>
                </div>
                <div className="t-new-body">
                    <input
                        type="text"
                        className="t-add"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <div className="t-new-date">
                    <input
                        type="datetime-local"
                        className="t-date"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                    />
                </div>
                <div className="t-new-buttons">
                    <button className="t-new-cancel" onClick={() => setShowNew(false)}>
                        Cancel
                    </button>
                    <button
                        className="t-new-submit"
                        type="submit"
                        disabled={body.trim().length > 0 ? false : true}>
                        Create Task
                    </button>
                </div>
                {submitted && errors.length > 0 && (
                    <div className="a-t-errors">
                        {errors.map((e,i) => (
                            <p key={i}>{e}</p>
                        ))}
                    </div>
                )}
            </form>
        </div>
    )
}

export default AddTask;
