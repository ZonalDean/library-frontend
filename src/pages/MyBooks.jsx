import axios from "axios"
import { useEffect, useState } from "react"
import MyCard from "../components/books/UserBooks/MyCard"



function MyBooks() {

    //this is temp
    const [book, setBook] = useState()

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`public/book/5`)
                // console.log(res.data.book)
                setBook(res.data.book)
            } catch (err) {
                console.log('fetchBook Error')
            }
        }
        fetchBook()
    }, [])

    
    //

    const [pickups, setPickups] = useState()
    const [returns, setReturns] = useState()

    const [pickupsDisplay, setPickupsDisplay] = useState("flex")
    const [returnsDisplay, setReturnsDisplay] = useState("none")

    // pickup
    useEffect(() => {
        const fetchPickup = async () => {
            try {
                const res = await axios.get(`user/mystock/READY`)
                const result = res.data.myStocks
                setPickups(result)
            } catch (err) {
                console.log('fetchPickup error')
            }
        }
        fetchPickup()
    }, [])

    //return
    useEffect(() => {
        const fetchReturn = async () => {
            try {
                const res = await axios.get(`user/mystock/OUT`)
                const result = res.data.myStocks
                setReturns(result)
            } catch (err) {
                console.log('fetchPickup error')
            }
        }
        fetchReturn()
    }, [])

    const handleClick = (target) => {
        if (target) {
            setPickupsDisplay("flex")
            setReturnsDisplay("none")
        } if (!target) {
            setPickupsDisplay("none")
            setReturnsDisplay("flex")
        }
        console.log('clicked')
    }

    return (
        <div className=" d-flex justify-content-center">
            <div className="col-11">

                <ul className="mt-4 nav nav-tabs justify-content-center" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button onClick={() => handleClick(1)} className="nav-link bg-light mx-1 px-4 active" id="pickup-tab" data-bs-toggle="tab" data-bs-target="#pickup-tab-pane" type="button" role="tab" aria-controls="pickup-tab-pane" aria-selected="true">
                            <i className="fa-solid fa-inbox fs-2"></i>
                            <h3>
                                Ready to Pick Up
                            </h3>
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button onClick={() => handleClick(0)} className="nav-link bg-light mx-1 px-4" id="return-tab" data-bs-toggle="tab" data-bs-target="#return-tab-pane" type="button" role="tab" aria-controls="return-tab-pane" aria-selected="false">
                            <i className="fa-solid fa-rotate-left fs-2"></i>
                            <h3>
                                Need to Return
                            </h3>
                        </button>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active d-flex  flex-column" id="pickup-tab-pane" role="tabpanel" aria-labelledby="pickup-tab" tabindex="0">

                        <div style={{ display: pickupsDisplay }} className="d-flex justify-content-center flex-wrap mybookdisplay">
                            {pickups ? (
                                pickups.map(pickup => (
                                    <MyCard key={pickup.id} {...pickup} />
                                ))
                            ) : (
                                <div>You have no books to pickup</div>
                            )}



                        </div>

                    </div>
                    <div className="tab-pane fade d-flex flex-column" id="return-tab-pane" role="tabpanel" aria-labelledby="return-tab" tabindex="0">
                        <div style={{ display: returnsDisplay }} className="d-flex justify-content-center flex-wrap mybookdisplay">

                            {returns ? (
                                returns.map(bookreturn => (
                                    <MyCard key={bookreturn.id} {...bookreturn} />
                                ))
                            ) : (
                                <div>
                                    <div className="text-center align-self-center">You don't have any books to return</div>
                                </div>
                            )}





                        </div>

                    </div>
                </div>

            </div>
        </div>
    )

}



export default MyBooks