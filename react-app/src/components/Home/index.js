import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllNotesThunk } from '../../store/note';
import './Home.css';


function Home() {

    const dispatch = useDispatch();
    const notesObj = useSelector(state => state.notes.allNotes);
    const notes = Object.values(notesObj)


    useEffect(() => {
        (async () => {
            await dispatch(getAllNotesThunk())
        })()
    }, [ dispatch ])

    return (
        <div className="home-main-container">
            <div className="home-top-bar">
                <h1>Good Afternoon!</h1>
            </div>
            <div className="home-notes-container">
                <div className="notes-div">
                    <div className="notes-title-div">
                        <h4>NOTES</h4>
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
                            style={{resize: 'none'}}
                            className="ta-scratch"
                            name="scratch"
                            placeholder="Start writing..."
                        />
                    </div>
                </div>
            </div>
            <div className="home-notebook-container">

            </div>
        </div>
    )
}

export default Home;
