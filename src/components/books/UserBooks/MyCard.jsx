import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
moment().format();

function MyCard({Book, returnDate}) {


    // #1 Input of returnDate, and currentDate
    const currentDate = moment()

    // daysUntil positive: overdue
    const getReturnDays = currentDate.diff(returnDate, 'days') 
    // const getReturnDays = 1 

    // setState of return to be number of days, or return
    const [daysUntil, setDaysUntil] = useState()
    const [isOverdueBg, setIsOverdueBg] = useState('')
    const [isOverdueText, setIsOverdueText] = useState('')

    // Change text
    useEffect(() => {
        if (getReturnDays < 0) {
            const result = `Return in ${getReturnDays*-1} days`;
            setDaysUntil(result)
        } if (!getReturnDays) {
            const result = "Return today"
            setDaysUntil(result)
        } if (getReturnDays > 0) {
            const result = "Overdue!"
            setDaysUntil(result)
            setIsOverdueBg("red")
            setIsOverdueText("white")
        }
    }, [])
    
    
    return (
        <div className="card shadow mt-3 mx-2 py-3 col-2 mybook" style={{backgroundColor: isOverdueBg, color: isOverdueText}}>
            <div className="container d-flex justify-content-center flex-column" >
                <h5 className="mb-1 fw-bold">
                    {Book.name}
                </h5>
                <h6 className="mb-1">
                    By: {Book.authorName}
                </h6>
                <hr className="my-1 mb-2" />
                <div className="" style={{ backgroundImage: `url(${Book.coverPhoto})`, height: "16em", backgroundSize: 'contain', backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}></div>
                {  
                

                }
                <h6 className='mt-3 text-center'>
                    {daysUntil}
                </h6>
            </div>
        </div>
    )
}

export default MyCard