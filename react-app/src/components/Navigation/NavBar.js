import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { addNoteThunk } from '../../store/note';
import ghLogo from '../../assets/github-logo.png';
import liLogo from '../../assets/linkedin.png';
import logo from '../../assets/quill.png';
import LogoutModal from '../auth/LogoutModal';
import AddNotebookModal from '../AddNotebook/AddNotebookModal';
import AddTaskModal from '../AddTask/AddTaskModal';
import DeleteTagModal from '../DeleteTag/DeleteTagModal';
import Tags from '../Tags'
import Shortcuts from '../Shortcuts';
import AddTagModal from '../AddTag/AddTagModal';
import { DarkModeContext } from '../../context/ThemeContext';
import './Navigation.css'

const NavBar = () => {
    const dispatch = useDispatch();

    const [ showNew, setShowNew ] = useState(false);
    const [ showNewTask, setShowNewTask ] = useState(false);
    const [ showLogout, setShowLogout ] = useState(false);
    const [ showDropDown, setShowDropDown ] = useState(false);
    const [ showTags, setShowTags ] = useState(false);
    const [ showAddTag, setShowAddTag ] = useState(false);
    const [ showShortcuts, setShowShortcuts ] = useState(false);
    const [ showDel, setShowDel ] = useState(false);
    const [ tagId, setTagId ] = useState(0)

    const sessionUser = useSelector(state => state.session.user);

    const { darkMode, toggleMode } = useContext(DarkModeContext);

    useEffect(() => {
        localStorage.setItem('DARK_MODE', darkMode)
    }, [ darkMode ])

    const themeChange = () => {
        toggleMode();
    }

    const createNote = async () => {
        const data = {
            title: 'Untitled'
        }
        await dispatch(addNoteThunk(data))
    }

    const lengthCheck = (data, len) => {
        if (data.length > len) {
            return `${data.slice(0, len)}...`
        }
        return data
    }

    return (
        <>
            <div className="nav-main-container">
                <div className="nav-top-third">
                    <div className="top-top">
                        <div className="site-logo">
                            <div className="in-logo">
                                <img id="i-logo" src={logo} alt="quill logo" />
                            </div>
                            <div className="site-name">
                                <h2 id="h2-site">Inscribe</h2>
                            </div>
                        </div>
                        <div className="nav-top-container">
                            <div className="nav-light-switch">
                                <button id="light-switch" onClick={themeChange}>
                                    {darkMode ? '🌞' : '🌚'}
                                </button>
                            </div>
                            <div className="nav-email-dropdown">
                                <div className="caret-dd">
                                    {lengthCheck(sessionUser.email, 20)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="new-note task" onClick={() => setShowDropDown(!showDropDown)}>
                        + New
                        {!showDropDown ? <i className="fa-solid fa-caret-down" /> : <i className="fa-solid fa-caret-up" />}
                    </div>
                    {showDropDown && (
                        <div className={`new-nav-btns ${showDropDown ? 'show' : 'hide'}`}>
                            <Link exact="true" to="/notes" id="create-note" onClick={createNote}>
                                <div className="new-note">
                                    <div>
                                        + Note
                                    </div>
                                </div>
                            </Link>
                            <div className="n-nb-nav">
                                <button className="new-note book" onClick={() => setShowNew(true)}>
                                    + Notebook
                                </button>
                                {showNew && (
                                    <AddNotebookModal
                                        showNew={showNew}
                                        setShowNew={setShowNew}
                                    />
                                )}
                            </div>
                            <div className="new-note new-task" onClick={() => setShowNewTask(true)}>
                                + Task
                            </div>
                            {showNewTask && (
                                <AddTaskModal
                                    showNew={showNewTask}
                                    setShowNew={setShowNewTask}
                                />
                            )}
                        </div>
                    )}
                </div>
                <div className="nav-middle-links">
                    <div className="navlink">
                        <NavLink to="/" exact={true} activeClassName="active" className="nl-link">
                            <div className="nav-inner">
                                <div><i className="fa-solid fa-house fa-match" /></div>
                                <p className="p-link">Home</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className="navlink">
                        <button className="nl-tags nl-link" onClick={() => {
                            setShowShortcuts(!showShortcuts)
                            setShowTags(false)
                            }}>
                            <div className="nav-inner">
                                <div><i className="fa-solid fa-star fa-match" /></div>
                                <p className="p-link one">Shortcuts</p>
                            </div>
                        </button>
                    </div>
                    <div className="navlink">
                        <NavLink to="/notes" exact={true} activeClassName="active" className="nl-link">
                            <div className="nav-inner">
                                <div><i className="fa-solid fa-note-sticky fa-match" /></div>
                                <p className="p-link">Notes</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className="navlink">
                        <NavLink to="/tasks" exact={true} activeClassName="active" className="nl-link">
                            <div className="nav-inner">
                                <div><i className="fa-solid fa-circle-check fa-match" /></div>
                                <p className="p-link">Tasks</p>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className="nav-middle-second">
                    <div className="navlink">
                        <NavLink to="/notebooks" exact={true} activeClassName="active" className="nl-link">
                            <div className="nav-inner">
                                <div><i className="fa-solid fa-book fa-match" /></div>
                                <p className="p-link">Notebooks</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className="navlink">
                        <button className="nl-link nl-tags" onClick={() => {
                            setShowTags(!showTags)
                            setShowShortcuts(false)
                            }}>
                            <div className="nav-inner">
                                <div><i className="fa-solid fa-hashtag fa-match" /></div>
                                <p className="p-link">Tags</p>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="nav-footer">
                    <div className="logout-btn">
                        <button onClick={() => setShowLogout(true)} id="lo-btn">
                            <i className="fa-solid fa-arrow-right-from-bracket" />
                        </button>
                        {showLogout && (
                            <LogoutModal
                                showLogout={showLogout}
                                setShowLogout={setShowLogout}
                            />
                        )}
                    </div>
                    <div className="github-logo">
                        <a className="creator-links" href="https://github.com/ricalope" rel="noreferrer" target="_blank">
                            <img id="gh-logo" src={ghLogo} alt="github logo" />
                        </a>
                    </div>
                    <div className="github-logo">
                        <a className="creator-links" href="https://www.linkedin.com/in/ricardo-lopez-23a596112/" rel="noreferrer" target="_blank">
                            <img id="li-logo" src={liLogo} alt="linked in logo" />
                        </a>
                    </div>
                    <div className="dev-name">
                        <h5>Ricardo Lopez</h5>
                    </div>
                </div>
            </div>
            {showShortcuts && (
                <Shortcuts
                    showShortcuts={showShortcuts}
                    setShowShortcuts={setShowShortcuts}
                />
            )}
            {showTags && (
                <Tags
                    showTags={showTags}
                    setShowTags={setShowTags}
                    setShowNew={setShowAddTag}
                    setShowDel={setShowDel}
                    setTagId={setTagId}
                />
            )}
            {showAddTag && (
                <AddTagModal
                    showNew={showAddTag}
                    setShowNew={setShowAddTag}
                />
            )}
            {showDel && (
                <DeleteTagModal
                    tagId={tagId}
                    showDel={showDel}
                    setShowDel={setShowDel}
                />
            )}
        </>
    );
}

export default NavBar;
