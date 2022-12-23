const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS';
const ADD_NOTEBOOK = 'notebooks/ADD_NOTEBOOK';
const GET_NOTEBOOK = 'notebooks/GET_NOTEBOOK';
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOKS';


const getNotebooks = notebooks => ({
    type: GET_NOTEBOOKS,
    notebooks
})


const addNotebook = notebook => ({
    type: ADD_NOTEBOOK,
    notebook
})


const getNotebook = notebook => ({
    type: GET_NOTEBOOK,
    notebook
})


const deleteNotebook = notebookId => ({
    type: DELETE_NOTEBOOK,
    notebookId
})


export const getAllNotebooksThunk = () => async dispatch => {
    const res = await fetch('/api/notebooks')
    if (res.ok) {
        const data = await res.json()
        dispatch(getNotebooks(data))
        return data
    }
    else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    }
    return ['An error has occurred. Please try again.']
}


export const getOneNotebookThunk = notebookId => async dispatch => {
    const res = await fetch(`/api/notebooks/${notebookId}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getNotebook(data))
        return data
    }
    else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    }
    return ['An error has occurred. Please try again.']
}


export const addNotebookThunk = notebook => async dispatch => {
    const { title } = notebook
    const res = await fetch('/api/notebooks', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addNotebook(data))
        return data
    }
    else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    }
    return ['An error has occurred. Please try again later.']
}


export const deleteNotebookThunk = notebookId => async dispatch => {
    const res = await fetch(`/api/notebooks/${notebookId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteNotebook(notebookId))
    }
    else if (res.status < 500) {
        const data = await res.status()
        if (data.errors) {
            return data.errors
        }
    }
    return ['An error has occurred. Please try again.']
}


const initialState = { allNotebooks: {}, oneNotebook: {} }


const notebooksReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_NOTEBOOKS: {
            const newState = { ...state, allNotebooks: { ...state.allNotebooks }, oneNotebook: {} }
            action.notebooks.forEach(nb => newState.allNotebooks[nb.id] = nb)
            return newState
        }
        case ADD_NOTEBOOK: {
            const newState = { ...state, allNotebooks: { ...state.allNotebooks }, oneNotebook: {} }
            newState.allNotebooks[action.notebook.id] = action.notebook
            return newState
        }
        case GET_NOTEBOOK: {
            const newState = { ...state, allNotebooks: {}, oneNotebook: {} }
            newState.oneNotebook[action.notebook.id] = action.notebook
            return newState
        }
        case DELETE_NOTEBOOK: {
            const newState = { ...state, allNotebooks: { ...state.allNotebooks }, oneNotebook: { ...state.oneNotebook } }
            delete newState.oneNotebook[action.notebookId]
            return newState
        }
        default:
            return state
    }
}


export default notebooksReducer;
