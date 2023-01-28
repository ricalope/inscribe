import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { editTaskThunk } from '../../store/task';
import { DarkModeContext } from '../../context/ThemeContext';
import EditTaskModal from './EditTaskModal';
import DeleteTaskModal from '../DeleteTask/DeleteTaskModal';
import './EditTask.css';

function EditTask({ taskId, taskChecked, taskBody, taskDate }) {

    const dispatch = useDispatch();
    const { darkMode } = useContext(DarkModeContext)

    const displayDate = date => {
        date = new Date(date)
        const updatedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date)
        const [ month, , time ] = updatedDate.split(', ')
        return `${month}, ${time}`
    }

    const [ checked, setChecked ] = useState(taskChecked);
    const [ showEdit, setShowEdit ] = useState(false);
    const [ showDelete, setShowDelete ] = useState(false);
    const [ showToolTip, setShowToolTip ] = useState(false);

    const onCheck = async (e) => {
        setChecked(!checked)
        const task = { taskId, checked: !checked }
        await dispatch(editTaskThunk(task))
    }

    return (
        <>
            <table className={darkMode ? "edit-task-form-container t-dark" : "edit-task-form-container t-light"}>
                <tbody>
                    <tr>
                        <td>
                            <label className="container">
                                <input
                                    type="checkbox"
                                    className="t-check"
                                    defaultChecked={checked}
                                    onChange={(e) => onCheck(e)}
                                />
                                <div className="checkmark" />
                            </label>
                        </td>
                        <td>
                            <div className="t-d-body">
                                <p>{taskBody}</p>
                            </div>
                        </td>
                        <td className="t-d-date">
                            <p>{taskDate ? `Due ${displayDate(taskDate)}` : 'No Due Date'}</p>
                        </td>
                        <td>
                            <div className="t-d-action">
                                <div className="tb-container">
                                    <button
                                        className={darkMode ? "t-d-btn td-dark" : "t-d-btn td-light"}
                                        onMouseEnter={() => setShowToolTip(true)}
                                        onMouseLeave={() => setShowToolTip(false)}
                                        onClick={() => setShowEdit(true)}>
                                        <i className="fa-solid fa-ellipsis" />
                                    </button>
                                </div>
                                {showToolTip && (
                                    <div className="outer-tt">
                                        <div className="tt-arrow one" />
                                        <div className={darkMode ? "tt-arrow two dark" : "tt-arrow two light"} />
                                        <div className={darkMode ? "tooltip dark" : "tooltip light"}>
                                            <p id="tt-p">Task Details</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            {showEdit && (
                <EditTaskModal
                    taskId={taskId}
                    taskBody={taskBody}
                    taskDate={taskDate}
                    showEdit={showEdit}
                    setShowEdit={setShowEdit}
                    setShowDelete={setShowDelete}
                />
            )}
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
