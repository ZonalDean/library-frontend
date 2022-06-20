import { Modal } from "bootstrap";
import { useRef, useState, useContext } from "react";
import { UserAuthContext } from "../../../contexts/UserAuthContext";

function StaffLogin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { staffLogin } = useContext(UserAuthContext)

    const handleSubmitLogin = async e => {
        try {
            e.preventDefault();
            await staffLogin(email, password);
        } catch (err) {
            // setError(err.response.data.message);
        }
    };

    return (
        <div className="d-flex justify-content-center m-5">
            <div className="card shadow d-flex col-7">
                <h1 className="text-center">Staff Login</h1>
                <hr />
                <form
                    className="border border-1 shadow p-3 rounded-lg bg-light mx-auto max-w-99"
                    onSubmit={handleSubmitLogin}
                >
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
                    <div className="mb-2 d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary rounded-md h-12 fw-bold text-4.5"
                        >
                            Log In
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default StaffLogin