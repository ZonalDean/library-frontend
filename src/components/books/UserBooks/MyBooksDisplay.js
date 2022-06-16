import BookCard from "../BookCard";
import { useRef, useEffect, useState } from "react"
import { getBooksDisplay, getBookById } from "../../../api/books";
import { Modal } from "bootstrap";
import axios from "axios";



function MyBooksDisplay(props, onClose) {

    const [books, setBooks] = useState();
    // const [bookTags, setBookTags] = useState();

    const modalEl = useRef();
    const [modal, setModal] = useState(null);
    const [modalTrigger, setModalTrigger] = useState(false)

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


    const tag = props.name

    useEffect(() => {

        const fetchDisplayBooks = async () => {
            try {
                const resBooks = await getBooksDisplay(tag)
                setBooks(resBooks.data.foundBooks)
            } catch (err) {
                console.log('error fetchBooks')
            }
        }
        fetchDisplayBooks();
    }, []);

    const handleFetchTags = async (modalData) => {
        try {
            console.log(modalData.id)
            const res = await axios.get(`public/book/${modalData.id}`)
            console.log(res.data.book.Tags)
            setModalTags(res.data.book.Tags)
        } catch (err) {
            console.log("fethtag error")
        }
    }
    console.log(modalTags)
    return (
        <div className="m-3 p-2 bg-warning enable-rounded enable-shadow rounded">

            <h2 className="text-start">
                {tag}
            </h2>
            <div className="d-flex justify-content-start">
                <a className="text-start " href="#">
                    See all
                </a>
            </div>

            <div className="d-flex justify-content-center bookdisplay">
                {/* Below is to prevent REACT from trying to map before it has fetched book */}
                {books ? (books.map(book => (
                    <div key={book.id} onClick={() => {
                        setModalData(book);
                        handleClickModal();
                        handleFetchTags(book);
                    }}>
                        <BookCard coverPhoto={book.coverPhoto} />
                    </div>
                ))) : (
                    <div></div>
                )}
            </div>

            {/* work using optional chaning ie modalData?.name */}
            <div
                className="modal fade"
                id="modal-book"
                tabIndex="-1"
                ref={modalEl}
                onClick={onClose}
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
                                    {/* <div className="d-flex">
                                        <div className="bg-warning rounded-pill my-2 me-2">
                                            <p className="m-2">Sci-Fi</p>
                                        </div>
                                        <div className="bg-warning rounded-pill my-2 me-2">
                                            <p className="m-2">Politics</p>
                                        </div>
                                        <div className="bg-warning rounded-pill my-2 me-2">
                                            <p className="m-2">Dune Series</p>
                                        </div>
                                    </div> */}

                                    <div className>
                                        <button className="btn w-100 btn-primary">
                                            Borrow Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default MyBooksDisplay