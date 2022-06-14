import BookCard from "./BookCard";
import { useRef, useEffect, useState } from "react"
import BookModal from "./BookModal";


function BookDisplay() {

    const [open, setOpen] = useState(false);

    return (
        <div className="w-100 m-3 p-2 bg-warning enable-rounded enable-shadow rounded">

            <h2 className="text-start">
                Random Genre
            </h2>
            <div className="d-flex justify-content-start">
                <a className="text-start " href="#">
                    See all
                </a>
            </div>

            {/* <div className="d-flex justify-content-center bookdisplay">
                <BookCard className="item"/>
                <BookCard className="item"/>
                <BookCard className="item"/>
                <BookCard className="item"/>
                <BookCard className="item"/>
                <BookCard className="item"/>
                <BookCard className="item"/>
            </div> */}
            <div className="d-flex justify-content-center bookdisplay">
                <div 
                className="item mx-4 mb-3 card shadow" 
                onClick={() => setOpen(true)}>
                    <BookCard />
                </div>
                <div className="item mx-4 mb-3 card shadow">
                    <BookCard />
                </div>
                <div className="item mx-4 mb-3 card shadow">
                    <BookCard />
                </div>
                <div className="item mx-4 mb-3 card shadow">
                    <BookCard />
                </div>
                <div className="item mx-4 mb-3 card shadow">
                    <BookCard />
                </div>
                <div className="item mx-4 mb-3 card shadow">
                    <BookCard />
                </div>
                <div className="item mx-4 mb-3 card shadow">
                    <BookCard />
                </div>
            <BookModal open={open} onClose={() => setOpen(false)}/>
            </div>


        </div>
    )
}

export default BookDisplay