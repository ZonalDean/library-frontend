import axios from "axios"
import { useEffect, useState } from "react"
import StockInfo from "../../components/staff/stocks/StockInfo"

function StaffHome() {

    const [reserved, setReserved] = useState()
    const [pickup, setPickup] = useState()
    const [out, setOut] = useState()
    const [trigger, setTrigger] = useState(false)

    // Update stock status
    const updateStock = async (e, id) => {
        try {
            await axios.patch(`staff/stock/${id}`)
            // console.log(e, id)
            e.preventDefault()
            setTrigger(trigger ? false : true)
        } catch (err) {
            console.log('updateStock error')
        }
    }

    // fetchStocks
    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const res = await axios.get(`staff/allstock/:status`)
                setOut(res.data.stocks.out)
                setReserved(res.data.stocks.reserved)
                setPickup(res.data.stocks.ready)
                if (out.length == 0) {
                    setOut()
                } if (reserved.length === 0) {
                    setReserved()
                } if (pickup.length === 0) {
                    setPickup()
                }
            } catch (err) {
                console.log("fetchStocks error")
            }
        }

        fetchStocks()
    }, [trigger])

    // console.log(reserved)
    return (
        <div>
            <div>
                <div className=" d-flex justify-content-center">
                    <div className="col-4 mt-3 ">
                        <div className="card shadow m-3">
                            <div className="d-flex flex-column m-3">
                                <h1 className="text-center mb-1">Reserved</h1>
                                <hr />
                                {reserved ? (
                                    (reserved.map(stock => (
                                        <div className=" d-flex bg-light rounded shadow my-2">
                                            <div className="col-4 my-2"
                                                style={{
                                                    backgroundImage: `url(${stock.Book.coverPhoto})`,
                                                    backgroundSize: 'contain',
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "center center",
                                                }}>

                                            </div>
                                            <div className="col-8">
                                                <div className="d-flex flex-column my-2 me-2">
                                                    <StockInfo {...stock}  />

                                                    <button
                                                        className="btn btn-primary"
                                                        type="button"
                                                        onClick={e => updateStock(e, stock.id)}
                                                    >
                                                        Prepare Book <i className="fa-solid fa-box"></i>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    )))
                                ) : (
                                    <div>
                                        No books have been reserved
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-4 mt-3 ">
                        <div className="card shadow m-3">
                            <div className="d-flex flex-column m-3">
                                <h1 className="text-center mb-1">Ready to Pickup</h1>
                                <hr />
                                {pickup ? (
                                    (pickup.map(stock => (
                                        <div className=" d-flex bg-light rounded shadow my-2">
                                            <div className="col-4 my-2"
                                                style={{
                                                    backgroundImage: `url(${stock.Book.coverPhoto})`,
                                                    backgroundSize: 'contain',
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "center center",
                                                }}>

                                            </div>
                                            <div className="col-8">
                                                <div className="d-flex flex-column my-2 me-2">
                                                    <StockInfo {...stock}  />

                                                    <button
                                                        className="btn btn-secondary"
                                                        type="button"
                                                        onClick={e => updateStock(e, stock.id)}
                                                    >
                                                        Pickup Book <i className="fa-solid fa-right-from-bracket"></i>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    )))
                                ) : (
                                    <div>
                                        No books are ready to be picked-up
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-4 mt-3 ">
                        <div className="card shadow m-3">
                            <div className="d-flex flex-column m-3">
                                <h1 className="text-center mb-1">Out of Library</h1>
                                <hr />
                                {out ? (
                                    (out.map(stock => (
                                        <div className=" d-flex bg-light rounded shadow my-2">
                                            <div className="col-4 my-2"
                                                style={{
                                                    backgroundImage: `url(${stock.Book.coverPhoto})`,
                                                    backgroundSize: 'contain',
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "center center",
                                                }}>

                                            </div>
                                            <div className="col-8">
                                                <div className="d-flex flex-column my-2 me-2">
                                                    <StockInfo {...stock}  />

                                                    <button
                                                        className="btn btn-warning"
                                                        type="button"
                                                        onClick={e => updateStock(e, stock.id)}
                                                    >
                                                        Return Book <i className="fa-solid fa-rotate-left"></i>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    )))
                                ) : (
                                    <div>
                                        All book stocks are in the library
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default StaffHome