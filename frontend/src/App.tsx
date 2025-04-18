import './App.css';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AdminBooksPage from './pages/AdminBooksPage';
import WelcomePage from './pages/WelcomePage';


function App() {

  
  return (
  <>

  <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/entertainers" element={<AdminBooksPage />} />
      </Routes>
    </Router>

    
  </>
  )
}

export default App
