import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getShortcutsThunk } from '../../store/shortcut';
import './Shortcuts.css';


function Shortcuts({ showShortcuts, setShowShortcuts }) {

    const dispatch = useDispatch();

    const notes = useSelector(state => Object.values(state.shortcuts.notes));
    const tasks = useSelector(state => Object.values(state.shortcuts.tasks));
    const notebooks = useSelector(state => Object.values(state.shortcuts.notebooks));

    const [ style, setStyle ] = useState('');

    useEffect(() => {
        dispatch(getShortcutsThunk())
    }, [ dispatch ])

    useEffect(() => {
        if (showShortcuts) {
            setStyle('show')
        } else {
            setStyle('hide')
        }
    }, [ showShortcuts ])

    return (
        <>
            <div className="shortcuts-main-container">
                <div id="shortcuts-main" className={style}>
                    <div className="shortcuts-header">
                        <div className="sc-title">
                            <h2>Shortcuts</h2>
                        </div>
                        <div className="sc-title-close">
                            <button className="sc-close" onClick={() => setShowShortcuts(false)}>
                                <i className="fa-solid fa-arrow-left-long" />
                            </button>
                        </div>
                    </div>
                    <div className="shortcuts-inner-container">
                        <div className="sc-wrapper">
                            <div className="sc-header">
                                <h4 className="sc-h4">Notes</h4>
                            </div>
                            {notes.map(note => (
                                <div key={note.id} className="sc-content">
                                    <p className="sc-p">{note.title}</p>
                                </div>
                            ))}
                        </div>
                        <div className="sc-wrapper">
                            <div className="sc-header">
                                <h4 className="sc-h4">Tasks</h4>
                            </div>
                            {tasks.map(task => (
                                <div key={task.id} className="sc-content">
                                    <p className="sc-p">{task.body}</p>
                                </div>
                            ))}
                        </div>
                        <div className="sc-wrapper">
                            <div className="sc-header">
                                <h4 className="sc-h4">Notebooks</h4>
                            </div>
                            {notebooks.map(nb => (
                                <div className="sc-content">
                                    <p className="sc-p">{nb.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shortcuts;
