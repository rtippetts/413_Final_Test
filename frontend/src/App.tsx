import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import EntertainersPage from './pages/EntertainersPage';
import EntertainerDetailsPage from './pages/DetailsPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Homepage route */}
          <Route path="/" element={<WelcomePage />} />

          {/* Route for listing all entertainers */}
          <Route path="/entertainers" element={<EntertainersPage />} />

          {/* Route for viewing details of a specific entertainer (by ID) */}
          <Route path="/entertainer/:id" element={<EntertainerDetailsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
