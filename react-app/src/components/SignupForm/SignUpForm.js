import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/quill.png';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupForm.css'

const SignUpForm = () => {

    const [ errors, setErrors ] = useState([]);
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ submitted, setSubmitted ] = useState(false);

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();

        setSubmitted(true);
        if (errors.length > 0) return;

        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password, firstName, lastName));
            if (data) {
                setErrors(data)
            }
        } else if (password !== repeatPassword) {
            setErrors([ 'Passwords must match' ])
        }
        setSubmitted(false);
    };

    useEffect(() => {
        const errors = []
        if (password.length < 8) {
            errors.push('Password length must be at least 8 characters.')
        }
        setErrors(errors)
        return () => {
            setErrors([])
        }
    }, [ password ])

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updateFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const updateLastName = (e) => {
        setLastName(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <form onSubmit={onSignUp}>
            <div className="signup-form-container">
                {submitted && errors.length > 0 ? (
                    <div className="errors-container">
                        {errors.map((error, ind) => (
                            <div key={ind} className="errors-map">
                                <div className="error-header">
                                    The following issues were found:
                                </div>
                                <div className="login-errors">* {error}</div>
                            </div>
                        ))}
                    </div>) : (
                    <div className="branding-div">
                        <div className="login-image">
                            <img className="login-logo-img" src={logo} alt="quill logo" />
                        </div>
                        <div className="login-app-title">
                            <h1 id="login-title">Inscribe</h1>
                        </div>
                        <div className="login-motto">
                            <h5 id="motto">Random thoughts, manifested.</h5>
                        </div>
                    </div>
                )}
                <div className="form-box">
                    <div>
                        <input
                            className="su-form-inputs"
                            type='text'
                            name='username'
                            onChange={updateUsername}
                            value={username}
                            placeholder="User Name *"
                            required
                        />
                    </div>
                    <div>
                        <input
                            className="su-form-inputs"
                            type='email'
                            name='email'
                            onChange={updateEmail}
                            value={email}
                            placeholder="Email *"
                            required
                        />
                    </div>
                    <div>
                        <input
                            className="su-form-inputs"
                            type='text'
                            name='firstname'
                            value={firstName}
                            onChange={updateFirstName}
                            placeholder="First Name"
                        />
                    </div>
                    <div>
                        <input
                            className="su-form-inputs"
                            type='text'
                            name='lastname'
                            value={lastName}
                            onChange={updateLastName}
                            placeholder="Last Name"
                        />
                    </div>
                    <div>
                        <input
                            className="su-form-inputs"
                            type='password'
                            name='password'
                            onChange={updatePassword}
                            value={password}
                            placeholder="Password *"
                            required
                        />
                    </div>
                    <div>
                        <input
                            className="su-form-inputs"
                            type='password'
                            name='repeat_password'
                            onChange={updateRepeatPassword}
                            value={repeatPassword}
                            required
                            placeholder="Repeat Password *"
                        />
                    </div>
                    <button
                        type='submit'
                        id="su-submit-btn"
                    >
                        Sign Up
                    </button>
                </div>
                <div className="req-fields">
                    <p id="req-field">* indicates a required field</p>
                </div>
            </div>
        </form>
    );
};

export default SignUpForm;
