import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


function NewBook() {

    // Form Data
    const [bookId, setBookId] = useState()
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [authorName, setAuthorName] = useState(null)
    const [coverPhoto, setCoverPhoto] = useState(null)
    const coverPhotoInputEl = useRef()

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const formdata = new FormData()
            formdata.append('coverPhoto', coverPhoto)
            formdata.append('authorName', authorName)
            formdata.append('name', name)
            formdata.append('description', description)
            const res = await axios.post(`staff/newbook`, formdata)
            console.log(res.data.newBook.id)
            setBookId(res.data.newBook.id)
        } catch (err) {
            console.log("handleSubmit error")
        }
        
    }
    
    useEffect(() => {
        if (bookId) {
            navigate(`../book/update/${bookId}`)
        }
    }, [bookId])
    
    // console.log(bookId)
    return (
        <div className="m-2 justify-content-center d-flex">
            <form action="" className="justify-content-center d-flex col-11">

                <div className="card p-2 my-2 col-12">
                    <div className="d-flex">
                        <div className="col-3 d-flex justify-content-center align-items-end"
                            style={{
                                backgroundImage: `url(${coverPhoto})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center",

                            }}
                        >

                        </div>
                        <div className="col">
                            <label className="fs-3 fw-bold" htmlFor="name">Book Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Book name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                id="name"
                            ></input>
                            <label className="fs-3 fw-bold" htmlFor="author">Book Author:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Book author"
                                value={authorName}
                                onChange={e => setAuthorName(e.target.value)}
                                id="author"
                            ></input>
                            <label className="fs-3 fw-bold" htmlFor="description">Book Description:</label>
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Book description"
                                rows="4"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                id="description"
                            ></textarea>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="col-3 d-flex justify-content-end align-items-center flex-column">
                            {/* <Link to={`../book/update/${bookId}`}> */}
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create New Book</button>
                            {/* </Link> */}
                        </div>
                        <div className="col d-flex">
                            <div className="col">
                                <label htmlFor="coverPhotoFile" className="form-label fs-3 fw-bold">Update Book Cover</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    ref={coverPhotoInputEl}
                                    onChange={e => {
                                        if (e.target.files[0]) {
                                            setCoverPhoto(e.target.files[0]);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>



                <div></div>
                <div></div>
            </form>
        </div>
    )
}

export default NewBook