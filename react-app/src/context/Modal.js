import React, { useState, useEffect, useRef, useContext } from 'react';
import ReactDOM from 'react-dom';
import { DarkModeContext } from '../context/ThemeContext'
import './Modal.css'

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState()

    useEffect(() => {
        setValue(modalRef.current)
    }, []);

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
}

export function Modal({ onClose, children }) {
    const { darkMode } = useContext(DarkModeContext)
    const modalNode = useContext(ModalContext)
    if (!modalNode) return null

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose}/>
            <div className={darkMode ? 'modal-content dark' : 'modal-content light'}>
                {children}
            </div>
        </div>,
        modalNode
    )
}
