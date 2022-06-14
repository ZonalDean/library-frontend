import BookCard from "./BookCard";
import { useRef, useEffect, useState } from "react"
import BookModal from "./BookModal";
import { getBooksDisplay } from "../../api/books";
import { Modal } from "bootstrap";



function BookDisplay(props, onClose) {

    // const [open, setOpen] = useState(false);
    const [book, setBook] = useState();

    const modalEl = useRef();
    const [modal, setModal] = useState();
    const [modalData, setModalData] = useState(null);

    const handleClickModal = () => {
        const modalObj = new Modal(modalEl.current);
        setModal(modalObj);
        modalObj.show();
    };

    const closeModal = () => {
        modal.hide();
    };

    useEffect(() => {

    })

    const tag = props.name

    useEffect(() => {

        const fetchDisplayBooks = async () => {
            try {
                const res = await getBooksDisplay(tag)
                setBook(res.data.foundBooks)
            } catch (err) {
                console.log('error fetchBooks')
            }
        }
        fetchDisplayBooks();
    }, []);

    return (
        <div className=" m-3 p-2 bg-warning enable-rounded enable-shadow rounded">

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
                {book ? (book.map(el => (
                    <div key={el.id} onClick={() => {
                        setModalData(el);

                            // console.log(el)
                        
                        console.log(modalData)
                        handleClickModal();
                    }}>
                        <BookCard coverPhoto={el.coverPhoto}  />
                    </div>
                ))) : (
                    <div></div>
                )}
            </div>

            {/* {modalData ? (
                <div
                    className="modal fade"
                    id="modal-book"
                    tabIndex="-1"
                    ref={modalEl}
                    onClick={onClose}
                >
                    <BookModal
                        closeModal={closeModal}
                        coverPhoto={modalData.coverPhoto}
                        name={modalData.name}
                        authorName={modalData.authorName}
                        description={modalData.description}
                    />
                </div>
            ) : (
                <div></div>
            )} */}




        </div>
    )
}

export default BookDisplay