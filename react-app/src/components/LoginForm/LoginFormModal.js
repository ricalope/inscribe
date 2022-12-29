import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';


function LoginFormModal({ showLogin, setShowLogin }) {
    return (
        <>
            {showLogin && (
                <Modal onClose={() => setShowLogin(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    )
}

export default LoginFormModal;
