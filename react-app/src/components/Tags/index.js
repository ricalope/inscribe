import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTagsThunk } from '../../store/tag';
import './Tags.css'


function Tags({ showTags }) {

    const dispatch = useDispatch();

    const [ populated, setPopulated ] = useState(true);
    const [ style, setStyle ] = useState('');

    const tagsObj = useSelector(state => state.tags.allTags)
    const tags = Object.values(tagsObj);

    useEffect(() => {
        (async () => {
            await dispatch(getAllTagsThunk())
        })()

        if (tags.length === 0) {
            setPopulated(false)
        } else if (tags.length > 0) {
            setPopulated(true)
        }

        if (showTags) {
            setStyle('show')
        } else if (!showTags) {
            setStyle('hide')
        }

    }, [ dispatch, tags.length, showTags ])

    return (
        <>
            {populated ? (
                <div id="tags-main" className={style}>
                    <div className="tags-header-container">
                        <div className="tags-title-header">
                            <h2>Tags</h2>
                        </div>
                    </div>
                    <div className="tags-inner-container">
                        {tags.map(tag => (
                            <div key={tag.id} className="tags-name">
                                <p>{tag.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="empty-tags-container">

                </div>
            )}
        </>
    )
}

export default Tags;
