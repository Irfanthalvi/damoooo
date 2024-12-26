import React, { useState } from "react";
import { collection, addDoc, doc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../Firebase";
import './Form.css';
import { Navigate } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    institutionType: "",
    institutionId: "",
    role: "", // staff or student
    name: "",
    totalMarks: "1100", // total marks (e.g., 100)
    obtainedMarks: "", // obtained marks by student
    percentage: "", // calculated percentage
  });

  // Handle input changes
  const handleChange = (e) => {
    console.log(e.target.value)
    console.log(e.target.name)
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Calculate percentage
  const calculatePercentage = () => {
    if (formData.totalMarks && formData.obtainedMarks) {
      const percentage = (parseFloat(formData.obtainedMarks) / parseFloat(formData.totalMarks)) * 100;
      setFormData((prevData) => ({
        ...prevData,
        percentage: percentage.toFixed(2), // Round to 2 decimal places
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Use a specific ID for the main collection document
      const docRef = doc(db, "test_collection", "123");

      // Step 2: Add data to the subcollection under the specific document
      await addDoc(collection(docRef, "test_subcollection"), formData);

console.log(formData)
      // Clear the form after submission
      setFormData({
        institutionType: "",
        institutionId: "",
        role: "",
        name: "",
        totalMarks: "",
        obtainedMarks: "",
        percentage: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="institutionType">Institution Type (College/School/Other):</label>
          <input
            type="text"
            id="institutionType"
            name="institutionType"
            // value={formData.institutionType}
            onChange={handleChange}
            placeholder="Enter institution type"
            required
          />
        </div>
        <div>
          <label htmlFor="institutionId">Institution ID (e.g., College ID or Other ID):</label>
          <input
            type="text"
            id="institutionId"
            name="institutionId"
            value={formData.institutionId}
            onChange={handleChange}
            placeholder="Enter institution ID"
            required
          />
        </div>
        {/* <div>
          <label htmlFor="role">Role (Staff or Student):</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Enter role (Staff or Student)"
            required
          />
        </div> */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="test"
            // value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>
        {/* Marks input fields, only for students */}
        {/* {formData.role.toLowerCase() === "student" && ( */}
        <>
          <div>
            <label htmlFor="totalMarks">Total Marks:</label>
            <input
              type="number"
              id="totalMarks"
              name="totalMarks"
              value={formData.totalMarks}
              onChange={handleChange}
              placeholder="Enter total marks"
              required
            />
          </div>
          <div>
            <label htmlFor="obtainedMarks">Obtained Marks:</label>
            <input
              type="number"
              id="obtainedMarks"
              name="obtainedMarks"
              value={formData.obtainedMarks}
              onChange={handleChange}
              placeholder="Enter obtained marks"
              required
            />
          </div>
          <div>
            <button type="button" onClick={calculatePercentage}>
              Calculate Percentage
            </button>
          </div>
          {formData.percentage && (
            <div>
              <label>Percentage: </label>
              <p>{formData.percentage}%</p>
            </div>
          )}
        </>
        {/* )} */}
        <button type="submit" onClick={alert("DATA ADDED SUCCESSFULLY")}>Register</button>
      </form>
    </div>
  );
};

export default Form;
