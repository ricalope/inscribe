import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShortcutsThunk } from '../../store/shortcut';
import './Shortcuts.css';


function Shortcuts({ showShortcuts, setShowShortcuts, setShowTags }) {

    const dispatch = useDispatch();

    const shortcutsObj = useSelector(state => state.shortcuts.allShortcuts);
    const shortcuts = Object.values(shortcutsObj);

    const [ style, setStyle ] = useState('');

    useEffect(() => {
        dispatch(getShortcutsThunk())
    }, [ dispatch ])

    useEffect(() => {
        if (showShortcuts) {
            setStyle('show')
        } else if (!showShortcuts) {
            setStyle('hide')
        }
    }, [])

    return (
        <>
            <div id="shortcuts-main" className={style}>
                <div className="shortcuts-header">
                    <div className="sc-title">
                        <h2>Shortcuts</h2>
                    </div>
                    <div className="sc-title-close">
                        <button className="sc-close" onClick={() => {
                            setShowShortcuts(false)
                        }}>

                            <i className="fa-solid fa-arrow-left-long" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shortcuts;
