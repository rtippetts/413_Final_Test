import { useState } from "react";

// Defines the structure of the Entertainer data model
interface Entertainer {
  entertainerID: number;
  entStageName: string;
  entSSN: string;
  entStreetAddress: string;
  entCity: string;
  entState: string;
  entZipCode: string;
  entPhoneNumber: string;
  entWebPage: string;
  entEmailAddress: string;
  dateEntered: string;
}

// Props for the form component, includes success and cancel callbacks
interface NewEntertainerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

// Component to create a new entertainer entry
const NewEntertainerForm = ({ onSuccess, onCancel }: NewEntertainerFormProps) => {
  // Form state initialized with blank/default values
  const [formData, setFormData] = useState<Entertainer>({
    entertainerID: 0,
    entStageName: '',
    entSSN: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEmailAddress: '',
    dateEntered: new Date().toISOString().split("T")[0], // default to today's date
  });

  // Updates form state when user types into an input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submits the form data to the backend to create a new entertainer
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/Entertainers/AddEntertainer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add entertainer.");
      }

      onSuccess(); // Trigger parent-side success callback
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow bg-light">
      <h3 className="mb-3">Add New Entertainer</h3>

      {/* Render an input for each field except the ID */}
      {Object.entries(formData).map(([key, value]) => (
        key !== "entertainerID" && (
          <div className="mb-2" key={key}>
            <label className="form-label text-capitalize">
              {key.replace(/([a-z])([A-Z])/g, "$1 $2")}:
            </label>
            <input
              type="text"
              className="form-control"
              name={key}
              value={value}
              onChange={handleChange}
            />
          </div>
        )
      ))}

      {/* Form submission and cancellation controls */}
      <div className="mt-3">
        <button type="submit" className="btn btn-success me-2">Add</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default NewEntertainerForm;
