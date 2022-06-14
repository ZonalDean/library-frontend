import UserLoginModal from "../auth/UserLoginModal";
import UserRegisterModal from "../auth/UserRegisterModal";
import Sidebar from "./sidebar";
import { useContext, useState } from "react";
import { UserAuthContext } from "../../../contexts/UserAuthContext";
import UserAuthContextProvider from "../../../contexts/UserAuthContext";

function Header() {
    // const [open, setOpen] = useState(false)
    const { user } = useContext(UserAuthContext)
    return (
        <>
            <nav className="navbar bg-secondary">
                <div className="container-fluid">
                    <a className="navbar-brand text-light fw-bold fs-4" href="#">BiblioTech</a>
                    <i className="fa-solid fa-magnifying-glass fs-4 m-4 text-light"></i>
                    <div className="d-flex justify-content-end align-items-center flex-grow-1 me-1">
                        {
                            user ? (
                                <div>
                                </div>
                            ) : (
                                <>
                                        <UserLoginModal />
                                        <UserRegisterModal />
                                </>
                            )
                        }
                        <Sidebar />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;