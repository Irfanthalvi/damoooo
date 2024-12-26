import React, { useState } from "react";
import { db } from "../Firebase";
import { collection, doc, getDoc } from "firebase/firestore"; // Import for fetching a specific document
import "./Formget.css"
// Form component to get student/staff details
const Formget = () => {
  const [id, setId] = useState(''); // State to store user input ID
  const [studentData, setStudentData] = useState(null); // State to store fetched data

  // Function to fetch data based on ID
  const myCollegeStd = async () => {
    try {
      if (!id.trim()) {
        alert("Please enter an ID to fetch data.");
        return;
      }

      // Reference to the specific document using the entered ID
      const studentDocRef = doc(db, "students_staff", id); // Fetch data from students_staff collection
      const docSnap = await getDoc(studentDocRef); // Get document snapshot

      if (docSnap.exists()) {
        setStudentData(docSnap.data()); // Store the fetched data in state
        console.log("Student Data:", docSnap.data());
      } else {
        alert(`No data found for ID: ${id}`); // If no data found for the ID
        setStudentData(null); // Reset the state
      }
    } catch (error) {
      console.error("Error fetching student data:", error.message); // Catch any errors
    }
  };

  return (
    <div className="container">
      <h1>College App</h1>
      <form>
        <div className="form-group">
          <label htmlFor="idInput">Enter ID:</label>
          <input
            type="text"
            id="idInput"
            placeholder="Enter Student/Staff ID"
            value={id}
            onChange={(e) => setId(e.target.value)} // Update ID state as user types
          />
        </div>

        <button type="button" onClick={myCollegeStd}>Get Data</button>
      </form>

      {/* Display fetched data if available */}
      {studentData && (
        <div className="result">
          <h2>Details for ID: {id}</h2>
          <pre>{JSON.stringify(studentData, null, 2)}</pre> {/* Display data */}
        </div>
      )}
    </div>
  );
};

export default Formget;
