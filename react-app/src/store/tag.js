const GET_TAGS = 'tags/GET_TAGS';


const getTags = tags => ({
    type: GET_TAGS,
    tags
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


const initialState = { allTags: {}, oneTag: {} }


const tagsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TAGS: {
            const newState = { ...state, allTags: {}, oneTag: {} }
            action.tags.forEach(tag => newState.allTags[tag.id] = tag)
            return newState
        }
        default:
            return state
    }
}

export default tagsReducer;
