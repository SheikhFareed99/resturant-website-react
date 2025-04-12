import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !fname || !lname || !dob || !gender || !phoneNo || !address || !role) {
      setError("Please fill in all fields");
      return;
    }

    const formattedDOB = new Date(dob).toISOString().split("T")[0];  // ✅ Convert to YYYY-MM-DD

    try {
      const response = await axios.post("http://localhost:3000/api/v1/register", {
        Email: email,
        PasswordHash: password,
        Role: role,
        FName: fname,
        LName: lname,
        DOB: '1990-01-01',
        Gender: gender,
        PhoneNo: phoneNo.trim(),
        Address: address
      });

      console.log(response.data);
      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("User registration failed. Please try again.");
    }
};


  return (
    <div className="login-container">
      <div className="login-card">
        <div className="brand-header">
          <h1>Grubify</h1>
          <p>Welcome back to your favorite dining experience</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fname">First Name</label>
            <input type="text" id="fname" value={fname} onChange={(e) => setFName(e.target.value)} placeholder="Enter your first name" />
          </div>

          <div className="form-group">
            <label htmlFor="lname">Last Name</label>
            <input type="text" id="lname" value={lname} onChange={(e) => setLName(e.target.value)} placeholder="Enter your last name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" value={dob} onChange={(e) => setDOB(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone No</label>
            <input type="text" id="phone" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} placeholder="Enter your phone number" />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role (Customer or Employee)</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="Customer">Customer</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
          </div>

          <button type="submit" className="login-button">Sign Up</button>
        </form>

        <div className="signup-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
