import axios from "axios"
import { Modal } from "bootstrap"
import { useEffect, useRef, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import BookCard from "../components/books/BookCard"
import BorrowButton from "../components/books/UserBooks/BorrowButton"

function SearchBooks() {

    const [books, setBooks] = useState()
    const [search, setSearch] = useState()
    const [tag, setTag] = useState()

    const location = useLocation()

    // for getting params
    useEffect(() => {
        const path = location.pathname
        const pathArr = path.split('/')
        const rawTag = pathArr[3]
        const splitTag = rawTag.split('%20')
        const parsedTag = splitTag.join(' ')
        setSearch(pathArr[2])
        setTag(parsedTag)
    }, [location])

    // for getting all the books displayed
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // console.log(tag)
                const res = await axios.get(`public/booksearch/${search}/${tag}`)
                // console.log(res.data.result)
                const result = Object.values(res.data.result)
                console.log(result)
                setBooks(result)
            } catch (err) {
                console.log('fetchBooks error')
            }

        }

        fetchBooks()
    }, [search, tag, location])

    useEffect(() => {

    }, [search])
    
    // console.log(search)
    // console.log(tag)

    // handles modal
    const modalEl = useRef();
    const [modal, setModal] = useState(null);

    const [modalData, setModalData] = useState(null);
    const [modalTags, setModalTags] = useState(null);

    const handleClickModal = () => {
        const modalObj = new Modal(modalEl.current);
        setModal(modalObj);
        modalObj.show();
    }

    const closeModal = () => {
        modal.hide();
    };
    const handleFetchTags = async (modalData) => {
        try {
            const res = await axios.get(`public/book/${modalData.id}`)
            setModalTags(res.data.book.Tags)
        } catch (err) {
            console.log("fethtag error")
        }
    }

    // console.log(modalData)

    return (
        <div className="d-flex justify-content-left flex-wrap mybookdisplay m-5">
            {books ? (
                books?.map(book => (
                    <div className="mybook" key={book.id}
                        onClick={() => {
                            handleClickModal();
                            setModalData(book);
                            handleFetchTags(book);
                        }}
                    >

                        <BookCard {...book} />
                    </div>
                ))
            ) : (
                <div></div>
            )
            }

            <div
                className="modal fade"
                id="modal-book"
                tabIndex="-1"
                ref={modalEl}
            // onClick={onClose}
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-4">
                                    <div style={{ backgroundImage: `url(${modalData?.coverPhoto})`, height: "50vh", backgroundSize: 'contain', backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <h1 className="text-start">
                                        {modalData?.name}
                                    </h1>
                                    <h6 className="text-start">
                                        By: {modalData?.authorName}
                                    </h6>
                                    <p className="text-start">
                                        {modalData?.description}
                                    </p>

                                    {/* Needs return, literally no clue why */}
                                    {
                                        modalTags ? (
                                            (modalTags.map(modalTag =>
                                            (
                                                <div key={modalTag.id} className="bg-warning rounded-pill my-2 me-2">
                                                    <p className="m-2">{modalTag.name}</p>
                                                </div>)
                                            ))
                                        ) : (
                                            <div></div>
                                        )
                                    }
                                    <div>
                                        <BorrowButton {...modalData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default SearchBooks