import NavBar from '../Navigation/NavBar';
import wipGif from '../../assets/wip.gif';
import './ComingSoon.css';


function ComingSoon() {

    return (
        <>
            <NavBar />
            <div className="cs-main-container">
                <div className="cs-inner">
                    <div className="cs-header">
                        <h1>Coming Soon</h1>
                    </div>
                    <div className="cs-body">
                        <p>
                            This feature is not currently built out, however this website reflects a current work in progress.<br />
                            I appreciate your patience as I implement more features that you will hopefully love. <br />
                        </p>
                    </div>
                    <div className="cs-wip-gif">
                        <img id="cs-wip" src={wipGif} alt="work in progress gif" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComingSoon;
