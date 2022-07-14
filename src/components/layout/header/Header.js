import UserLoginModal from "../auth/UserLoginModal";
import UserRegisterModal from "../auth/UserRegisterModal";
import Sidebar from "./sidebar";
import { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../../../contexts/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Header(props) {
    // const [open, setOpen] = useState(false)
    const { user } = useContext(UserAuthContext)
    const navigate = useNavigate

    const [search, setSearch] = useState()
    const [tag, setTag] = useState('all')
    const [tagOptions, setTagOptions] = useState()

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await axios.get(`public/getalltags`)
                // console.log(res.data.foundTags)
                setTagOptions(res.data.foundTags)
            } catch (err) {
                console.log('fetchTag error')
            }
        }
        fetchTags()
    }, [])

    const handleSubmitSearch = async e => {
        try {
            e.preventDefault();
            console.log(search)
            console.log(tag)
        } catch (err) {
            // setError(err.response.data.message);
        }
    };


    return (
        <>
            <nav className="navbar bg-secondary">
                <div className="row w-100">

                    <div className="col-11 d-flex">
                        <Link className="navbar-brand text-light fw-bold fs-1 mx-2" to="/" >BiblioTech</Link>
                        <div className="d-flex align-items-center">
                            {props.roleStaff ? (
                                <div className="d-flex">
                                    <div className="text-light fw-light fs-1 mx-2">Staff</div>
                                    <form onSubmit={handleSubmitSearch}>
                                        <div className="mx-3 d-flex align-items-center shadow rounded-3 bg-light  py-2">
                                            <Link to={`booksearch/${search}/${tag}/`}>
                                                <button className="btn btn-primary mx-3 shadow" type="submit">
                                                    <i className="fa-solid fa-magnifying-glass fs-4  "></i>
                                                </button>
                                            </Link>

                                            <div className="">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search for books"
                                                    value={search ? search : undefined}
                                                    onChange={e => setSearch(e.target.value)}
                                                />
                                            </div>
                                            <div className="mx-3">
                                                <select className="form-select"
                                                    value={tag}
                                                    onChange={e => setTag(e.target.value)}
                                                >
                                                    <option>All Tags</option>
                                                    {tagOptions ? (
                                                        tagOptions.map(tagOption => (
                                                            <option key={tagOption.id} value={tagOption.name}>{tagOption.name}</option>
                                                        ))
                                                    ) : (
                                                        <option>Error</option>
                                                    )}
                                                </select>
                                            </div>

                                        </div>
                                    </form>
                                </div>

                            ) : (
                                <form onSubmit={handleSubmitSearch}>
                                    <div className="mx-3 d-flex align-items-center shadow rounded-3 bg-light  py-2">
                                        <Link to={`booksearch/${search}/${tag}/`}>
                                            <button className="btn btn-primary mx-3 shadow" type="submit">
                                                <i className="fa-solid fa-magnifying-glass fs-4  "></i>
                                            </button>
                                        </Link>

                                        <div className="">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search for books"
                                                value={search}
                                                onChange={e => setSearch(e.target.value)}
                                            />
                                        </div>
                                        <div className="mx-3">
                                            <select className="form-select"
                                                value={tag}
                                                onChange={e => setTag(e.target.value)}
                                            >
                                                <option>All Tags</option>
                                                {tagOptions ? (
                                                    tagOptions.map(tagOption => (
                                                        <option key={tagOption.id} value={tagOption.name}>{tagOption.name}</option>
                                                    ))
                                                ) : (
                                                    <option>Error</option>
                                                )}
                                            </select>
                                        </div>

                                    </div>
                                </form>
                            )}


                        </div>
                    </div>

                    <div className="d-flex col-1 justify-content-end align-items-center">
                        {
                            user ? (
                                <div>
                                    <Sidebar />
                                </div>
                            ) : (
                                <>
                                    <UserLoginModal />
                                    <UserRegisterModal />
                                </>
                            )
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;