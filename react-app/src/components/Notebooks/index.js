import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllNotebooksThunk } from '../../store/notebook';


function Notebooks() {
    const dispatch = useDispatch();

    const notebooksObj = useSelector(state => state.notebooks.allNotebooks)
    const notebooks = Object.values(notebooksObj)
    console.log(notebooks)

    useEffect(() => {
        (async () => {
            await dispatch(getAllNotebooksThunk())
        })()
    }, [ dispatch ])

    return (
        <div className="notebooks-main-container">
            <h2>Notebooks</h2>
            {notebooks.map(notebook => (
                <div key={notebook.id} className="notebooks-card">
                    <div className="notebooks-title">
                        <Link exact="true" to={`/notebooks/${notebook.id}`}>
                            {notebook.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Notebooks;
