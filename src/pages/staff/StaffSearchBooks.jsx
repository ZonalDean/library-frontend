import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import StaffBookCard from "../../components/staff/StaffBookCard"

function StaffSearchBooks() {

    const [books, setBooks] = useState()
    const [search, setSearch] = useState()
    const [tag, setTag] = useState('all')

    const location = useLocation()


    // for getting params
    useEffect(() => {
        const path = location.pathname
        const pathArr = path.split('/')
        const rawTag = pathArr[3]
        const splitTag = rawTag.split('%20')
        const parsedTag = splitTag.join(' ')
        setSearch(pathArr[2])
        setTag(parsedTag)
    }, [])

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // console.log(tag)
                const res = await axios.get(`staff/booksearch/${search}/${tag}`)
                setBooks(res.data.foundBooks)
            } catch (err) {
                console.log('fetchBooks error')
            }

        }

        fetchBooks()
    }, [search, tag])

    return (
        <div>
            <div className="d-flex flex-wrap mt-2 justify-content-center">
                {books ? (
                    books.map(book => (
                        <StaffBookCard key={book.id} {...book} />
                    ))
                ) : (
                    <div></div>
                )
                }
            </div>

        </div>
    )
}

export default StaffSearchBooks