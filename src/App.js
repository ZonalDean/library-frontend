import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from './pages/HomePage'
import { Navigate, Route, Routes } from 'react-router-dom';
import MyBooks from './pages/MyBooks';

import { UserAuthContext } from './contexts/UserAuthContext'
import { useContext, useEffect } from 'react';
import SplashPage from './pages/SplashPage';
import ReturnBooks from './pages/ReturnBooks';
import PickupBooks from './pages/PickupBooks';


function App() {
  const { user } = useContext(UserAuthContext)
  useEffect(() => {
    // console.log(user)
  }, [user])
  return (
    <Routes>
      {user ? (
        <Route path="/" element={<HomePage />}>
          <Route path="" element={<SplashPage />} />
          <Route path="myreturn" element={<ReturnBooks />} />
          <Route path="mypickup" element={<PickupBooks />} />
          <Route path="mybooks" element={<MyBooks />} />
        </Route>
      ) : (
        <Route path="/" element={<HomePage />}>
          <Route path="" element={<SplashPage />} />
        </Route>
      )}


    </Routes>
  );
}

export default App;
