const GET_SHORTCUTS = 'shortcuts/GET_SHORTCUTS';
const ADDNOTE_SHORTCUT = 'shortcuts/ADDNOTE_SHORTCUT';


const getShortcuts = shortcuts => ({
    type: GET_SHORTCUTS,
    shortcuts
})


const addNoteShortcut = shortcut => ({
    type: ADDNOTE_SHORTCUT,
    shortcut
})


export const getShortcutsThunk = () => async dispatch => {
    const res = await fetch('/api/shortcuts')
    if(res.ok) {
        const data = await res.json()
        dispatch(getShortcuts(data))
        return data
    }
}


export const addNoteSCThunk = shortcut => async dispatch => {
    const { noteId, starred } = shortcut
    const res = await fetch(`/api/shortcuts/notes/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ starred })
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(addNoteShortcut(data))
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
        case ADDNOTE_SHORTCUT: {
            const newState = { ...state, notes: { ...state.notes } }
            newState.notes[action.shortcut.id] = action.shortcut
            return newState
        }
        default:
            return state
    }
}

export default shortcutsReducer;
