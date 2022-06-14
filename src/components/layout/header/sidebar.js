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

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="sidebar" aria-labelledby="sidebarLabel">
                <div className="offcanvas-header" >
                    <div className="offcanvas-title">
                        test
                    </div>
                </div>

                <div className="offcanvas-body">
                    <div>
                        test offcanvass
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar


