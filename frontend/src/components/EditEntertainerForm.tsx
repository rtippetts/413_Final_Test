import { useState } from "react";

// Interface representing the full structure of an entertainer
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

// Props required by the edit form: the entertainer to edit, and two callbacks
interface EditEntertainerFormProps {
  entertainer: Entertainer;
  onSuccess: () => void;
  onCancel: () => void;
}

// Form component used to edit an entertainer's information
const EditEntertainerForm = ({
  entertainer,
  onSuccess,
  onCancel,
}: EditEntertainerFormProps) => {
  // Local form state initialized with the provided entertainer object
  const [formData, setFormData] = useState<Entertainer>({ ...entertainer });

  // Handles changes to individual input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submits updated data to the backend API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/Entertainers/UpdateEntertainer/${formData.entertainerID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update entertainer.");
      }

      onSuccess(); // Callback to refresh UI after success
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow bg-light">
      <h3 className="mb-3">Edit Entertainer</h3>

      {/* Dynamically render form inputs for each editable field */}
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

      {/* Submit and Cancel buttons */}
      <div className="mt-3">
        <button type="submit" className="btn btn-primary me-2">
          Update
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditEntertainerForm;
