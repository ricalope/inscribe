import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotesThunk, addNoteThunk } from '../../store/note';
import { DarkModeContext } from '../../context/ThemeContext';
import EditNote from '../EditNote';
import EditTagModal from '../EditTag/EditTagModal';
import NavBar from '../Navigation/NavBar';
import imgBlack from '../../assets/empty-folder-black.png';
import imgWhite from '../../assets/empty-folder-white.png';
import './Notes.css';

function Notes() {

    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ noteId, setNoteId ] = useState(0);
    const [ tagNoteArray, setTagNoteArray ] = useState([]);
    const [ populated, setPopulated ] = useState(true);
    const [ showEdit, setShowEdit ] = useState(false);

    const dispatch = useDispatch();
    const notesObj = useSelector(state => state.notes.allNotes);
    const notes = Object.values(notesObj);

    const { darkMode } = useContext(DarkModeContext);

    useEffect(() => {
        (async () => {
            await dispatch(getAllNotesThunk())
        })()
        if (notes.length > 0) {
            setTitle(notes[ 0 ].title)
            setBody(notes[ 0 ].body)
            setNoteId(notes[ 0 ].id)
            setPopulated(false)
        } else if (notes.length === 0) {
            setTitle('')
            setBody('')
            setNoteId(0)
            setPopulated(true)
        }
    }, [ dispatch, notes.length, tagNoteArray.length ])

    const setFields = data => {
        setNoteId(data.id)
        setTitle(data.title)
        setBody(data.body)
    }

    const newNote = async () => {
        const data = {
            title: 'Untitled'
        }
        await dispatch(addNoteThunk(data))
    }

    notes.sort((a, b) => {
        if (new Date(a.created_at) < new Date(b.created_at)) {
            return 1
        } else if (new Date(a.created_at) > new Date(b.created_at)) {
            return -1
        }
        return 0
    })

    return (
        <>
            <NavBar />
            <div className="outer-notes">
                <div className={darkMode ? 'notes-main-container dark' : 'notes-main-container light'}>
                    <div className={darkMode ? 'header-note dark' : 'header-note light'}>
                        <div className="n-header">
                            <div id="n-logo">
                                <i className="fa-solid fa-file-lines" />
                                <h1 id="n-h1">NOTES</h1>
                            </div>
                        </div>
                        <div id="n-count">
                            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                        </div>
                    </div>
                    <div className="notes-inner-container">
                        {populated ? (
                            <div className={darkMode ? 'empty-notes dark' : 'empty-notes light'}>
                                <div className="empty-img">
                                    <img src={darkMode ? imgWhite : imgBlack} className="e-img" alt="black empty folder" />
                                </div>
                                <div className="empty-text">
                                    <p>
                                        You currently have no notes <br />
                                        Click the <span className="sp-click" onClick={newNote}>
                                            + New Note</span> button in the side bar to get started
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className={darkMode ? 'column-notes dark' : 'column-notes light'}>
                                {notes.map((note, idx) => (
                                    <div key={idx}
                                        className="notes-card"
                                        onClick={() => setFields(note)}
                                    >
                                        <div className="notes-title">
                                            {note.title}
                                        </div>
                                        <div className="notes-content">
                                            {note.body}
                                        </div>
                                        <div className="note-tag-icons">
                                            <div className="tag-edit-notes">
                                                <button
                                                    className={darkMode ? "edit-tag-btn td-dark" : "edit-tag-btn td-light"}
                                                    onClick={() => {
                                                        setTagNoteArray(note.tags)
                                                        setShowEdit(!showEdit)
                                                    }}>
                                                    <i className="fa-solid fa-plus" />
                                                </button>
                                            </div>
                                            <p id="t-card">Tags</p>
                                            <div className="tag-icons-container">
                                                {note.tags.map(tag => (
                                                    <div key={tag.id} className="tag-icons">
                                                        {tag.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {showEdit && (
                                    <EditTagModal
                                        noteId={noteId}
                                        showEdit={showEdit}
                                        setShowEdit={setShowEdit}
                                        tagNoteArray={tagNoteArray}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div >
                <div className="edit-column-notes">
                    {populated ? (
                        <div className={darkMode ? 'blank-div dark' : 'blank-div light'}></div>
                    ) : (
                        <EditNote
                            noteId={noteId}
                            title={title}
                            body={body}
                            setTitle={setTitle}
                            setBody={setBody}
                        />
                    )}
                </div>
            </div>
        </>
    )

}


export default Notes;
