import axios from "axios"
import { useEffect, useState } from "react"

function BorrowButton({ id }) {

    const [isBorrowed, setIsBorrowed] = useState(0)

    const [trigger, setTrigger] = useState()

    useEffect(() => {
        const getBorrowedStatus = async () => {
            try {
                const res = await axios.get(`user/isborrow/${id}`)
                const checker = res.data.isBorrowed
                console.log(id)
                setIsBorrowed(checker.length)
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
            console.log(res.data)
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
            ) : (
                <form onSubmit={handleBorrow}>
                    <button type="submit" className="btn w-100 btn-primary" onSubmit={handleBorrow}>
                        Borrow Now
                    </button>
                </form>
            )}
        </div>
    )
}

export default BorrowButton