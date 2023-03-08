import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/ThemeContext';
import { addNoteThunk } from '../../store/note';
import EditNotebookModal from '../EditNotebook/EditNotebookModal';
import DeleteNotebookModal from '../DeleteNotebook/DeleteNotebookModal';
import AddTaskModal from '../AddTask/AddTaskModal';
import './Actions.css';


function Actions({ notebookId }) {

    const dispatch = useDispatch();

    const { darkMode } = useContext(DarkModeContext);
    const [ showAction, setShowAction ] = useState(false);
    const [ showEdit, setShowEdit ] = useState(false);
    const [ showDelete, setShowDelete ] = useState(false);
    const [ showNew, setShowNew ] = useState(false);

    const openMenu = () => {
        if (showAction) return
        setShowAction(true)
    }

    useEffect(() => {
        if (!showAction) return
        const closeMenu = () => {
            setShowAction(false)
        }
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [ showAction ]);

    const createNote = async () => {
        const data = {
            notebookId,
            title: "Untitled"
        }
        await dispatch(addNoteThunk(data))
    }

    return (
        <>
            <div className="actions-container">
                <button
                    className={darkMode ? "actions-button td-dark" : "actions-button td-light"}
                    onClick={openMenu}
                >
                    <i className="fa-solid fa-ellipsis" />
                </button>
            </div>
            {showAction && (
                <div className={darkMode ? "actions-dropdown nb-dark" : "actions-dropdown nb-light"}>
                    <Link exact="true" to={`/notebooks/${notebookId}`} className="action-link" onClick={createNote}>
                        <div className={darkMode ? "actions-add-note td-dark" : "actions-add-note td-light"}>
                            <p>Add Note</p>
                        </div>
                    </Link>
                    <Link exact="true" to={`/notebooks/${notebookId}`} className="action-link" onClick={() => setShowNew(true)}>
                        <div className={darkMode ? "actions-add-note td-dark" : "actions-add-note td-light"}>
                            <p>Add Task</p>
                        </div>
                    </Link>
                    <div
                        onClick={() => setShowEdit(true)}
                        className={darkMode ? "actions-rename td-dark" : "actions-rename td-light"}
                    >
                        <p>Rename Notebook</p>
                    </div>
                    <div
                        className={darkMode ? "actions-delete td-dark" : "actions-delete td-light"}
                        onClick={() => setShowDelete(true)}
                    >
                        <p>Delete Notebook</p>
                    </div>
                </div>
            )}
            {showNew && (
                <AddTaskModal
                    showNew={showNew}
                    setShowNew={setShowNew}
                    notebookId={notebookId}
                />
            )}
            {showEdit && (
                <EditNotebookModal
                    showEdit={showEdit}
                    setShowEdit={setShowEdit}
                    notebookId={notebookId}
                />
            )}
            {showDelete && (
                <DeleteNotebookModal
                    showDelete={showDelete}
                    setShowDelete={setShowDelete}
                    notebookId={notebookId}
                />
            )}
        </>
    )
}

export default Actions;
