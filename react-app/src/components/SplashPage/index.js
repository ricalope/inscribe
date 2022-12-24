import React, { useState } from 'react';
import LoginFormModal from '../LoginForm/LoginFormModal';
import SignupFormModal from '../SignupForm/SignupFormModal';
import logo from '../../assets/cat-logo.png'
import './SplashPage.css'

function SplashPage() {

    const [ showLogin, setShowLogin ] = useState(false);
    const [ showSignup, setShowSignup ] = useState(false);

    return (
        <div className="sp-main-container">
            <div className="sp-header">
                <div className="logo-image-header">
                    <div>
                        <img src={logo} className="cat-img" alt="cat-stretching" />
                    </div>
                    <div>
                        <h1>Inscribe</h1>
                    </div>
                </div>
                <div className="sp-login-div">
                    <button
                        className="sp-login-button"
                        onClick={() => setShowLogin(true)}
                    >
                        Login
                    </button>
                </div>
            </div>
            <div className="sp-main-body-top">
                <h2>Tame your work, organize your life.</h2>
                <h3>Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</h3>
                <button className="sp-body-signup" onClick={() => setShowSignup(true)}>Sign up for free</button>
                <button className="sp-body-login" onClick={() => setShowLogin(true)}>Already have an account? Login</button>
                {showLogin && <LoginFormModal showLogin={showLogin} setShowLogin={setShowLogin} />}
                {showSignup && <SignupFormModal showSignup={showSignup} setShowSignup={setShowSignup} />}
            </div>
            <div className="sp-main-body-middle">
                <div className="sp-middle-img">

                </div>
                <div className="sp-middle-text">
                    <div className="sp-first-text">
                        <h3>WORK ANYWHERE</h3>
                        <h5>Keep important info handy—your notes sync automatically to all your devices.</h5>
                    </div>
                    <div className="sp-second-text">
                        <h3>REMEMBER EVERYTHING</h3>
                        <h5>Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</h5>
                    </div>
                    <div className="sp-third-text">
                        <h3>TURN TO-DO INTO DONE</h3>
                        <h5>Bring your notes, tasks, and schedules together to get things done more easily.</h5>
                    </div>
                    <div className="sp-fourth-text">
                        <h3>FIND THINGS FAST</h3>
                        <h5>Get what you need, when you need it with powerful, flexible search capabilities.</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;
