import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';


function SignupFormModal({ showSignup, setShowSignup }) {
    return (
        <>
            {showSignup && (
                <Modal onClose={() => setShowSignup(false)}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    )
}

export default SignupFormModal;
