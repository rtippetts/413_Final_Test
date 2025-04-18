import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import EditEntertainerForm from "../components/EditEntertainerForm";
import { Entertainer } from "../types/Entertainer";

const EntertainerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State to hold entertainer data, loading state, edit mode, and errors
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetches a single entertainer from the backend based on the ID
  const fetchEntertainer = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/Entertainers/${id}`
      );
      if (!response.ok) throw new Error("Entertainer not found");
      const data = await response.json();
      setEntertainer(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Load entertainer data when the component mounts or the ID changes
  useEffect(() => {
    if (id && id !== "new") fetchEntertainer();
  }, [id]);

  // Handles deletion of the entertainer with confirmation and redirect
  const handleDelete = async () => {
    if (!entertainer) return;
    const confirm = window.confirm("Are you sure you want to delete this entertainer?");
    if (!confirm) return;

    try {
      const res = await fetch(
        `http://localhost:4000/Entertainers/${entertainer.entertainerID}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Delete failed.");
      navigate("/entertainers"); // Redirect back to list after deletion
    } catch (err) {
      alert((err as Error).message);
    }
  };

  // Called after a successful update to re-fetch and exit editing mode
  const handleUpdateSuccess = async () => {
    setEditing(false);
    await fetchEntertainer(); // Refresh updated data
  };

  // Show loading or error message
  if (loading) return <p>Loading entertainer...</p>;
  if (error || !entertainer) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      {/* Simple nav back to the entertainers list */}
      <nav className="navbar bg-light mb-4">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/entertainers">
            <span className="me-2">&larr;</span>
            Back to Entertainer List
          </Link>
        </div>
      </nav>

      {/* Display heading with stage name */}
      <h2>Details for {entertainer.entStageName}</h2>

      {editing ? (
        // Edit form when editing is enabled
        <EditEntertainerForm
          entertainer={entertainer}
          onSuccess={handleUpdateSuccess}
          onCancel={() => setEditing(false)}
        />
      ) : (
        // Read-only details view
        <div className="border p-4 bg-light rounded">
          <dl className="row">
            {Object.entries(entertainer).map(([key, value]) => (
              <div className="col-md-6 mb-2" key={key}>
                <dt className="fw-bold">
                  {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <button className="btn btn-primary me-2" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EntertainerDetailsPage;
