import React, { useState, useEffect } from "react";
import "../FormStyles.css"; // Import a CSS file for styling

// Import country-state-district data
import countryData from "/src/data/countryData.json";
import Gps from "@/components/Gps";

const ReceiverForm = () => {
  const [receiver, setReceiver] = useState({
    fullName: "",
    age: "",
    bloodType: "",
    country: "",
    state: "",
    district: "",
    contactNumber: "",
    reasonForRequest: "",
    prescription: null, // Added prescription field
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Handle input field changes
  const handleChange = (e) => {
    if (e.target.name === "prescription") {
      setReceiver({ ...receiver, prescription: e.target.files[0] });
    } else {
      setReceiver({ ...receiver, [e.target.name]: e.target.value });
    }
  };

  // Update states when a country is selected
  useEffect(() => {
    if (receiver.country) {
      const selectedCountry = countryData.find((c) => c.name === receiver.country);
      setStates(selectedCountry ? selectedCountry.states : []);
      setReceiver((prev) => ({ ...prev, state: "", district: "" })); // Reset state & district
    } else {
      setStates([]);
      setDistricts([]);
    }
  }, [receiver.country]);

  // Update districts when a state is selected
  useEffect(() => {
    if (receiver.state) {
      const selectedState = states.find((s) => s.name === receiver.state);
      setDistricts(selectedState ? selectedState.districts : []);
      setReceiver((prev) => ({ ...prev, district: "" })); // Reset district
    } else {
      setDistricts([]);
    }
  }, [receiver.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Receiver Details:", receiver);
    
    // Check if a file is uploaded
    if (receiver.prescription) {
      console.log("Uploaded Prescription:", receiver.prescription.name);
    } else {
      alert("Please upload a doctor's prescription.");
      return;
    }

    alert("Receiver request submitted successfully!");
  };

  return (
    <div className="form-container">
      <h2>Blood Receiver Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={receiver.fullName} onChange={handleChange} required />

        <label>Age:</label>
        <input type="number" name="age" value={receiver.age} onChange={handleChange} required />

        <label>Blood Type:</label>
        <select name="bloodType" value={receiver.bloodType} onChange={handleChange} required>
          <option value="">Select</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Country Dropdown */}
        <label>Country:</label>
        <select name="country" value={receiver.country} onChange={handleChange} required>
          <option value="">Select</option>
          {countryData.map((country, index) => (
            <option key={index} value={country.name}>{country.name}</option>
          ))}
        </select>

        {/* State Dropdown */}
        <label>State:</label>
        <select name="state" value={receiver.state} onChange={handleChange} required disabled={!receiver.country}>
          <option value="">Select</option>
          {states.map((state, index) => (
            <option key={index} value={state.name}>{state.name}</option>
          ))}
        </select>

        {/* District Dropdown */}
        <label>District:</label>
        <select name="district" value={receiver.district} onChange={handleChange} required disabled={!receiver.state}>
          <option value="">Select</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>{district}</option>
          ))}
        </select>

        <label>Contact Number:</label>
        <input type="text" name="contactNumber" value={receiver.contactNumber} onChange={handleChange} required />

        <label>Reason for Blood Request:</label>
        <textarea name="reasonForRequest" value={receiver.reasonForRequest} onChange={handleChange} required></textarea>

        {/* File Upload for Prescription */}
        <label>Doctor's Prescription (PDF or Image):</label>
        <input type="file" name="prescription" accept=".pdf, .jpg, .jpeg, .png" onChange={handleChange} required />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default ReceiverForm;
