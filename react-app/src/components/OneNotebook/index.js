import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOneNotebookThunk } from '../../store/notebook';


function OneNotebook() {
    const dispatch = useDispatch();
    const { notebookId } = useParams();

    const notebookObj = useSelector(state => state.notebooks.oneNotebook);
    const notebook = Object.values(notebookObj)

    useEffect(() => {
        (async () => {
            await dispatch(getOneNotebookThunk(notebookId))
        })()
    }, [ dispatch, notebookId ])

    return (
        <div className="one-nb-main-container">
            {notebook.map(nb => (
                <div key={nb.id} className="one-nb-inner-container">
                    <div className="one-nb-title-card">
                        <div className="one-nb-title">
                            <h3>{nb.title}</h3>
                            <p>
                                <Link exact="true" to={`/notebooks/${nb.id}/delete`}>
                                    delete
                                </Link>
                            </p>
                        </div>
                        <div className="one-nb-notes-length">
                            <h5>{nb.notes.length} {nb.notes.length === 1 ? 'note' : 'notes'}</h5>
                        </div>
                    </div>
                    {nb.notes.map(note => (
                        <div key={note.id} className="one-nb-note-card">
                            <Link exact="true" to={`/notes/${note.id}`}>
                                <div className="one-nb-note-title">
                                    {note.title}
                                </div>
                                <div className="one-nb-note-body">
                                    {note.body.slice(0, 40)}...
                                </div>
                                <div className="one-nb-note-date">
                                    {note.created_at}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default OneNotebook;
