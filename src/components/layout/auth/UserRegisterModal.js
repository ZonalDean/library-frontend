import { Modal } from "bootstrap";
import { useRef, useState, useContext } from "react";
import { UserAuthContext } from "../../../contexts/UserAuthContext";

function UserLoginModal({ open, onClose }) {
    const modalEl = useRef();
    const [modal, setModal] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { register } = useContext(UserAuthContext)
    // const {setError} = useContext(////)

    const handleClickModal = () => {
        const modalObj = new Modal(modalEl.current);
        setModal(modalObj);
        modalObj.show();
    }

    const handleSubmitRegister = async e => {
        try {
            e.preventDefault();
            await register(firstName, lastName, email, password, confirmPassword);
        } catch (err) {
            // setError(err.response.data.message);
        }
    };

    const closeModal = () => {
        modal.hide();
    };

    return (
        <div>

            <button
                className="btn btn-secondary rounded-md h-12 fw-bold"
                type="button"
                onClick={handleClickModal}
            >
                Register
            </button>

            <div
                className="modal fade"
                id="modal-login"
                tabIndex="-1"
                ref={modalEl}
                onClick={onClose}
            >
                <div className="modal-dialog modal=lg modal-dialog-centerd">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>
                                Register
                            </h4>
                        </div>
                        <div className="modal-body">
                            <form
                                className="border border-1 shadow p-3 rounded-lg bg-white mx-auto max-w-99"
                                onSubmit={handleSubmitRegister}
                            >
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control rounded-md h-13"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control rounded-md h-13"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control rounded-md h-13"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control rounded-md h-13"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control rounded-md h-13"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                <div className="mb-2 d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary rounded-md h-12 fw-bold text-4.5"
                                    >
                                        Register
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserLoginModal

