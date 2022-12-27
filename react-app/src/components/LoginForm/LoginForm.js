import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import logo from '../../assets/quill.png';
import './LoginForm.css';

const LoginForm = () => {
    const [ errors, setErrors ] = useState([]);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const demoUser = (email, password) => {
        setEmail(email)
        setPassword(password)
    }

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <form onSubmit={onLogin}>
            <div className="login-form-container">
                {errors.length > 0 ? (
                    <div className="login-errors">
                        {errors.map((error, ind) => (
                            <div key={ind}>* {error}</div>
                        ))}
                    </div>
                ) :
                (<div className="branding-div">
                    <div className="login-image">
                        <img className="login-logo-img" src={logo} alt="cat logo" />
                    </div>
                    <div className="login-app-title">
                        <h1 id="login-title">Inscribe</h1>
                    </div>
                    <div className="login-motto">
                        <h5 id="motto">Random thoughts, manifested.</h5>
                    </div>
                </div>)}
                <div className="form-box">
                    <div>
                        <input
                            className="form-fields"
                            name='email'
                            type='text'
                            placeholder='Email address'
                            value={email}
                            onChange={updateEmail}
                            required
                        />
                    </div>
                    <div>
                        <input
                            className="form-fields"
                            name='password'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={updatePassword}
                            required
                        />
                    </div>
                    <div className="login-form-buttons">
                        <button
                            className="login-btns"
                            type='submit'
                            >
                                Log in
                        </button>
                        <button
                            className="login-btns"
                            id="demo-log"
                            type='submit'
                            onClick={() => demoUser('demo@aa.io', 'password')}
                            >
                                Login Demo User
                        </button>
                    </div>
                </div>
                <div className="small-print">
                    <p id="sml-prnt">© 2022 Inscribe Corporation. All rights reserved.</p>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
