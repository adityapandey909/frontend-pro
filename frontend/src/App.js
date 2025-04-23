// frontend/src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNo: '',
    email: '',
    password: '',
    dob: '',
    gender: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmail = (e) => {
    const uppercaseEmail = e.target.value.toUpperCase();
    setFormData(prev => ({
      ...prev,
      email: uppercaseEmail
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    const emailPattern = /^[^\s@]+@[^\s@]+\.(com|in)$/;
    const lowerCaseEmail = formData.email.toLowerCase();
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

    if (!emailPattern.test(lowerCaseEmail)) {
      alert("Email must contain '@' and end with .com or .in");
      return;
    }




    if (lowerCaseEmail.includes("@yahoo.com")) {
      alert("Yahoo emails are not allowed!");
      return;
    }

    if (!passwordPattern.test(formData.password)) {
      alert("Password must have at least one uppercase, one lowercase, one special character and minimum 6 characters.");
      return;
    }

    const response = await fetch('http://localhost:5000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message);
  };

  return (
    <>
      <div><h1 className='outerClass'>Welcome</h1></div>
      <br />
      <div className="container" style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
        <h2>Fill this Form</h2>
        <form onSubmit={handleSubmit}>
          <p>Full Name</p>
          <input
            type="text"
            name="fullName"
            placeholder="Type your Name..."
            required
            maxLength="20"
            value={formData.fullName}
            onChange={handleChange}
          />

          <p>Your Contact No</p>
          <input
            type="tel"
            name="contactNo"
            placeholder="Type your Number..."
            required
            maxLength="10"
            value={formData.contactNo}
            onChange={handleChange}
          />

          <p>Date of Birth</p>
          <input
            className='doB'
            type="date"
            name="dob"
            required
            value={formData.dob}
            onChange={handleChange}
          />

          <p>Email ID</p>
          <input
            type="email"
            name="email"
            placeholder="TYPE@EMAIL.COM"
            required
            maxLength="30"
            value={formData.email}
            onChange={handleEmail}
          />

          <p>Password</p>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="New password"
              required
              maxLength="30"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <p>Gender</p>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            /> Male
          </label>
          <label style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            /> Female
          </label>

          <br /><br />
          <button type="submit">Submit Now</button>
        </form>
      </div>
    </>
  );
}

export default App;