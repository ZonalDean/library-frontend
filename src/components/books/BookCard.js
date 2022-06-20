import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserAuthContext } from "../../contexts/UserAuthContext"

function BookCard({coverPhoto, BookStocks, id}) {
    
    const { user } = useContext(UserAuthContext)
    const [hasStock, setHasStock] = useState()
    const [isBorrowed, setIsBorrowed] = useState()

    
    useEffect(() => {
        const getBorrowedStatus = async () => {
            try {
                if (user) {
                    const res = await axios.get(`user/isborrow/${id}`)
                    const checker = res.data.isBorrowed
                    setIsBorrowed(checker.length)
                    console.log(id)
                    // console.log(res.data)
                }
            } catch (err) {
                console.log('borrowStatus error')
            }
        }

        getBorrowedStatus()
    }, [])
    
    useEffect(() => {
        const checkStatus = () => {
            setHasStock(BookStocks.length)
            // console.log(BookStocks)
        }
        
        checkStatus()
    }, [])
    console.log(isBorrowed)
    return (

        <div className="mx-4 mb-3 card shadow">
            <div className="container" style={{ height: "30vh", width: "10vw" }} >
                <div className="d-flex align-items-centre flex-column">
                    <div
                        className="mt-2"
                        style={{ backgroundImage: `url(${coverPhoto})`, height: "20vh", backgroundSize: 'contain', backgroundRepeat: "no-repeat", backgroundPosition: "center center" }} />
                    { isBorrowed ? (
                        <button className="btn btn-secondary my-3" >Reserved</button>
                    ) : hasStock ? (
                        <button className="btn btn-primary my-3" >Available</button>
                    ) : (
                        <button className="btn btn-secondary my-3">Out of Stock</button>
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