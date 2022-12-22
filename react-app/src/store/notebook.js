const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS'


const getNotebooks = notebooks => ({
    type: GET_NOTEBOOKS,
    notebooks
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


const initialState = { allNotebooks: {}, oneNotebook: {} }


const notebooksReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_NOTEBOOKS: {
            const newState = { ...state, allNotebooks: { ...state.allNotebooks }, oneNotebook: {} }
            action.notebooks.forEach(nb => newState.allNotebooks[nb.id] = nb)
            return newState
        }
        default:
            return state
    }
}


export default notebooksReducer;
