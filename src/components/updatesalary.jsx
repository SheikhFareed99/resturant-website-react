import React, { useState } from 'react';
import Layout from './layout2';
import './UpdateSalary.css';

function UpdateSalary() {
  const [employeeID, setEmployeeID] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    setMessage('');
    setError('');

    if (!employeeID || !newSalary) {
      setError("Please enter both Employee ID and New Salary.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v2/updateSalary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          EmployeeID: parseInt(employeeID),
          NewSalary: parseInt(newSalary)
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Salary updated successfully.");
        setEmployeeID('');
        setNewSalary('');
      } else {
        setError(data.error || "Failed to update salary.");
      }
    } catch (err) {
      setError("Server error occurred.");
    }
  };

  return (
    <Layout>
      <div className="update-salary-container">
        <h2>Update Employee Salary</h2>

        <input
          type="number"
          placeholder="Employee ID"
          value={employeeID}
          onChange={(e) => setEmployeeID(e.target.value)}
        />

        <input
          type="number"
          placeholder="New Salary"
          value={newSalary}
          onChange={(e) => setNewSalary(e.target.value)}
        />

        <button onClick={handleUpdate}>Update Salary</button>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </Layout>
  );
}

export default UpdateSalary;
