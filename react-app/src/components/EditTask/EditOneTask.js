import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { editTaskThunk } from '../../store/task';
import { DarkModeContext } from '../../context/ThemeContext';
import DeleteTaskModal from '../DeleteTask/DeleteTaskModal';


function EditOneTask({ taskId, taskBody, taskDate, setShowEdit }) {

    const dispatch = useDispatch();
    const { darkMode } = useContext(DarkModeContext);

    const formattedDate = date => {
        date = Date.parse(date)
        const tzOffset = (new Date().getTimezoneOffset() * 60000)
        return (new Date(date - tzOffset)).toISOString().slice(0, -8)
    }

    const pythonDate = date => {
        const removeT = date.replace('T', ' ')
        return removeT
    }

    const [ body, setBody ] = useState(taskBody);
    const [ date, setDate ] = useState(formattedDate(taskDate));
    const [ errors, setErrors ] = useState([]);
    const [ submitted, setSubmitted ] = useState(false);
    const [ showDelete, setShowDelete ] = useState(false);

    useEffect(() => {
        if (body.trim().length < 1) {
            setErrors('Task body cannot be empty. Please enter a body for the task.')
        }

        return () => {
            setErrors([])
            setSubmitted(false)
        }
    }, [ body ])

    const onSubmit = async e => {
        e.preventDefault()

        setSubmitted(true)
        if (errors.length > 0) return

        const formData = {
            taskId,
            body,
            taskDate: pythonDate(date)
        }
        await dispatch(editTaskThunk(formData))
        setShowEdit(false)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="edit-one-task-container">
                    <div className="one-task-h3">
                        <h3>Task Details</h3>
                    </div>
                    <div className="t-body">
                        <textarea
                            style={{ resize: "none" }}
                            className="t-input-body"
                            spellCheck="false"
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
                    {submitted && errors.length > 0 && (
                        <div className="errors">
                            {errors}
                        </div>
                    )}
                    <div className="t-edit-btns">
                        <button
                            type="button"
                            className="t-del-button"
                            onClick={() => setShowDelete(true)}
                        >
                            Delete task
                        </button>
                        <div className="t-can-sub">
                            <button
                                type="submit"
                                className={darkMode ? "nb-btn one dark" : "nb-btn one light"}
                                onClick={() => setShowEdit(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="nb-btn two">
                                Submit
                            </button>
                            {showDelete && (
                                <DeleteTaskModal
                                    taskId={taskId}
                                    showDelete={showDelete}
                                    setShowDelete={setShowDelete}
                                    setShowEdit={setShowEdit}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditOneTask;
