import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import MyCard from "../components/books/UserBooks/MyCard"

function ReturnBooks() {

    const [returnBooks, setReturnBooks] = useState()
    const [pickups, setPickups] = useState()
    const [plural, setPlural] = useState()

    useEffect(() => {
        const fetchReturn = async () => {
            try {
                const res = await axios.get(`user/mystock/OUT`)
                const result = res.data.myStocks
                // setReturnBooks(result)
            } catch (err) {
                console.log('fetchPickup error')
            }
        }
        fetchReturn()
    }, [])

    // Check for pickups
    useEffect(() => {
        const fetchPickup = async () => {
            try {
                const res = await axios.get(`user/mystock/READY`)
                const result = res.data.myStocks
                setPickups(result.length+"")
                if (result.length > 1) {
                    setPlural('books')
                } if (result.length = 1) {
                    setPlural('book')
                }
            } catch (err) {
                console.log('fetchPickup error')
            }
        }
        fetchPickup()
    }, [])

    return (

        <div className="d-flex justify-content-center flex-wrap mybookdisplay">

            {returnBooks ? (
                returnBooks.map(book => (
                    <MyCard key={book.id} {...book} />
                ))
            ) : pickups ? (
                <div className="d-flex" style={{height: "50vh"}}>
                    <div className="text-center align-self-center fs-5">You don't have any books to return, but you have {pickups} {plural} to <Link to={`/mypickup`} >pickup</Link></div>
                </div>
            ) : (
                <div className="d-flex" style={{height: "50vh"}}>
                    <div className="text-center align-self-center fs-5">You don't have any books to return or pickup</div>
                </div>
            )}




        </div>
    )
}

export default ReturnBooks