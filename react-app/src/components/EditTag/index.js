import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTagsThunk, updateTagThunk } from '../../store/tag';


function EditTag({ setShowEdit, noteId }) {

    const dispatch = useDispatch();

    const tagsObj = useSelector(state => state.tags.allTags);
    const tags = Object.values(tagsObj);

    const [ input, setInput ] = useState('');
    const [ suggestions, setSuggestions ] = useState([]);

    useEffect(() => {
        (async () => {
            await dispatch(getAllTagsThunk())
        })()
    }, [dispatch])

    const handleSubmit = async e => {
        e.preventDefault()

        const value = e.target.value;
        let matches;

        if (value.length >= 1) {
            const regex = new RegExp(`${value}`, 'gi')
            matches = tags.filter(tag => (
                regex.test(tag.name)
            ))
        }

        setSuggestions(matches)
        setInput(value)
    }

    return (
        <>
            <div className="edit-tag-container">
                <div className="edit-tag-header">
                    <h3>Add Tag</h3>
                </div>
                <div className="edit-tag-input">
                    <input
                        type="text"
                        id="e-t-input"
                        placeholder="tag name..."
                        value={input}
                        onChange={handleSubmit}
                    />
                    {suggestions.length > 0 && (
                        <div className="suggestions-wrapper">
                            {suggestions.map(suggestion => (
                                <div key={suggestion.id} className="suggestions">
                                    {suggestion.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default EditTag;
