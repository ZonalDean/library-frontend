import BookCard from "./BookCard";
import { useRef, useEffect, useState, useContext } from "react"
import { getBooksDisplay } from "../../api/books";
import { Modal } from "bootstrap";
import axios from "axios";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import BorrowButton from "./UserBooks/BorrowButton";
import { Link, Redirect } from "react-router-dom";


function BookDisplay(props, onClose) {

    const { user } = useContext(UserAuthContext)

    const [books, setBooks] = useState();

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

    // Manages Book Display
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

    // Manages tags in Modal
    const handleFetchTags = async (modalData) => {
        try {
            const res = await axios.get(`public/book/${modalData.id}`)
            setModalTags(res.data.book.Tags)
        } catch (err) {
            console.log("fethtag error")
        }
    }

    return (
        <div className="m-3 p-2 bg-warning enable-rounded enable-shadow rounded">

            <div className="d-flex ">
                <h2 className="text-start">
                    {tag}
                </h2>
                <Link to={`booksearch/undefined/${tag}/`} replace>
                    <button className="btn btn-primary mx-3 shadow"> See All</button>
                </Link>
            </div>

            <div className="d-flex justify-content-center bookdisplay">
                {/* Below is to prevent REACT from trying to map before it has fetched book */}
                {books ? (books.map(book => (
                    <div className="item" key={book.id} onClick={() => {
                        handleClickModal();
                        setModalData(book);
                        handleFetchTags(book);
                    }}>
                        <BookCard {...book} />
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

        </div>
    )
}

export default BookDisplay