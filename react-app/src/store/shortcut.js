const GET_SHORTCUTS = 'shortcuts/GET_SHORTCUTS';


const getShortcuts = shortcuts => ({
    type: GET_SHORTCUTS,
    shortcuts
})


export const getShortcutsThunk = () => async dispatch => {
    const res = await fetch('/api/shortcuts')
    if(res.ok) {
        const data = await res.json()
        dispatch(getShortcuts(data))
        return data
    }
}


const initialState = { notes: {}, tasks: {}, notebooks: {} }


const shortcutsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SHORTCUTS: {
            // console.log(action)
            const newState = { ...state, notes: {}, tasks: {}, notebooks: {} }
            action.shortcuts.notes.forEach(note => newState.notes[note.id] = note)
            action.shortcuts.tasks.forEach(task => newState.tasks[task.id] = task)
            action.shortcuts.notebooks.forEach(nb => newState.notebooks[nb.id] = nb)
            return newState
        }
        default:
            return state
    }
}

export default shortcutsReducer;
