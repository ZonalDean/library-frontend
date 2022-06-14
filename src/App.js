import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from './pages/HomePage'
import BookCard from './components/books/BookCard';
import BookDisplay from './components/books/BookDisplay';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="" element={<HomePage />}> 
      </Route>
    </Routes>
  );
}

export default App;
