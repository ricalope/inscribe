import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasksThunk } from '../../store/task';
import NavBar from '../Navigation/NavBar';
import AddTaskModal from '../AddTask/AddTaskModal';
import EditTask from '../EditTask';
import './Tasks.css';


function Tasks() {

    const dispatch = useDispatch();
    const tasksObj = useSelector(state => state.tasks.allTasks);
    const tasks = Object.values(tasksObj)

    const [ populated, setPopulated ] = useState(true);
    const [ showNew, setShowNew ] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(getAllTasksThunk())
        })()
        if (tasks.length > 0) {
            setPopulated(false)
        } else if (tasks.length === 0) {
            setPopulated(true)
        }
    }, [ dispatch, tasks.length ])

    // const displayDate = date => {
    //     date = new Date(date)
    //     const updatedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'medium' }).format(date)
    //     return updatedDate
    // }

    return (
        <>
            <NavBar />
            <div className="tasks-outer-container">
                <div className="tasks-main-container">
                    <div className="tasks-header">
                        <div className="t-header">
                            <div className="t-title">
                                <i className="fa-solid fa-list-check" />
                                <h1 className="t-h1">Tasks</h1>
                            </div>
                            <div className="t-new">
                                <button className="t-btn" onClick={() => setShowNew(true)}>
                                    Add Task
                                </button>
                            </div>
                            {showNew && (
                                <AddTaskModal
                                    showNew={showNew}
                                    setShowNew={setShowNew}
                                />
                            )}
                        </div>
                        <div className="t-count">
                            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                        </div>
                    </div>
                    <div className="tasks-inner-container">
                        {populated ? (
                            <div className="empty-tasks">

                            </div>
                        ) : (
                            <div className="column-tasks">
                                {tasks.map((task, index) => (
                                    <div key={task.id}
                                        className="tasks-card"
                                    >
                                        <EditTask
                                            taskId={task.id}
                                            taskIndex={index}
                                            taskChecked={task.checked}
                                            taskBody={task.body}
                                            taskDate={task.task_date}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tasks;
