import BookDisplay from "../components/books/BookDisplay";
import Header from "../components/layout/header/Header";


function HomePage() {
    return (
        <>
            <Header />
            <BookDisplay name="Sci-Fi"/>
            <BookDisplay name="Drama"/>
            
        </>
    )
}

export default HomePage