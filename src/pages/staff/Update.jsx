import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"

function Update() {
    const location = useLocation()

    const [bookId, setBookId] = useState()
    const [book, setBook] = useState()

    // Form Data
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [authorName, setAuthorName] = useState()
    const [tags, setTags] = useState()
    const [coverPhoto, setCoverPhoto] = useState()
    const [stocks, setStocks] = useState()
    // const [myReq, setMyReq] = useState()

    const coverPhotoInputEl = useRef()
    // const [] = useState()

    const path = location.pathname
    const pathArr = path.split('/')

    useEffect(() => {
        setBookId(pathArr[3])
    }, [])

    useEffect(() => {

        const fetchBook = async () => {
            try {
                const res = await axios.get(`staff/book/${bookId}`)
                console.log(res.data.foundBook)
                setBook(res.data.foundBook)
            } catch (err) {
                console.log("fetchBook error")
            }
        }

        fetchBook()
    }, [bookId])

    useEffect(() => {
        if (book) {
            setTags(book.Tags)
            setStocks(book.BookStocks)
            setName(book.name)
            setAuthorName(book.authorName)
            setDescription(book.description)
            setCoverPhoto(book.coverPhoto)
        }

    }, [book])

    const handleSubmit = async () => {
        try {

            const formdata = new FormData()
            formdata.append('coverPhoto', coverPhoto)
            formdata.append('authorName', authorName)
            formdata.append('name', name)
            formdata.append('description', description)
            const res = await axios.patch(`staff/updatebook/${bookId}`, formdata)
            console.log(res)
        } catch (err) {
            console.log("handleSubmit error")
        }

    }

    const handleDelete = async (e) => {
        try {
            e.preventDefault()
            await axios.delete(`staff/deletebook/${bookId}`)
        } catch {
            console.log("handleDelete err")
        }
    }

    // for Tags
    const [inputTag, setInputTag] = useState()

    const removeTag = async (e, tagid) => {
        try {
            e.preventDefault()
            const res = await axios.patch(`staff/booktags/${bookId}/${tagid}`)
            // console.log(res.data)
            setTags(res.data.updatedTags)
            setInputTag()
        } catch (err) {
            console.log("removeTag err")
        }
    }

    const addTag = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.patch(`staff/booktags/add/${bookId}/${inputTag}`)
            setTags(res.data.updatedTags)
        } catch (err) {
            console.log("addTag err")
        }
    }

    // for Stocks
    const removeStock = async (e, stockid) => {
        try {
            e.preventDefault()
            const res = await axios.delete(`staff/stock/${stockid}/${bookId}`)
            setStocks(res.data.updatedStocks)
        } catch (err) {
            console.log('removeStock error')
        }
    }

    const addStock = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.post(`staff/stock/${bookId}`)
            setStocks(res.data.updatedStocks)
        } catch (err) {
            console.log("addStock err")
        }

    }

    return (
        <div>
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
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
                                <Link to={`../../../`}>
                                    <button type="submit" className="btn btn-danger mt-1" onClick={(e) => handleDelete(e)}>Delete This Book</button>
                                </Link>
                            </div>
                            <div className="col d-flex">
                                <div className="col">
                                    <label htmlFor="coverPhotoFile" className="form-label fs-3 fw-bold">Update Book Cover</label>
                                    <input
                                        type="file"
                                        id="coverPhotoFile"
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

            <div className="m-2 justify-content-center d-flex">
                <div className="col-11 d-flex">
                    <div className="card p-2 shadow col">
                        <div className="fs-3 fw-bold">Tags</div>
                        <div className="d-flex flex-wrap">
                            {tags?.map(tag => (
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={(e) => removeTag(e, tag.id)}
                                >{tag.name}<i className=" ms-3 fa-solid fa-xmark"></i></button>
                            ))}
                        </div>
                        <div>
                            <form className="d-flex pt-2">
                                <div className="d-flex col-3">
                                    <input type="text" placeholder="Add tag" className="form-control" onChange={e => setInputTag(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-secondary mx-2" onClick={(e) => addTag(e)}>Add Tag</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="m-2 justify-content-center d-flex">
                <div className="col-11 d-flex">
                    <div className="card p-2 shadow col">
                        <div className="fs-3 fw-bold">Stocks</div>
                        <div className="d-flex flex-wrap">
                            {stocks?.map(stock => (
                                <button onClick={(e) => removeStock(e, stock.id)} className="btn btn-primary me-2">{stock.id} <i className="ms-3 fa-solid fa-xmark"></i></button>
                            ))}
                        </div>
                        <div className="pt-2">
                            <button className="btn btn-secondary" onClick={(e) => addStock(e)}>Add Stock</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update