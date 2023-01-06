import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllNotesThunk, addNoteThunk } from '../../store/note';
import { getAllNotebooksThunk } from '../../store/notebook';
import { DarkModeContext } from '../../context/ThemeContext';
import NavBar from '../Navigation/NavBar';
import AddNotebookModal from '../AddNotebook/AddNotebookModal';
import './Home.css';


function Home() {

    const dispatch = useDispatch();
    const notesObj = useSelector(state => state.notes.allNotes);
    const notebooksObj = useSelector(state => state.notebooks.allNotebooks);
    let notes = Object.values(notesObj);
    const notebooks = Object.values(notebooksObj);

    const localScratch = localStorage.getItem('scratchPad');
    const [ scratch, setScratch ] = useState(localScratch || '');
    const [ showNew, setShowNew ] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(getAllNotesThunk())
            await dispatch(getAllNotebooksThunk())
        })()
    }, [ dispatch ])

    const handleInput = e => {
        localStorage.setItem('scratchPad', e.target.value);
        setScratch(e.target.value)
    }

    const createNote = async () => {
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

    const { darkMode } = useContext(DarkModeContext);

    return (
        <>
            <NavBar />
            <div className="home-main-container">
                <div className="home-top-bar">
                    <h1>Good Afternoon!</h1>
                </div>
                <div className="home-notes-container">
                    <div className={ darkMode ? 'notes-div dark' : 'notes-div light' }>
                        <div className="notes-title-div">
                            <Link exact="true" to="/notes" className="all-notes">
                                <div className="nb-t">
                                    <h4 className={darkMode ? 'n-h4 dark' : 'n-h4 light'}>NOTES</h4>
                                    <i className={darkMode ? 'fa-solid fa-angle-right dark' : 'fa-solid fa-angle-right light'} />
                                </div>
                            </Link>
                            <div className="new-note-title">
                                <Link exact="true" to="/notes" className="new-plus" onClick={createNote}>
                                    <i className={darkMode ? 'fa-solid fa-file-circle-plus dark' : 'fa-solid fa-file-circle-plus light'} />
                                </Link>
                            </div>
                        </div>
                        <div className="card-note">
                            {notes.map(note => (
                                <Link key={note.id} exact="true" to="/notes" className={darkMode ? 'note dark' : 'note light'}>
                                    <div className="home-nc-div">
                                        <div id="note-text">
                                            <h4 id="nc-title">{note.title}</h4>
                                            <div className={darkMode ? 'note-text-inner dark' : 'note-text-inner light'}>
                                                {note.body}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className={darkMode ? 'scratch-div dark' : 'scratch-div light'}>
                        <div className="scratch-title">
                            <h4>SCRATCH PAD</h4>
                        </div>
                        <div className="scratch-body">
                            <textarea
                                type="text"
                                style={{ resize: 'none' }}
                                className={darkMode ? 'ta-scratch dark' : 'ta-scratch light'}
                                name="scratch"
                                placeholder="Start writing..."
                                value={scratch}
                                onChange={handleInput}
                            />
                        </div>
                    </div>
                </div>
                <div className="home-notebook-container">
                    <div className={darkMode ? 'notebooks-div dark' : 'notebooks-div light'}>
                        <div className="notebooks-title-div">
                            <Link exact="true" to="/notebooks" className="all-notes">
                                <div className="nb-t">
                                    <h4 className={darkMode ? 'n-h4 dark' : 'n-h4 light'}>NOTEBOOKS</h4>
                                    <i className={darkMode ? 'fa-solid fa-angle-right dark' : 'fa-solid fa-angle-right light'} />
                                </div>
                            </Link>
                            <div className="new-notebook-title">
                                <button className="home-new-nb-btn" onClick={() => setShowNew(true)}>
                                    <i className={darkMode ? 'fa-solid fa-folder-plus dark' : 'fa-solid fa-folder-plus light'} />
                                </button>
                                {showNew && (
                                    <AddNotebookModal
                                        showNew={showNew}
                                        setShowNew={setShowNew}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="card-notebook">
                            {notebooks.map(nb => (
                                <Link key={nb.id} exact="true" to="/notebooks" className="nbook">
                                    <div className="nbc-div">
                                        <div id="notebook-text">
                                            <h4 className={darkMode ? 'nbc-title dark' : 'nbc-title light'}>{nb.title}</h4>
                                            <div id="nbc-inner">
                                                {nb.notes.length} {nb.notes.length === 1 ? 'note' : 'notes'}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
