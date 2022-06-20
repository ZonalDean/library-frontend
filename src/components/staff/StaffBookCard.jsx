import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function StaffBookCard({ id, coverPhoto, name, authorName, description }) {

    const [tags, setTags] = useState()
    const [stocks, setStocks] = useState()

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await axios.get(`staff/book/${id}`)
                // console.log(res.data.foundBook)
                setStocks(res.data.foundBook.BookStocks)
                setTags(res.data.foundBook.Tags)
            } catch (err) {
                console.log("fetchTags error")
            }
        }

        fetchTags()
    }, [])

    // console.log(tags)
    // console.log(id)

    return (
        <div className="card shadow p-2 d-flex m-2 col-3">
            <div className="d-flex justify-content-between">
                <div className="fw-bold text-center fs-4 col-10">{name}</div>
                <Link to={`../../../book/update/${id}`}>
                    <button className="btn btn-light shadow"><i className="fa-solid fa-gear text-center"></i></button>
                </Link>
            </div>
            <div className="d-flex">
                <div className="col-4 me-2"
                    style={{
                        backgroundImage: `url(${coverPhoto})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",

                    }}
                ></div>
                <div className="col-8">
                    <div className="fw-bold">Author:</div>
                    <div>{authorName}</div>
                    <div className="d-flex flex-wrap">
                        <div className="col-12 fw-bold">Tags</div>
                        {tags ? (
                            (tags.map(tag => (
                                <div className="me-2 rounded bg-primary px-1 text-white" key={tag.id} >{tag.name}</div>
                            )))
                        ) : (
                            <div></div>
                        )}

                    </div>
                    <div className="d-flex flex-wrap">
                        <div className="col-12 fw-bold">Stocks:</div>
                        {stocks ? (
                            (stocks.map(stock => (
                                <div className="me-2 rounded-pill bg-warning px-1 my-1 text-white" key={stock.id} >{stock.id}</div>
                            )))
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default StaffBookCard