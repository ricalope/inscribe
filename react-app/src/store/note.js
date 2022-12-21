const GET_NOTES = 'notes/GET_NOTES'
const ADD_NOTE = 'notes/ADD_NOTE'

const getAllNotes = notes => ({
    type: GET_NOTES,
    notes
})

const addNote = note => ({
    type: ADD_NOTE,
    note
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

export const addNoteThunk = data => async dispatch => {
    const { title, body } = data
    const res = await fetch('/api/notes', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body })
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

const initialState = { allNotes: {}, oneNote: {} }

export default function notesReducer(state = initialState, action) {

    switch(action.type) {

        case GET_NOTES: {
            const newState = { ...state, allNotes: { ...state.allNotes }, oneNote: {} }
            action.notes.forEach(note => newState.allNotes[note.id] = note)
            return newState
        }
        case ADD_NOTE: {
            const newState = { ...state, allNotes: { ...state.allNotes }, oneNote: {} }
            console.log(newState)
            newState.allNotes[action.note.id] = action.note
            return newState
        }
        default:
            return state
    }
}
