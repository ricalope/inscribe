import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import { DarkModeContext } from '../../context/ThemeContext';

const LogoutButton = ({ setShowLogout }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { darkMode } = useContext(DarkModeContext);

    const onLogout = async (e) => {
        await dispatch(logout());
        await history.push('/');
        setShowLogout(false);
        localStorage.removeItem('scratchPad');
    };

    return (
        <div className="logout-main-div">
            <div className="cnfrm-logout">
                <h2>Confirm Logout</h2>
            </div>
            <div className="cnfrm-body">
                <h5>Anything you have written in the scratch pad will be discarded.</h5>
            </div>
            <div className="cnfrm-btn">
                <button
                    className={darkMode ? 'nb-btn one dark' : 'nb-btn one light'}
                    onClick={() => setShowLogout(false)}
                    >
                    Cancel
                </button>
                <button onClick={onLogout} className="nb-btn two">
                    Log Out
                </button>
            </div>
        </div >
    )
};

export default LogoutButton;
