import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css'

const NavBar = () => {

    const [ theme, setTheme ] = useState('light')

    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        document.body.className = theme
    }, [ theme ])

    const themeChange = () => {
        if (theme === 'light') {
            setTheme('dark')
            return
        }
        setTheme('light')
        return
    }

    return (
        <div className="nav-main-container">
            <nav>
                <div className="nav-inner-container">
                    <button
                        className="light-switch"
                        onClick={themeChange}
                    >
                        {theme === 'light' ? '🌚' : '🌞'}
                    </button>
                    <div id="nav-home">
                        <NavLink to='/' exact={true} activeClassName='active'>
                            Home
                        </NavLink>
                    </div>
                    {!sessionUser && (
                        <div>
                            <div>
                                <NavLink to='/login' exact={true} activeClassName='active'>
                                    Login
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                                    Sign Up
                                </NavLink>
                            </div>
                        </div>
                    )}
                    <div>
                        <NavLink to='/notes' exact={true} activeClassName='active'>
                            Notes
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/notebooks' exact={true} activeClassName='active'>
                            Notebooks
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/notes/new' exact={true} activeClassName='active'>
                            Add Note
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/notebooks/new' exact={true} activeClassName='active'>
                            Add Notebook
                        </NavLink>
                    </div>
                    <div>
                        <LogoutButton />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
