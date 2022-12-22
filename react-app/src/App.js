import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/Users/User';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import OneNote from './components/OneNote';
import DeleteNote from './components/DeleteNote';
import Notebooks from './components/Notebooks';
import AddNotebook from './components/AddNotebook';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/login'>
          <LoginForm />
        </Route>
        <Route exact path='/sign-up'>
          <SignUpForm />
        </Route>
        <ProtectedRoute exact path='/users/:userId'>
          <User />
        </ProtectedRoute>
        <Route exact path='/'>
          <h1>My Home Page</h1>
        </Route>
        <ProtectedRoute exact path='/notes'>
            <Notes />
        </ProtectedRoute>
        <ProtectedRoute exact path="/notes/new">
            <AddNote />
        </ProtectedRoute>
        <ProtectedRoute exact path="/notes/:noteId">
            <OneNote />
        </ProtectedRoute>
        <ProtectedRoute exact path="/notes/:noteId/edit">
            <EditNote />
        </ProtectedRoute>
        <ProtectedRoute exact path="/notes/:noteId/delete">
            <DeleteNote />
        </ProtectedRoute>
        <ProtectedRoute exact path="/notebooks">
            <Notebooks />
        </ProtectedRoute>
        <ProtectedRoute exact path="/notebooks/new">
            <AddNotebook />
        </ProtectedRoute>
        <Route>
            <h2>Page Not Found</h2>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
