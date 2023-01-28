const GET_TAGS = 'tags/GET_TAGS';
const ADD_TAG = 'tags/ADD_TAG';
const UPDATE_TAG = 'tags/UPDATE_TAG';
const DELETE_TAG = 'tags/DELETE_TAG';


const getTags = tags => ({
    type: GET_TAGS,
    tags
})


const addTag = tag => ({
    type: ADD_TAG,
    tag
})


const updateTag = tag => ({
    type: UPDATE_TAG,
    tag
})


const deleteTag = tag => ({
    type: DELETE_TAG,
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
    const { name, noteId } = tag;
    const res = await fetch('/api/tags', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, note_id: noteId })
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


export const updateTagThunk = tag => async dispatch => {
    const { tagId, name, noteId } = tag;
    const res = await fetch(`/api/tags/${tagId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, note_id: noteId })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(updateTag(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data
        }
    }
    return ['An error has occurred. Please try again.']
}


export const deleteTagThunk = tagId => async dispatch => {
    const res = await fetch(`/api/tags/${tagId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteTag(tagId))
        return
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
        case UPDATE_TAG: {
            const newState = { ...state, allTags: { ...state.allTags }, oneTag: {} }
            newState.allTags[action.tag.id] = action.tag
            return newState
        }
        case DELETE_TAG: {
            const newState = { ...state, allTags: { ...state.allTags }, oneTag: { ...state.oneTag } }
            delete newState.allTags[action.tagId]
            return newState
        }
        default:
            return state
    }
}

export default tagsReducer;
