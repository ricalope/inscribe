const GET_NOTES = 'notes/GET_NOTES'


const getAllNotes = notes => ({
    type: GET_NOTES,
    notes
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

const initialState = { allNotes: {}, oneNote: {} }

export default function notesReducer(state = initialState, action) {

    switch(action.type) {

        case GET_NOTES: {
            const newState = { ...state, allNotes: { ...state.allNotes }, oneNote: {} }
            action.notes.forEach(note => newState.allNotes[note.id] = note)
            return newState
        }
        default:
            return state
    }
}
