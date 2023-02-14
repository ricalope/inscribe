import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneNotebookThunk } from '../../store/notebook';
import { getAllNotesThunk, addNoteThunk } from '../../store/note';
import { DarkModeContext } from '../../context/ThemeContext';
import NavBar from '../Navigation/NavBar';
import EditNote from '../EditNote';
import Actions from '../Actions';
import imgBlack from '../../assets/empty-folder-black.png';
import imgWhite from '../../assets/empty-folder-white.png';
import PageNotFound from '../PageNotFound';


function OneNotebook() {
    const dispatch = useDispatch();
    const { notebookId } = useParams();

    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ noteId, setNoteId ] = useState(0);
    const [ errors, setErrors ] = useState([]);
    const [ populated, setPopulated ] = useState(true);

    const notebookObj = useSelector(state => state.notebooks.oneNotebook);
    const notesObj = useSelector(state => Object.values(state.notes.allNotes));
    const notebook = Object.values(notebookObj);
    const notes = notesObj.filter(n => n.notebook_id === +notebookId);
    const { darkMode } = useContext(DarkModeContext);

    useEffect(() => {
        dispatch(getAllNotesThunk())
        const data = dispatch(getOneNotebookThunk(notebookId))
        if (data.errors) setErrors(data)
    }, [ dispatch, notebookId ])

    useEffect(() => {
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
    }, [ notes.length, notebookId ])

    const setFields = data => {
        setNoteId(data.id)
        setTitle(data.title)
        setBody(data.body)
    }

    const newNote = async () => {
        const data = {
            notebookId,
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

    const lengthCheck = (data, len) => {
        if (data.length > len) {
            return `${data.slice(0, len)}...`
        }
        return data
    }

    return errors.errors ? (<PageNotFound />) : (
        <>
            <NavBar />
            <div className="outer-notes">
                <div className={darkMode ? 'notes-main-container dark' : 'notes-main-container light'}>
                    <div className={darkMode ? 'one-header-note-nb dark' : 'one-header-note-nb light'}>
                        <div className="one-nb-header">
                            <div id="n-nb-logo">
                                <i className="fa-solid fa-file-lines" />
                                <h1 id="nb-h1">{notebook.map(nb => lengthCheck(nb.title, 16))}</h1>
                            </div>
                            <div id="n-count">
                                {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                            </div>
                        </div>
                        <div className="nb-delete-modal">
                            <Actions notebookId={notebookId} />
                        </div>
                    </div>
                    {populated ? (
                        <div className={darkMode ? 'empty-notes dark' : 'empty-notes light'}>
                            <div className="empty-img">
                                <img src={darkMode ? imgWhite : imgBlack} className="e-img" alt="black empty folder" />
                            </div>
                            <div className="empty-text">
                                <p>
                                    You currently have no notes for this notebook <br />
                                    Click the <span className="sp-click" onClick={newNote}>+ Add Note to Notebook</span> button here or at the top to get started
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="notes-inner-container">
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
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div >
                <div className="edit-column-notes">
                    {populated ? (
                        <div className={darkMode ? 'blank-div dark' : 'blank-div light'} />
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

export default OneNotebook;
