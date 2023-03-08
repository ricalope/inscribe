import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/ThemeContext';
import NavBar from '../Navigation/NavBar';
import AddNotebookModal from '../AddNotebook/AddNotebookModal';
import Actions from '../Actions';
import imgBlack from '../../assets/empty-folder-black.png';
import imgWhite from '../../assets/empty-folder-white.png';
import './Notebooks.css';


function Notebooks() {

    const [ showNew, setShowNew ] = useState(false);

    const notebooksObj = useSelector(state => state.notebooks.allNotebooks);
    const notebooks = Object.values(notebooksObj);
    const { darkMode } = useContext(DarkModeContext);

    const lengthCheck = (data, len) => {
        if (data?.length > len) {
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
                    <div id="n-logo">
                        <i className="fa-solid fa-book" />
                        <h2>Notebooks</h2>
                    </div>
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
                    {notebooks.length > 0 ? (
                        <div className={darkMode ? 'notebooks-table dark' : 'notebooks-table light'}>
                            <div className="notebooks-header-column">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>NOTEBOOK NAME</th>
                                            <th>CREATED BY</th>
                                            <th>UPDATED AT</th>
                                            <th>ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notebooks.map((nb) => (
                                            <tr key={nb.id} className={darkMode ? "tr-dark" : "tr-light"}>
                                                <td>
                                                    <Link
                                                        exact="true" to={`/notebooks/${nb.id}`}
                                                        className={darkMode ? 'nb-one-link td-dark' : 'nb-one-link td-light'}>
                                                        <i className="fa-solid fa-book table-book" />&nbsp;
                                                        {`${lengthCheck(nb.title, 20)} (${nb?.notes?.length})`}
                                                    </Link>
                                                </td>
                                                <td>{lengthCheck(nb.user_email, 16)}</td>
                                                <td>{formatDate(nb.updated_at)}</td>
                                                <td>
                                                    <Actions
                                                        notebookId={nb.id}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
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
                    )}
                </div>
            </div>
        </>
    )
}

export default Notebooks;
