import NavBar from '../Navigation/NavBar';
import './PageNotFound.css';


function PageNotFound() {

    return (
        <>
            <NavBar />
            <div className="pnf-main-container">
                <div className="pnf-inner">
                    <div className="pnf-header">
                        <h1 id="pnf-h1">Page Not Found</h1>
                    </div>
                    <div className="pnf-body">
                        <p id="pnf-ptag">The page you have requested does not exist please check the url and try again.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound;
