import BookDisplay from "../components/books/BookDisplay";


function SplashPage() {
    
    return (
        <div>
            {/* <BookDisplayNew name="Sci-Fi"/> */}
            <BookDisplay name="Sci-Fi"/>
            <BookDisplay name="Politics"/>
        </div>
    )
}

export default SplashPage