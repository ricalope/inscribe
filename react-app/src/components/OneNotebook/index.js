import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneNotebookThunk } from '../../store/notebook';
import { getAllNotesThunk, addNoteThunk } from '../../store/note';
import NavBar from '../Navigation/NavBar';
import EditNote from '../EditNote/index';
import DeleteNotebookModal from '../DeleteNotebook/DeleteNotebookModal';


function OneNotebook() {
    const dispatch = useDispatch();
    const { notebookId } = useParams();

    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ noteId, setNoteId ] = useState(0);
    const [showDelete, setShowDelete] = useState(false)

    const notebookObj = useSelector(state => state.notebooks.oneNotebook);
    const notesObj = useSelector(state => Object.values(state.notes.allNotes));
    const notebook = Object.values(notebookObj);
    const notes = notesObj.filter(n => n.notebook_id === +notebookId);

    useEffect(() => {
        (async () => {
            await dispatch(getOneNotebookThunk(notebookId))
            await dispatch(getAllNotesThunk())
        })()
        if (notes.length > 0) {
            setTitle(notes[ 0 ].title)
            setBody(notes[ 0 ].body)
            setNoteId(notes[ 0 ].id)
        }
    }, [ dispatch, notes.length ])

    const setFields = data => {
        setNoteId(data.id)
        setTitle(data.title)
        setBody(data.body)
    }

    const newNote = async () => {
        const data = {
            notebookId,
            title: 'Untitled',
            body: 'Stream your consciousness here...'
        }
        await dispatch(addNoteThunk(data))
    }

    return (
        <>
            <NavBar />
            <div className="outer-notes">
                <div className="notes-main-container">
                    <div id="header-note">
                        <div className="n-header">
                            <div id="n-nb-logo">
                                <i className="fa-solid fa-file-lines" />
                                <h1 id="n-h1">{notebook.map(nb => nb.title)}</h1>
                            </div>
                            <div id='newnote-nb' onClick={newNote}>+ Add Note</div>
                        </div>
                        <div id="n-count">
                            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                            <div id="nb-delete-modal">
                                <button
                                    className="nb-del-mod"
                                    onClick={() => setShowDelete(true)}>
                                        Delete Notebook
                                </button>
                                {showDelete && (
                                    <DeleteNotebookModal
                                        showDelete={showDelete}
                                        setShowDelete={setShowDelete}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="notes-inner-container">
                        <div className="column-notes">
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
                </div >
                <div className="edit-column-notes">
                    <EditNote
                        noteId={noteId}
                        title={title}
                        body={body}
                        setTitle={setTitle}
                        setBody={setBody}
                    />
                </div>
            </div>
        </>
    )
}

export default OneNotebook;
