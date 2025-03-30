import './App.css';
import BookPage from './pages/BookPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PurchasePage from './pages/PurchasePage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {

  
  return (
  <>
  <CartProvider>
  <Router>
      <Routes>
        <Route path="/" element={<BookPage />} />
        <Route path="/purchase/:title/:price/:bookID" element={<PurchasePage />} />
        <Route path="/books" element={<BookPage />}></Route>
        <Route path="/cart" element={<CartPage />} ></Route>
      </Routes>
    </Router>
  </CartProvider>
    
  </>
  )
}

export default App
