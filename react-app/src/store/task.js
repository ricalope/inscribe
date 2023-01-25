const GET_TASKS = 'tasks/GET_TASKS';
const ADD_TASK = 'tasks/ADD_TASK';
const EDIT_TASK = 'tasks/EDIT_TASK';
const DELETE_TASK = 'tasks/DELETE_TASKS';


const getAllTasks = tasks => ({
    type: GET_TASKS,
    tasks
})


const addTask = task => ({
    type: ADD_TASK,
    task
})


const addCheck = task => ({
    type: EDIT_TASK,
    task
})


const deleteTask = task => ({
    type: DELETE_TASK,
    task
})


export const getAllTasksThunk = () => async dispatch => {
    const res = await fetch('/api/tasks')
    if (res.ok) {
        const data = await res.json()
        dispatch(getAllTasks(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data
        }
    }
    return ['An error has occurred. Please Try again.']
}


export const addTaskThunk = data => async dispatch => {
    const { notebookId, body, taskDate } = data;
    console.log(taskDate)
    const res = await fetch('/api/tasks', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notebook_id: notebookId, body, task_date: taskDate })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addTask(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data
        }
    }
    return ['An error has occurred. Please try again.']
}


export const editTaskThunk = task => async dispatch => {
    const { taskId, notebookId, checked, body, taskDate } = task;

    if (checked !== undefined) {
        const res = await fetch(`/api/tasks/${taskId}/checked`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ notebookId, checked })
        })
        if (res.ok) {
            const data = await res.json()
            dispatch(addCheck(data))
            return data
        }
    }
    const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notebook_id: notebookId, checked, body, task_date: taskDate })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addCheck(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data
        }
    }
    return ['An error has occurred. Please try again.']
}


export const deleteTaskThunk = taskId => async dispatch => {
    const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteTask(taskId))
        return
    }
    return ['An error has occurred. Please try again.']
}


const initialState = { allTasks: {}, oneTask: {} }


const tasksReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TASKS: {
            const newState = { ...state, allTasks: {}, oneTask: {} }
            action.tasks.forEach(task => newState.allTasks[task.id] = task)
            return newState;
        }
        case ADD_TASK: {
            const newState = { ...state, allTasks: { ...state.allTasks }, oneTask: {} }
            newState.allTasks[action.task.id] = action.task
            return newState
        }
        case EDIT_TASK: {
            const newState = { ...state, allTasks: { ...state.allTasks }, oneTask: {} }
            newState.allTasks[action.task.id] = action.task
            return newState
        }
        case DELETE_TASK: {
            const newState = { ...state, allTasks: { ...state.allTasks }, oneTask: { ...state.oneTask } }
            delete newState.allTasks[action.taskId]
            return newState
        }
        default:
            return state
    }
}

export default tasksReducer;
