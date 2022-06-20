import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserAuthContext } from "../../../contexts/UserAuthContext"

function BorrowButton({ id }) {

    const { user } = useContext(UserAuthContext)
    const [isBorrowed, setIsBorrowed] = useState(0)
    // console.log(user)


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


    return (
        <div>
            {isBorrowed ? (
                <button className="btn w-100 btn-secondary">
                    You already have this book
                </button>
            ) : user ? (
                <form onSubmit={handleBorrow}>
                    <button type="submit" className="btn w-100 btn-primary" onSubmit={handleBorrow}>
                        Borrow Now
                    </button>
                </form>
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