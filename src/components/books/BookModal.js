import { Modal } from "bootstrap"
import { useRef, useEffect, useState } from "react"

function BookModal({ open, onClose, props }) {
    const modalEl = useRef();
    const [modal, setModal] = useState(null);

    useEffect(() => {
        const modalObj = new Modal(modalEl.current);
        setModal(modalObj);
    }, [])

    useEffect(() => {
        if (open) {
            modal.show();
        }
    }, [open]);

    return (
        // <div
        //     className="modal fade"
        //     id="modal-book"
        //     tabIndex="-1"
        //     ref={modalEl}
        //     onClick={onClose}
        // >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-4">
                                <div style={{ backgroundImage: `url(${props.coverPhoto})`, height: "50vh", backgroundSize: 'contain', backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
                                </div>
                            </div>
                            <div className="col-8">
                                <h1 className="text-start">
                                    {props.name}
                                </h1>
                                <h6 className="text-start">
                                    By: {props.authorName}
                                </h6>
                                <p className="text-start">
                                    {props.description}
                                </p>

                                <div className="d-flex">
                                    <div className="bg-warning rounded-pill my-2 me-2">
                                        <p className="m-2">Sci-Fi</p>
                                    </div>
                                    <div className="bg-warning rounded-pill my-2 me-2">
                                        <p className="m-2">Politics</p>
                                    </div>
                                    <div className="bg-warning rounded-pill my-2 me-2">
                                        <p className="m-2">Dune Series</p>
                                    </div>
                                </div>

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

        // </div>
    )
}

export default BookModal