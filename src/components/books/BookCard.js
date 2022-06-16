import { useEffect, useState } from "react"

function BookCard({coverPhoto, BookStocks}) {
    
    const [hasStock, setHasStock] = useState()
    useEffect(() => {
        
        const checkStatus = () => {
            // setHasStock(BookStocks.length)
            setHasStock(BookStocks.length)
            // console.log(hasStock)
        }
        
        checkStatus()
    }, [])
    return (
        // <div className="">

        <div className="mx-4 mb-3 card shadow">
            <div className="container" style={{ height: "30vh", width: "10vw" }} >
                <div className="d-flex align-items-centre flex-column">
                    <div
                        className="mt-2"
                        style={{ backgroundImage: `url(${coverPhoto})`, height: "20vh", backgroundSize: 'contain', backgroundRepeat: "no-repeat", backgroundPosition: "center center" }} />
                    { hasStock ? (
                        <button className="btn btn-primary my-3" >Available</button>
                    ) : (
                        <button className="btn btn-secondary my-3" >Unavailable</button>
                    )}
                    
                </div>


            </div>
        </div>


        // </div>


    )
}

export default BookCard
/*
        <div className="card col-2">
            <img className="card-image-top" src="https://prodimage.images-bn.com/pimages/9780425266540_p0_v6_s550x406.jpg" />
            <div className="card-body">
                <button className="btn btn-primary col" style={{marigin: "auto"}}>
                    Borrow
                </button>
            </div>
        </div>
*/