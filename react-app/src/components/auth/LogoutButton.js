import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const onLogout = async (e) => {
        await dispatch(logout());
        await history.push('/');
        localStorage.clear()
    };

    return (
        <button onClick={onLogout} id="lo-btn">
            <i className="fa-solid fa-arrow-right-from-bracket" />
        </button>
    )
};

export default LogoutButton;
