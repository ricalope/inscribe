import { Modal } from '../../context/Modal';
import LogoutButton from './LogoutButton';


function LogoutModal({ showLogout, setShowLogout }) {

    return (
        <>
            {showLogout && (
                <Modal onClose={() => setShowLogout(false)}>
                    <LogoutButton setShowLogout={setShowLogout}/>
                </Modal>
            )}
        </>
    )
}

export default LogoutModal;
