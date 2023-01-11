import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasksThunk } from '../../store/task';
import NavBar from '../Navigation/NavBar';
import './Tasks.css';


function Tasks() {

    const dispatch = useDispatch();
    const tasksObj = useSelector(state => state.tasks.allTasks);
    const tasks = Object.values(tasksObj)
    console.log(tasks)

    const [ populated, setPopulated ] = useState(true);

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

    return (
        <>
            <NavBar />
            <div className="tasks-outer-container">
                <div className="tasks-main-container">
                    <div className="tasks-header">
                        <div className="t-header">
                            <i className="fa-solid fa-list-check" />
                            <h1>Tasks</h1>
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
                                {tasks.map(task => (
                                    <div key={task.id}
                                        className="tasks-card"
                                    >
                                        <div className="task-body">
                                            {task?.body}
                                        </div>
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
