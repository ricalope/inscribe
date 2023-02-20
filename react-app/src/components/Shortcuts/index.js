import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShortcutsThunk } from '../../store/shortcut';


function Shortcuts() {

    const dispatch = useDispatch();

    const shortcutsObj = useSelector(state => state.shortcuts.allShortcuts);
    const shortcuts = Object.values(shortcutsObj);

    useEffect(() => {
        dispatch(getShortcutsThunk())
    }, [dispatch])

    return (
        <>
            <div className="shortcuts-main-container">
                {shortcuts.map(shortcut => (
                    <div key={shortcut.id}>
                        {shortcut.id}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Shortcuts;
