import { createContext, useEffect, useState } from "react";
import { getBooksDisplay } from "../api/books";


const BookDisplayContext = createContext()

function BookDisplayContextProvider ({ children }) {
    const [tag, setTag] = useState('')
    
    useEffect(() => {
        const fetchDisplayBooks = async () => {
            try {
                const books = getBooksDisplay(tag)
            } catch (err) {
                console.log('error fetchBooks')
            }
        }

        fetchDisplayBooks();
    }, []);





    return (
        <BookDisplayContext.Provider>
            {children}
        </BookDisplayContext.Provider>
    )
};

export default BookDisplayContextProvider

export { BookDisplayContext }

