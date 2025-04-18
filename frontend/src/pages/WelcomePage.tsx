import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Landing page component for the Entertainment Agency site
const WelcomePage: React.FC = () => {
  return (
    <div className="container text-center mt-5">
      {/* Page title and description */}
      <h1 className="display-4">Welcome to the Entertainment Agency!</h1>
      <p className="lead">Browse and manage potential entertainers available for booking.</p>
      
      {/* Link to navigate to the entertainers list */}
      <Link to="/entertainers" className="btn btn-primary mt-4">
        View Entertainers
      </Link>
    </div>
  );
};

export default WelcomePage;
