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


const initialState = { allShortcuts: {} }


const shortcutsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SHORTCUTS: {
            const newState = { ...state, allShortcuts: { ...state.allShortcuts } }
            action.shortcuts.forEach(sc => newState.allShortcuts[sc.id] = sc)
            return newState
        }
        default:
            return state
    }
}

export default shortcutsReducer;
