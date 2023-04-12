import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/Modal'
import { DarkModeProvider } from './context/ThemeContext';
import { NoteProvider } from './context/NoteContext';
import App from './App';
import configureStore from './store';
import './index.css';

const store = configureStore();

function Root() {
    return (
        <Provider store={store}>
            <ModalProvider>
                <DarkModeProvider>
                    <NoteProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </NoteProvider>
                </DarkModeProvider>
            </ModalProvider>
        </Provider>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
);
