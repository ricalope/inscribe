import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { DarkModeContext } from '../../context/ThemeContext';
import { editTaskThunk } from '../../store/task';
import DeleteTaskModal from '../../components/DeleteTask/DeleteTaskModal';


function EditTask({ taskId, taskIndex, taskChecked, taskBody, taskDate }) {

    const dispatch = useDispatch();

    const formattedDate = date => {
        date = Date.parse(date)
        const tzOffset = (new Date().getTimezoneOffset() * 60000)
        return (new Date(date - tzOffset)).toISOString().slice(0, -8)
    }

    const pythonDate = date => {
        const removeT = date.replace('T', ' ')
        return removeT
    }

    const [ checked, setChecked ] = useState(taskChecked);
    const [ body, setBody ] = useState(taskBody);
    const [ date, setDate ] = useState(formattedDate(taskDate));
    const [ showDelete, setShowDelete ] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            taskId,
            checked,
            body,
            taskDate: pythonDate(date)
        }
        await dispatch(editTaskThunk(formData))
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="edit-task-form-container">
                    <div className="t-checked">
                        <input
                            type="checkbox"
                            className="t-check"
                            defaultChecked={checked}
                            onChange={() => setChecked(!checked)}
                        />
                    </div>
                    <div className="t-body">
                        <input
                            type="text"
                            className="t-input-body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    <div className="t-date">
                        <input
                            type="datetime-local"
                            className="t-input-date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="t-edit-btns">
                        <button type="submit" className="t-submit">
                            Submit
                        </button>
                        <button
                            type="button"
                            className="t-del-button"
                            onClick={() => setShowDelete(true)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </form>
            {showDelete && (
                <DeleteTaskModal
                    taskId={taskId}
                    showDelete={showDelete}
                    setShowDelete={setShowDelete}
                />
            )}
        </>

    )
}

export default EditTask;
