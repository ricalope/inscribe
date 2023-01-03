import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Notes from './components/Notes';
import Notebooks from './components/Notebooks';
import OneNotebook from './components/OneNotebook';
// import User from './components/Users/User';
// import DeleteNote from './components/DeleteNote';
// import AddNote from './components/AddNote';
// import EditNote from './components/EditNote';
// import OneNote from './components/OneNote';
// import AddNotebook from './components/AddNotebook';
// import DeleteNotebook from './components/DeleteNotebook';
// import EditNotebook from './components/EditNotebook';
import SplashPage from './components/SplashPage';
import Home from './components/Home';
import ComingSoon from './components/ComingSoon';
import PageNotFound from './components/PageNotFound';
import { authenticate } from './store/session';

function App() {
    const [ loaded, setLoaded ] = useState(false);
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [ dispatch ]);

    if (!loaded) {
        return null;
    }

    return !sessionUser ? (
        <Route exact path="/">
            <SplashPage />
        </Route>
    ) : (
        <>
            <Switch>
                <ProtectedRoute exact path="/">
                    <Home />
                </ProtectedRoute>
                {/* <ProtectedRoute exact path='/users/:userId'>
                    <User />
                </ProtectedRoute> */}
                <ProtectedRoute exact path='/notes'>
                    <Notes />
                </ProtectedRoute>
                {/* <ProtectedRoute exact path="/notes/new">
                    <AddNote />
                </ProtectedRoute> */}
                {/* <ProtectedRoute exact path="/notes/:noteId">
                    <OneNote />
                </ProtectedRoute> */}
                {/* <ProtectedRoute exact path="/notes/:noteId/edit">
                    <EditNote />
                </ProtectedRoute> */}
                {/* <ProtectedRoute exact path="/notes/:noteId/delete">
                    <DeleteNote />
                </ProtectedRoute> */}
                <ProtectedRoute exact path="/notebooks">
                    <Notebooks />
                </ProtectedRoute>
                {/* <ProtectedRoute exact path="/notebooks/new">
                    <AddNotebook />
                </ProtectedRoute> */}
                <ProtectedRoute exact path="/notebooks/:notebookId">
                    <OneNotebook />
                </ProtectedRoute>
                {/* <ProtectedRoute exact path="/notebooks/:notebookId/delete">
                    <DeleteNotebook />
                </ProtectedRoute>
                <ProtectedRoute exact path="/notebooks/:notebookId/edit">
                    <EditNotebook />
                </ProtectedRoute> */}
                <ProtectedRoute exact path="/coming-soon">
                    <ComingSoon />
                </ProtectedRoute>
                <Route>
                    <PageNotFound />
                </Route>
            </Switch>
        </>
    )
}

export default App;
