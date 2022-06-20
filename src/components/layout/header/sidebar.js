import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { UserAuthContext } from "../../../contexts/UserAuthContext"

function Sidebar() {

    const { logout, user } = useContext(UserAuthContext);
    const [roleUser, setRoleUser] = useState(false)
    const [roleStaff, setRoleStaff] = useState(false)
    useEffect(() => {
        if (user) {
            if (user.isStaff) {
                setRoleStaff(true)
            } if (user.isUser) {
                setRoleUser(true)
            }

        }
    }, [user])
    return (
        <>
            <button
                className="btn btn-light m-2 "
                type="button"

                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvas"
                aria-controls="sidebarLabel"
            >
                <i className="fa-solid fa-bars"></i>
            </button>

            <div className="offcanvas offcanvas-end"
                data-bs-backdrop="true"
                // data-bs-backdrop={false}
                tabIndex="-1" id="offcanvas" aria-labelledby="sidebarLabel">

                <div className="offcanvas-header" >
                    <h2 className="offcanvas-title">
                        BiblioTech
                    </h2>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                {roleUser ? (
                    <div className="offcanvas-body">
                        <h3>
                            My Books
                        </h3>
                        <div className="d-flex flex-column">
                            <Link to={'mypickup'}>
                                Books to Return
                            </Link>
                            <Link to={`myreturn`}>
                                Books to Pickup
                            </Link>
                            <button
                                className="btn btn-warning"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : roleStaff ? (
                    <div className="offcanvas-body">
                        <h3>
                            My Books
                        </h3>
                        <div className="d-flex flex-column">
                            <Link to={`newbook`}>
                                Create a new Book
                            </Link>
                            <button
                                className="btn btn-warning"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )

                }




            </div>
        </>
    )
}

export default Sidebar


