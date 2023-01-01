import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllNotebooksThunk } from '../../store/notebook';
import NavBar from '../Navigation/NavBar';
import AddNotebookModal from '../AddNotebook/AddNotebookModal';
import './Notebooks.css';


function Notebooks() {
    const dispatch = useDispatch();

    const [showNew, setShowNew] = useState(false);

    const notebooksObj = useSelector(state => state.notebooks.allNotebooks);
    const notebooks = Object.values(notebooksObj);

    useEffect(() => {
        (async () => {
            await dispatch(getAllNotebooksThunk())
        })()
    }, [ dispatch ])

    return (
        <>
            <NavBar />
            <div className="notebooks-main-container">
                <div className="notebooks-inner">
                    <h2>Notebooks</h2>
                    <div className="length-new-div">
                        <div className="length-nb">
                            {notebooks.length} {notebooks.length === 1 ? 'notebook' : 'notebooks'}
                        </div>
                        <div className="new-nb">
                            <button className="new-nb-btn" onClick={() => setShowNew(true)}>
                                <div><i className="fa-solid fa-folder-plus" /></div>
                                <div>New Notebook</div>
                                {showNew && (
                                    <AddNotebookModal
                                        showNew={showNew}
                                        setShowNew={setShowNew}
                                    />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="notebooks-table">
                        <div className="notebooks-header-column">
                            <div id="t-header">Title</div>
                            {notebooks.map(notebook => (
                                <div key={notebook.id} className="notebooks-header">
                                    <Link
                                        exact="true"
                                        to={`/notebooks/${notebook.id}`}
                                        id="nb-one-link">
                                        <div><i className="fa-solid fa-book" /></div>
                                        <div>{`${notebook.title} (${notebook.notes.length})`}</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="notebooks-body-rows">
                            <div id="t-created">Created By</div>
                            {notebooks.map(notebook => (
                                <div key={notebook.id} className="notebooks-rows">
                                    {notebook.user_email}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notebooks;
