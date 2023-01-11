const GET_TASKS = 'tasks/GET_TASKS';


const getAllTasks = tasks => ({
    type: GET_TASKS,
    tasks
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


const initialState = { allTasks: {}, oneTask: {} }


const tasksReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TASKS: {
            const newState = { ...state, allTasks: {}, oneTask: {} }
            action.tasks.forEach(task => newState.allTasks[task.id] = task)
            return newState;
        }
        default:
            return state
    }
}

export default tasksReducer;
