import { Entertainer } from "../types/Entertainer.ts";

// Base URL pointing to the backend Entertainers API
const API_URL = "https://finalexam-tippetts-backend-eceadzbncngth7bk.eastus-01.azurewebsites.net/Entertainers";

// 🔽 Fetches a list of all entertainers, including booking stats
export const fetchEntertainers = async (): Promise<Entertainer[]> => {
  try {
    const response = await fetch(`${API_URL}/AllEntertainers`);
    if (!response.ok) {
      throw new Error("Failed to fetch entertainers");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching entertainers:", error);
    throw error;
  }
};

// 🔽 Sends a POST request to add a new entertainer to the database
export const addEntertainer = async (
  newEntertainer: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/AddEntertainer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntertainer),
    });

    if (!response.ok) {
      throw new Error("Failed to add entertainer");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding entertainer:", error);
    throw error;
  }
};

// 🔽 Sends a PUT request to update an existing entertainer by ID
export const updateEntertainer = async (
  id: number,
  updatedEntertainer: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEntertainer),
    });

    if (!response.ok) {
      throw new Error("Failed to update entertainer");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating entertainer:", error);
    throw error;
  }
};

// 🔽 Sends a DELETE request to remove an entertainer by ID
export const deleteEntertainer = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete entertainer");
    }
  } catch (error) {
    console.error("Error deleting entertainer:", error);
    throw error;
  }
};

// 🔽 Fetches the details of a single entertainer by ID
export const getEntertainerById = async (
  id: number
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch entertainer");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching entertainer:", error);
    throw error;
  }
};
