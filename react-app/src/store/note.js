const GET_NOTES = 'notes/GET_NOTES'
const ADD_NOTE = 'notes/ADD_NOTE'
const EDIT_NOTE = 'notes/EDIT_NOTE'
const GET_NOTE = 'notes/GET_NOTE'
const DELETE_NOTE = 'notes/DELETE_NOTE'

const getAllNotes = notes => ({
    type: GET_NOTES,
    notes
})

const getOneNote = note => ({
    type: GET_NOTE,
    note
})

const addNote = note => ({
    type: ADD_NOTE,
    note
})

const editNote = note => ({
    type: EDIT_NOTE,
    note
})

const deleteNote = noteId => ({
    type: DELETE_NOTE,
    noteId
})

export const getAllNotesThunk = () => async dispatch => {
    const res = await fetch('/api/notes')
    if (res.ok) {
        const data = await res.json()
        dispatch(getAllNotes(data))
        return data
    }
    else if (res.status < 500) {
        const data = await res.json()
        if (data.errors){
            return data.errors
        }
    }
    return ["An error has occurred. Please try again."]
}

export const getOneNoteThunk = noteId => async dispatch => {
    const res = await fetch(`/api/notes/${noteId}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getOneNote(data))
        return data
    }
}

export const addNoteThunk = data => async dispatch => {
    const { notebookId, title, body } = data
    const res = await fetch('/api/notes', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notebook_id: notebookId, title, body })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addNote(data))
        return data
    }
    else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    }
}

export const editNoteThunk = data => async dispatch => {
    const { noteId, title, body } = data
    const res = await fetch(`/api/notes/${noteId}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body })
    })
    if (res.ok){
        const data = await res.json()
        dispatch(editNote(data))
        return data
    }
}

export const deleteNoteThunk = noteId => async dispatch => {
    const res = await fetch(`/api/notes/${noteId}/delete`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteNote(noteId))
    }
}

const initialState = { allNotes: {}, oneNote: {} }

const notesReducer = (state = initialState, action) => {

    switch(action.type) {

        case GET_NOTES: {
            const newState = { ...state, allNotes: {}, oneNote: {} }
            action.notes.forEach(note => newState.allNotes[note.id] = note)
            return newState
        }
        case GET_NOTE: {
            const newState = { ...state, allNotes: {}, oneNote: {} }
            newState.oneNote[action.note.id] = action.note
            return newState
        }
        case ADD_NOTE: {
            const newState = { ...state, allNotes: { ...state.allNotes }, oneNote: {} }
            newState.allNotes[action.note.id] = action.note
            return newState
        }
        case EDIT_NOTE: {
            const newState = { ...state, allNotes: { ...state.allNotes }, oneNote: { ...state.oneNote } }
            newState.oneNote[action.note.id] = action.note
            return newState
        }
        case DELETE_NOTE: {
            const newState = { ...state, allNotes: { ...state.allNotes }, oneNote: { ...state.oneNote } }
            delete newState.allNotes[action.noteId]
            return newState
        }
        default:
            return state
    }
}

export default notesReducer
