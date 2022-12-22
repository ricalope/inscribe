const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS';
const ADD_NOTEBOOK = 'notebooks/ADD_NOTEBOOK';


const getNotebooks = notebooks => ({
    type: GET_NOTEBOOKS,
    notebooks
})


const addNotebook = notebook => ({
    type: ADD_NOTEBOOK,
    notebook
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
        default:
            return state
    }
}


export default notebooksReducer;
