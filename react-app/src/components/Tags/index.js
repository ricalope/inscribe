import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTagsThunk } from '../../store/tag';
import { DarkModeContext } from '../../context/ThemeContext';
import bTag from '../../assets/tag-b.png';
import wTag from '../../assets/tag-w.png';
import './Tags.css';


function Tags({ showTags, setShowTags, setShowNew }) {

    const dispatch = useDispatch();
    const { darkMode } = useContext(DarkModeContext);

    const [ populated, setPopulated ] = useState(true);
    const [ style, setStyle ] = useState('');
    const [ search, setSearch ] = useState('');

    const tagsObj = useSelector(state => state.tags.allTags)
    const tags = Object.values(tagsObj)
    console.log(tags)

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
            <div id="tags-main" className={style}>
                <div className="tags-header-container">
                    <div className="tags-title-header">
                        <h2 id="tags-h2">Tags</h2>
                    </div>
                    <div className="tags-add-header">
                        <button
                            className="tags-add-btn"
                            onClick={() => {
                            setShowTags(false)
                            setShowNew(true)
                            }}>
                            <i className="fa-solid fa-square-plus" />
                        </button>
                        <button className="tags-close" onClick={() => setShowTags(false)}>
                            <i className="fa-solid fa-arrow-left-long" />
                        </button>
                    </div>
                </div>
                {populated ? (
                    <div className="tags-inner-container">
                        <div className="tags-search-bar">
                            <input
                                className="tags-search"
                                type="search"
                                placeholder="Find tags..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        {tags.map(tag => (
                            <div key={tag.id} className="tags-name">
                                <p>{tag.name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-tags-container">
                        <div className="empty-tags-image">
                            <img src={darkMode ? bTag : wTag} className="empty-image" alt="sad tags" />
                        </div>
                        <div className="empty-tags-header">
                            <h3>Find notes and tasks faster with tags.</h3>
                        </div>
                        <div className="empty-tags-body">
                            <h5>Click the <span>+ Add Tag</span> above or here to create a new tag</h5>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Tags;
