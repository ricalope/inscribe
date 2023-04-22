import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DarkModeContext } from '../../context/ThemeContext';
import notask from '../../assets/no-task.png';
import NavBar from '../Navigation/NavBar';
import AddTaskModal from '../AddTask/AddTaskModal';
import EditTask from '../EditTask';
import { getAllTasksThunk } from '../../store/task';
import { sortDates } from '../../utils/helpers';
import './Tasks.css';


function Tasks() {

    const { darkMode } = useContext(DarkModeContext);
    const dispatch = useDispatch()

    const tasksObj = useSelector(state => state.tasks.allTasks);
    let tasks = Object.values(tasksObj)
    tasks = sortDates(tasks)

    const [ showNew, setShowNew ] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(getAllTasksThunk())
        })()
    },[])

    return (
        <>
            <NavBar />
            <div className="tasks-outer-container">
                <div className="tasks-main-container">
                    <div className={darkMode ? "tasks-header dark" : "tasks-header light"}>
                        <div className="t-header">
                            <div className="t-title">
                                <i className="fa-solid fa-list-check" />
                                <h1 className="t-h1">Tasks</h1>
                            </div>
                            <div className="t-new">
                                <button
                                    className={darkMode ? "t-d-btn td-dark" : "t-d-btn td-light"}
                                    onClick={() => setShowNew(true)}>
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
                    <div className={darkMode ? "tasks-inner-container dark" : "tasks-inner-container light"}>
                        {tasks.length > 0 ? (
                            <div className="column-tasks">
                                {tasks.map((task) => (
                                    <div key={task.id}
                                        className="tasks-card"
                                    >
                                        <EditTask
                                            taskId={task.id}
                                            taskChecked={task.checked}
                                            taskBody={task.body}
                                            taskDate={task.task_date}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-tasks-wrapper">
                                <div className="empty-tasks">
                                    <div className="empty-task-img">
                                        <img src={notask} className="empty-image" alt="no task" />
                                    </div>
                                    <div className="empty-task-body">
                                        <p className="mt-p">
                                            There are no tasks currently, click <span className="sp-click" onClick={() => {
                                                setShowNew(true)
                                            }}>add task</span> if you would like to create a new one.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tasks;
