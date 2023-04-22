import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Notes from './components/Notes';
import Notebooks from './components/Notebooks';
import OneNotebook from './components/OneNotebook';
import Tasks from './components/Tasks';
// import User from './components/Users/User';
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
            await setLoaded(true);
        })();
    }, []);

    if(!loaded) {
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
                <ProtectedRoute exact path="/notebooks">
                    <Notebooks />
                </ProtectedRoute>
                <ProtectedRoute exact path="/notebooks/:notebookId">
                    <OneNotebook />
                </ProtectedRoute>
                <ProtectedRoute exact path="/coming-soon">
                    <ComingSoon />
                </ProtectedRoute>
                <ProtectedRoute exact path="/tasks">
                    <Tasks />
                </ProtectedRoute>
                <Route>
                    <PageNotFound />
                </Route>
            </Switch>
        </>
    )
}

export default App;
