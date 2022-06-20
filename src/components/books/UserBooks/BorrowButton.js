import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserAuthContext } from "../../../contexts/UserAuthContext"

function BorrowButton({ id , BookStocks}) {

    const { user } = useContext(UserAuthContext)
    const [isBorrowed, setIsBorrowed] = useState(0)
    const [hasStock, setHasStock] = useState()

    useEffect(() => {
        const getBorrowedStatus = async () => {
            try {
                if (user) {
                    const res = await axios.get(`user/isborrow/${id}`)
                    const checker = res.data.isBorrowed
                    setIsBorrowed(checker.length)
                }
            } catch (err) {
                console.log('borrowStatus error')
            }
        }

        getBorrowedStatus()

    }, [id])

    useEffect(() => {
        const checkStock = () => {
            setHasStock(BookStocks?.length)
        }

        checkStock()
    }, [BookStocks])


    const handleBorrow = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.post(`user/reservebook/${id}`)
            // console.log(res.data)
            setIsBorrowed(1)
            // console.log('borrowdone')
        } catch (err) {
            console.log("handleBorrow error")
        }

    }

    // console.log(hasStock)
    return (
        <div>
            {isBorrowed ? (
                <button className="btn w-100 btn-secondary">
                    You already have this book
                </button>
            ) : hasStock ? (

                <form onSubmit={handleBorrow}>
                    <button type="submit" className="btn w-100 btn-primary" onSubmit={handleBorrow}>
                        Borrow Now
                    </button>
                </form>
                
            ) : user ? (
                
                <button className="btn w-100 btn-secondary">
                    This book is out of stock
                </button>
                
            ) : (
                <Link to={''} >
                    <button className="btn w-100 btn-danger">
                        You need to be logged in to Borrow
                    </button>
                </Link>
            )}
        </div>
    )
}

export default BorrowButton