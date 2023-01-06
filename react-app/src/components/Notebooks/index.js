import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllNotebooksThunk } from '../../store/notebook';
import { DarkModeContext } from '../../context/ThemeContext';
import NavBar from '../Navigation/NavBar';
import AddNotebookModal from '../AddNotebook/AddNotebookModal';
import imgBlack from '../../assets/empty-folder-black.png';
import imgWhite from '../../assets/empty-folder-white.png';
import './Notebooks.css';


function Notebooks() {
    const dispatch = useDispatch();

    const [ showNew, setShowNew ] = useState(false);
    const [ populated, setPopulated ] = useState(true);

    const notebooksObj = useSelector(state => state.notebooks.allNotebooks);
    const notebooks = Object.values(notebooksObj);
    const { darkMode } = useContext(DarkModeContext);

    useEffect(() => {
        (async () => {
            await dispatch(getAllNotebooksThunk())
        })()
        if (notebooks.length === 0) {
            setPopulated(true)
        } else if (notebooks.length > 0) {
            setPopulated(false)
        }
    }, [ dispatch, notebooks.length ])

    const lengthCheck = (data, len) => {
        if (data.length > len) {
            return `${data.slice(0, len)}...`
        }
        return data
    }

    const formatDate = date => {
        date = new Date(date)
        const update = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'medium' }).format(date)
        return update
    }

    return (
        <>
            <NavBar />
            <div className="notebooks-main-container">
                <div className={darkMode ? 'notebooks-inner dark' : 'notebooks-inner light'}>
                    <h2>Notebooks</h2>
                    <div className="length-new-div">
                        <div className="length-nb">
                            {notebooks.length} {notebooks.length === 1 ? 'notebook' : 'notebooks'}
                        </div>
                        <div className="new-nb">
                            <button className={darkMode ? 'new-nb-btn dark' : 'new-nb-btn light'} onClick={() => setShowNew(true)}>
                                <div><i className="fa-solid fa-folder-plus" /></div>
                                <div>New Notebook</div>
                            </button>
                            {showNew && (
                                <AddNotebookModal
                                    showNew={showNew}
                                    setShowNew={setShowNew}
                                />
                            )}
                        </div>
                    </div>
                    {populated ? (
                        <div className={darkMode ? 'empty-notes dark' : 'empty-notes light'}>
                            <div className="empty-img">
                                <img src={darkMode ? imgWhite : imgBlack} className="e-img" alt="black empty folder" />
                            </div>
                            <div className="empty-text">
                                <p>
                                    You currently have no notebooks <br />
                                    Click the <span className="sp-click" onClick={() => setShowNew(true)}>
                                        + New Notebook</span> button in the side bar or the
                                    <span className="sp-click" onClick={() => setShowNew(true)}>
                                        &nbsp;<i className="fa-solid fa-folder-plus" />
                                    </span> to get started
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className={darkMode ? 'notebooks-table dark' : 'notebooks-table light'}>
                            <div className="notebooks-header-column">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>NOTEBOOK NAME</th>
                                            <th>CREATED BY</th>
                                            <th>UPDATED AT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notebooks.map((nb, idx) => (
                                            <tr key={nb.id}>
                                                <td>
                                                    <Link
                                                        exact="true" to={`/notebooks/${nb.id}`}
                                                        className={darkMode && idx % 2 === 0 ? 'nb-one-link td-dark' : 'nb-one-link td-light'}>
                                                        <i className="fa-solid fa-book table-book" />&nbsp;
                                                        {`${lengthCheck(nb.title, 20)} (${nb.notes.length})`}
                                                    </Link>
                                                </td>
                                                <td>{lengthCheck(nb.user_email, 16)}</td>
                                                <td>{formatDate(nb.updated_at)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* <div id="t-header">Title</div>
                                {notebooks.map(notebook => (
                                    <div key={notebook.id} className="notebooks-header">
                                        <Link
                                            exact="true"
                                            to={`/notebooks/${notebook.id}`}
                                            className={darkMode ? 'nb-one-link dark' : 'nb-one-link light'}>
                                            <div><i className="fa-solid fa-book" /></div>
                                            <div>{`${lengthCheck(notebook.title, 16)} (${notebook.notes.length})`}</div>
                                        </Link>
                                    </div>
                                ))} */}
                            </div>
                            {/* <div className="notebooks-body-rows">
                                <div id="t-created">Created By</div>
                                {notebooks.map(notebook => (
                                    <div key={notebook.id} className="notebooks-rows">
                                        {lengthCheck(notebook.user_email, 10)}
                                    </div>
                                ))}
                            </div> */}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Notebooks;
