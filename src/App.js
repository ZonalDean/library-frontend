import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from './pages/HomePage'
import { Navigate, Route, Routes } from 'react-router-dom';
import MyBooks from './pages/MyBooks';

import { UserAuthContext } from './contexts/UserAuthContext'
import { useContext, useEffect, useState } from 'react';
import SplashPage from './pages/SplashPage';
import ReturnBooks from './pages/ReturnBooks';
import PickupBooks from './pages/PickupBooks';
import SearchBooks from './pages/SearchBook';
import StaffHome from './pages/staff/StaffHome';
import StaffLogin from './components/staff/auth/StaffLogin';
import StaffSearchBooks from './pages/staff/StaffSearchBooks';
import Update from './pages/staff/Update';
import NewBook from './pages/staff/NewBook';

function App() {
  const { user } = useContext(UserAuthContext)
  const [roleUser, setRoleUser] = useState(false)
  const [roleStaff, setRoleStaff] = useState(false)
  useEffect(() => {
    if (user) {
      if (user.isStaff) {
        setRoleStaff(true)
      } if (user.isUser) {
        setRoleUser(true)
      }

    }
  }, [user])

  // console.log(roleUser)
  console.log(roleStaff)
  // console.log(user)
  return (
    <Routes>
      {roleUser ? (
        <>
          <Route path="/" element={<HomePage />}>
            <Route path="" element={<SplashPage />} />
            <Route path="myreturn" element={<ReturnBooks />} />
            <Route path="mypickup" element={<PickupBooks />} />
            <Route path="mybooks" element={<MyBooks />} />
            <Route path="booksearch/:search/:tag" element={<SearchBooks />} />
          </Route>
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </>
      )
        : roleStaff ? (
          <>
            <Route path="/" element={<HomePage roleStaff={roleStaff}/>}>
              <Route path="" element={<StaffHome />} />
              <Route path="book/update/:id" element={<Update />} />
              <Route path="booksearch/:search/:tag" element={<StaffSearchBooks />} />
              <Route path="newbook" element={<NewBook />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) :
          (
            <>
              <Route path="/" element={<HomePage />}>
                <Route path="" element={<SplashPage />} />
                <Route path="stafflogin" element={<StaffLogin />} />
                <Route path="booksearch/:search/:tag" element={<SearchBooks />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}


    </Routes>
  );
}

export default App;
