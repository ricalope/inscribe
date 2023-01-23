import { Link } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';
import './PageNotFound.css';


function PageNotFound() {

    return (
        <>
            <NavBar />
            <div className="pnf-main-container">
                <div className="pnf-inner">
                    <div className="pnf-status">
                        <h1 id="pnf-h1">404</h1>
                    </div>
                    <div className="pnf-header">
                        <h2 id="pnf-h2">Page Not Found</h2>
                    </div>
                    <div className="pnf-body">
                        <p id="pnf-ptag">The page you have requested does not exist please check the url and try again.</p>
                    </div>
                    <div className="pnf-reroute">
                        <Link exact="true" to="/" className="pnf-home-link">
                            Go Back Home?
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound;
