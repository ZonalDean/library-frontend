import moment from "moment"
import { useEffect, useState } from "react";
moment().format();

function StockInfo({ Book, User, returnDate, id , status}) {
    // console.log(Book)

    // #1 Input of returnDate, and currentDate
    const currentDate = moment()

    // daysUntil positive: overdue
    const getReturnDays = currentDate.diff(returnDate, 'days')

    // setState for ovderdue
    const [daysUntil, setDaysUntil] = useState()
    const [lateFee, setLateFee] = useState()
    const [isOverdueColor, setIsOverdueColor] = useState('')
    const [reserved, isReserved] = useState()

    const fee = -50

    // Change text
    useEffect(() => {
        console.log(status)
        if (status === 'RESERVED') {
            const result = "Needs to be ready for return date"
            setDaysUntil(result)
        } else if (getReturnDays < 0) {
            const result = `Return in ${getReturnDays * -1} days`;
            setDaysUntil(result)
        } else if (!getReturnDays) {
            const result = "Return today"
            setDaysUntil(result)
        } else if (getReturnDays > 0) {
            const result = "Overdue!"
            setLateFee(getReturnDays*fee)
            setDaysUntil(result)
            setIsOverdueColor("red")
        }
    }, [])
    return (
        <div>

            <div> <span className="fw-bold"> Stock ID:</span> {id}</div>
            <div> <span className="fw-bold"> Book:</span> {Book.name}</div>
            <div> <span className="fw-bold"> User:</span> {User.firstName} {User.lastName}</div>
            <div style={{color: isOverdueColor}}>{daysUntil}</div>
            {lateFee ? (
                <div style={{color: isOverdueColor}}>Late Fee: {lateFee}THB</div>
            ) : (
            <div>Not Overdue</div>
            )}


        </div>
    )
}

export default StockInfo