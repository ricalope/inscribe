import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTagsThunk, updateTagThunk, addTagThunk } from '../../store/tag';
import { getAllNotesThunk } from '../../store/note';
import { Hint } from 'react-autocomplete-hint';


function EditTag({ setShowEdit, noteId, tagNoteArray }) {

    const dispatch = useDispatch();

    const tagsObj = useSelector(state => state.tags.allTags);
    const tags = Object.values(tagsObj);
    const tagNames = tags.map(tag =>  {
        return { id: tag.id, label: tag.name }
    });

    const [ input, setInput ] = useState('');
    const [ tagId, setTagId ] = useState(0);
    const [ errors, setErrors ] = useState([]);

    const setFields = field => {
        setTagId(field.id)
        setInput(field.label)
    }

    useEffect(() => {
        (async () => {
            await dispatch(getAllTagsThunk())
        })()
    }, [ dispatch ])

    useEffect(() => {
        const foundTag = tagNoteArray.find(tag => tag.id === tagId)
        console.log(foundTag)
        if (foundTag) {
            setErrors('Tag already added to this note.')
        }
        return () => setErrors([]);
    }, [ tagId ])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (errors.length > 0) return;

        if (tagId === 0) {
            const data = {
                name: input,
                noteId
            }
            await dispatch(addTagThunk(data))
            await dispatch(getAllNotesThunk())
            setShowEdit(false)
            return
        }

        const formData = {
            tagId,
            name: input,
            noteId
        }
        await dispatch(updateTagThunk(formData))
        await dispatch(getAllNotesThunk())
        setShowEdit(false)
        return
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="edit-tag-container">
                    <div className="edit-tag-header">
                        <h3>Add Tag</h3>
                    </div>
                    <div className="edit-tag-disclaimer">
                        <p>Press tab to select existing tag.</p>
                    </div>
                    <div className="edit-tag-input">
                        <Hint options={tagNames} allowTabFill onFill={value => (
                            setFields(value)
                        )}>
                            <input
                                type="text"
                                id="e-t-input"
                                placeholder="tag name..."
                                autoComplete="off"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </Hint>
                    </div>
                    {errors.length > 0 && (
                        <div className="errors">
                            <p>{errors}</p>
                        </div>
                    )}
                    <div className="edit-tag-btn-container">
                        <button type="submit" className="nb-btn two" disabled={!!errors.length}>
                            add tag
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditTag;
