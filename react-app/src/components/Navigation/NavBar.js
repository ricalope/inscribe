import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css'

const NavBar = () => {

    const [theme, setTheme] = useState('light')

    useEffect(() => {
        document.body.className = theme
    }, [theme])

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
                    <div>
                        <NavLink to='/' exact={true} activeClassName='active'>
                            Home
                        </NavLink>
                    </div>
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
                    <div>
                        <NavLink to='/users' exact={true} activeClassName='active'>
                            Users
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/notes' exact={true} activeClassName='active'>
                            Notes
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/notes/new' exact={true} activeClassName='active'>
                            Add Note
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
