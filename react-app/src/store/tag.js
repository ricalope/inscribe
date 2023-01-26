const GET_TAGS = 'tags/GET_TAGS';
const ADD_TAG = 'tags/ADD_TAG';


const getTags = tags => ({
    type: GET_TAGS,
    tags
})


const addTag = tag => ({
    type: ADD_TAG,
    tag
})


export const getAllTagsThunk = () => async dispatch => {
    const res = await fetch('/api/tags')
    if (res.ok) {
        const data = await res.json()
        dispatch(getTags(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data
        }
    }
    return ['An error has occurred. Please try again.']
}


export const addTagThunk = tag => async dispatch => {
    const { name, noteId, taskId } = tag;
    const res = await fetch('/api/tags', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, note_id: noteId, task_id: taskId })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addTag(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data
        }
    }
    return ['An error has occurred. Please try again.']
}


const initialState = { allTags: {}, oneTag: {} }


const tagsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TAGS: {
            const newState = { ...state, allTags: {}, oneTag: {} }
            action.tags.forEach(tag => newState.allTags[tag.id] = tag)
            return newState
        }
        case ADD_TAG: {
            const newState = { ...state, allTags: { ...state.allTags }, oneTag: {} }
            newState.allTags[action.tag.id] = action.tag
            return newState
        }
        default:
            return state
    }
}

export default tagsReducer;
