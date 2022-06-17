import { Link } from "react-router-dom"


function Sidebar() {

    
    
    return (
        <>
            <button
                className="btn btn-light m-2"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#sidebar"
                aria-controls="sidebarLabel"
            >
                <i className="fa-solid fa-bars"></i>
            </button>

            <div className="offcanvas offcanvas-end show" tabIndex="-1" id="sidebar" aria-labelledby="sidebarLabel">
                <div className="offcanvas-header" >
                    <h2 className="offcanvas-title">
                        test
                    </h2>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body">
                    <h3>
                        My Books
                    </h3>
                    <Link to={`myreturn`}>
                        Books to Return
                    </Link>
                    {/* <Link>
                        Books to Return 
                    </Link> */}
                </div>
            </div>
        </>
    )
}

export default Sidebar


