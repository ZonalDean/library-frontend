import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from './pages/HomePage'
import MyBooks from './components/books/UserBooks/MyBooks'
import { Navigate, Route, Routes } from 'react-router-dom';

import { UserAuthContext } from './contexts/UserAuthContext'
import { useContext, useEffect } from 'react';
import SplashPage from './pages/SplashPage';



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
