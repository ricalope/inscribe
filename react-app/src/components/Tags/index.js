import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTagsThunk, searchTagsThunk } from '../../store/tag';
import { DarkModeContext } from '../../context/ThemeContext';
import bTag from '../../assets/tag-b.png';
import wTag from '../../assets/tag-w.png';
import './Tags.css';


function Tags({ showTags, setShowTags, setShowNew, setShowDel, setTagId }) {

    const dispatch = useDispatch();
    const { darkMode } = useContext(DarkModeContext);

    const [ style, setStyle ] = useState('');
    const [ search, setSearch ] = useState('');

    const tagsObj = useSelector(state => state.tags.allTags);
    const searchObj = useSelector(state => state.tags.searchTags);
    const tags = Object.values(tagsObj);
    const searchTags = Object.values(searchObj);

    useEffect(() => {
        dispatch(getAllTagsThunk())
    }, [])

    useEffect(() => {
        if (showTags) {
            setStyle('show')
        } else if (!showTags) {
            setStyle('hide')
        }

    }, [ tags.length, showTags ])

    useEffect(() => {
        if (search.length > 0) {
            dispatch(searchTagsThunk(search))
        } else if (search.length === 0) {
            dispatch(getAllTagsThunk())
        }
    }, [search.length])

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
                </div>
                {tags.length > 0 && searchTags.length === 0 && (
                    <div className="tags-inner-container">
                        {tags.map(tag => (
                            <div key={tag.id} className="tags-name">
                                <div className="t-n-dd">
                                    <div id="t-dd">{tag.name}</div>
                                    <div id="t-x" onClick={() => {
                                        setTagId(tag.id)
                                        setShowTags(false)
                                        setShowDel(true)
                                    }}>
                                        <span id="t-delete">{tag.name} &nbsp;
                                            <span id="t-d">x</span></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {searchTags.length > 0 && tags.length === 0 && (
                    <div className="tags-inner-container">
                        {searchTags.map(tag => (
                            <div key={tag.id} className="tags-name">
                                <div className="t-n-dd">
                                    <div id="t-dd">{tag.name}</div>
                                    <div id="t-x" onClick={() => {
                                        setTagId(tag.id)
                                        setShowTags(false)
                                        setShowDel(true)
                                    }}>
                                        <span id="t-delete">
                                            {tag.name} &nbsp;
                                            <span id="t-d">x</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {searchTags.length === 0 && tags.length === 0 && (
                    <div className="empty-tags-container">
                        <div className="empty-tags-image">
                            <img src={darkMode ? bTag : wTag} className="empty-image" alt="sad tags" />
                        </div>
                        <div className="empty-tags-header">
                            <h3>Find notes and tasks faster with tags.</h3>
                        </div>
                        <div className="empty-tags-body">
                            <h5>Click the <span onClick={() => {
                                setShowTags(false)
                                setShowNew(true)
                            }}>+ Add Tag</span>above or here to create a new tag</h5>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Tags;
