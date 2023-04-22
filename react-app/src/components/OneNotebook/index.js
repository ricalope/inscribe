import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneNotebookThunk } from '../../store/notebook';
import { addNoteThunk } from '../../store/note';
import { DarkModeContext } from '../../context/ThemeContext';
import NavBar from '../Navigation/NavBar';
import EditNote from '../EditNote';
import Actions from '../Actions';
import imgBlack from '../../assets/empty-folder-black.png';
import imgWhite from '../../assets/empty-folder-white.png';
import { sortDates } from '../../utils/helpers';


function OneNotebook() {
    const { notebookId } = useParams();
    const dispatch = useDispatch();

    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ noteId, setNoteId ] = useState(0);

    const notebook = useSelector(state => state.notebooks.oneNotebook);
    const notesObj = useSelector(state => state.notebooks.oneNotebook.notes);
    const tasksObj = useSelector(state => state.notebooks.oneNotebook.tasks);


    let notes = Object.values(notesObj || {})
    let tasks = Object.values(tasksObj || {})
    notes = sortDates(notes)
    tasks = sortDates(tasks)

    const { darkMode } = useContext(DarkModeContext);

    useEffect(() => {
        (async () => {
            await dispatch(getOneNotebookThunk(notebookId))
        })()
    }, [])

    useEffect(() => {
        if (notes.length > 0) {
            setTitle(notes[ 0 ].title)
            setBody(notes[ 0 ].body)
            setNoteId(notes[ 0 ].id)
        } else if (notes.length === 0) {
            setTitle('')
            setBody('')
            setNoteId(0)
        }
    }, [ notes.length ])

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
        await dispatch(getOneNotebookThunk(notebookId))
    }

    const lengthCheck = (data, len) => {
        if (data?.length > len) {
            return `${data.slice(0, len)}...`
        }
        return data
    }

    return (
        <>
            <NavBar />
            <div className="outer-notes">
                <div className={darkMode ? 'notes-main-container dark' : 'notes-main-container light'}>
                    <div className={darkMode ? 'one-header-note-nb dark' : 'one-header-note-nb light'}>
                        <div className="one-nb-header">
                            <div id="n-nb-logo">
                                <i className="fa-solid fa-file-lines" />
                                <h1 id="nb-h1">{lengthCheck(notebook?.title, 16)}</h1>
                            </div>
                            <div className="nb-contents">
                                <div className="n-count">
                                    {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                                </div>
                                <div className="n-count">
                                    {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                                </div>
                            </div>
                        </div>
                        <div className="nb-delete-modal">
                            <Actions
                                notebookId={notebookId}
                                newNote={newNote}
                            />
                        </div>
                    </div>
                    {notes.length > 0 ? (
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
                    ) : (
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

                    )}
                </div >
                <div className="edit-column-notes">
                    {notes.length > 0 ? (
                        <EditNote
                            noteId={noteId}
                            title={title}
                            body={body}
                            setTitle={setTitle}
                            setBody={setBody}
                        />
                    ) : (
                        <div className={darkMode ? 'blank-div dark' : 'blank-div light'} />
                    )}
                </div>
            </div>
        </>
    )
}

export default OneNotebook;
