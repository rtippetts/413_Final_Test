import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewEntertainerForm from "../components/NewEntertainerForm";
import { Link } from "react-router-dom";

// Defines the shape of entertainer summary used in the table
interface EntertainerSummary {
  entertainerID: number;
  entStageName: string;
  bookingCount: number;
  lastBookingDate: string | null;
}

const EntertainersPage = () => {
  // State for loading data, error handling, data list, and toggling the form
  const [entertainers, setEntertainers] = useState<EntertainerSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  // Fetches entertainer summaries from the backend API
  const fetchEntertainers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://finalexam-tippetts-backend-eceadzbncngth7bk.eastus-01.azurewebsites.net/Entertainers/AllEntertainers");
      const data = await response.json();
      setEntertainers(data);
    } catch (err) {
      setError("Failed to load entertainers.");
    } finally {
      setLoading(false);
    }
  };

  // Loads data once when the component mounts
  useEffect(() => {
    fetchEntertainers();
  }, []);

  // Render loading or error messages if applicable
  if (loading) return <p>Loading entertainers...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      {/* Header navigation back to homepage */}
      <nav className="navbar bg-light mb-4">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span className="me-2">&larr;</span>
            Return to Homepage
          </Link>
        </div>
      </nav>

      {/* Page heading */}
      <h2>Entertainers</h2>

      {/* Table displaying entertainer summaries */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Stage Name</th>
            <th>Booking Count</th>
            <th>Last Booking Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entertainers.map((e) => (
            <tr key={e.entertainerID}>
              <td>{e.entStageName}</td>
              <td>{e.bookingCount}</td>
              <td>{e.lastBookingDate ?? "N/A"}</td>
              <td>
                {/* Navigate to details page for the selected entertainer */}
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => navigate(`/entertainer/${e.entertainerID}`)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Conditional rendering of Add Entertainer button or form */}
      {!showAddForm ? (
        <div className="text-center mt-4">
          <button
            className="btn btn-success"
            onClick={() => setShowAddForm(true)}
          >
            Add Entertainer
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <NewEntertainerForm
            onSuccess={() => {
              setShowAddForm(false);
              fetchEntertainers(); // Refresh list after adding
            }}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default EntertainersPage;
