import { Outlet } from "react-router-dom";
import BookDisplay from "../components/books/BookDisplay";
import Header from "../components/layout/header/Header";


function HomePage(props) {
    
    return (
        <>
            <Header roleStaff={props.roleStaff} />
            <Outlet />
        </>
    )
}

export default HomePage