import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllNotesThunk } from '../../store/note';
import { getAllNotebooksThunk } from '../../store/notebook';
import NavBar from '../Navigation/NavBar';
import './Home.css';


function Home() {

    const dispatch = useDispatch();
    const notesObj = useSelector(state => state.notes.allNotes);
    const notebooksObj = useSelector(state => state.notebooks.allNotebooks);
    const notes = Object.values(notesObj);
    const notebooks = Object.values(notebooksObj);

    const localNotes = localStorage.getItem('scratchPad')
    const [ scratch, setScratch ] = useState(localNotes)

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

    return (
        <>
            <NavBar />
            <div className="home-main-container">
                <div className="home-top-bar">
                    <h1>Good Afternoon!</h1>
                </div>
                <div className="home-notes-container">
                    <div className="notes-div">
                        <div className="notes-title-div">
                            <Link exact="true" to="/notes" className="all-notes">
                                <h4>NOTES</h4>
                            </Link>
                            <div className="new-note-title">
                                <Link exact="true" to="/notes/new" className="new-plus">
                                    <i className="fa-solid fa-file-circle-plus" />
                                </Link>
                            </div>
                        </div>
                        <div className="card-note">
                            {notes.map(note => (
                                <Link key={note.id} exact="true" to={`/notes/${note.id}`} className="note">
                                    <div className="home-nc-div">
                                        <div id="note-text">
                                            <h4 id="nc-title">{note.title}</h4>
                                            <div id="note-text-inner">
                                                {note.body}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="scratch-div">
                        <div className="scratch-title">
                            <h4>SCRATCH PAD</h4>
                        </div>
                        <div className="scratch-body">
                            <textarea
                                type="text"
                                style={{ resize: 'none' }}
                                className="ta-scratch"
                                name="scratch"
                                placeholder="Start writing..."
                                value={scratch}
                                onChange={handleInput}
                            />
                        </div>
                    </div>
                </div>
                <div className="home-notebook-container">
                    <div className="notebooks-div">
                        <div className="notebooks-title-div">
                            <h4>NOTEBOOKS</h4>
                            <div className="new-notebook-title">
                                <Link exact="true" to="/notebooks/new" className="new-ntbk">
                                    <i className="fa-solid fa-folder-plus" />
                                </Link>
                            </div>
                        </div>
                        <div className="card-notebook">
                            {notebooks.map(nb => (
                                <Link key={nb.id} exact="true" to={`/notebooks/${nb.id}`} className="nbook">
                                    <div className="nbc-div">
                                        <div id="notebook-text">
                                            <h4 id="nbc-title">{nb.title}</h4>
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
