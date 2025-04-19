import React, { useState } from 'react';
import axios from 'axios';
import Layout from './layout2';
import './item_page.css';

function EmployeePage() {
  const [addEmployee, setAddEmployee] = useState({
    Email: '',
    Password: '',
    FName: '',
    LName: '',
    DOB: '',
    Gender: '',
    PhoneNo: '',
    Address: '',
    CNIC: '',
    Salary: '',
    BankAccount: '',
    ManagerID: ''
  });

  const [removeEmployee, setRemoveEmployee] = useState({
    employeeId: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewError, setViewError] = useState(null);

  const handleViewEmployees = async (e) => {
    e.preventDefault();
    setViewLoading(true);
    setViewError(null);

    try {
      const response = await axios.get('http://localhost:3000/api/v2/getAllEmployees');
      console.log('Employees fetched:', response.data);
      setEmployees(response.data.employees || []); // <- FIXED THIS LINE
    } catch (err) {
      console.error('Error fetching employees:', err);
      setViewError(err.response?.data?.message || err.message);
    } finally {
      setViewLoading(false);
    }
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRemoveInputChange = (e) => {
    setRemoveEmployee({
      employeeId: e.target.value
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const employeeData = {
        Email: addEmployee.Email,
        Password: addEmployee.Password,
        FName: addEmployee.FName,
        LName: addEmployee.LName,
        DOB: addEmployee.DOB,
        Gender: addEmployee.Gender,
        PhoneNo: addEmployee.PhoneNo,
        Address: addEmployee.Address,
        CNIC: addEmployee.CNIC,
        Salary: parseFloat(addEmployee.Salary),
        BankAccount: addEmployee.BankAccount,
        ManagerID: addEmployee.ManagerID || null
      };

      const response = await axios.post('http://localhost:3000/api/v2/addemployee', employeeData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Employee added:', response.data);
      alert(response.data.message || 'Employee added successfully!');
      
      // Reset form
      setAddEmployee({
        Email: '',
        Password: '',
        FName: '',
        LName: '',
        DOB: '',
        Gender: '',
        PhoneNo: '',
        Address: '',
        CNIC: '',
        Salary: '',
        BankAccount: '',
        ManagerID: ''
      });
    } catch (err) {
      console.error('Error adding employee:', err);
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      alert('Failed to add employee: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!removeEmployee.employeeId) {
        throw new Error('Employee ID is required');
      }

      const response = await axios.delete(`http://localhost:3000/api/v2/removeEmployee/${removeEmployee.employeeId}`);

      console.log('Employee removed:', response.data);
      alert(response.data.message || `Employee with ID ${removeEmployee.employeeId} removed successfully!`);
      
      // Reset form    
      setRemoveEmployee({
        employeeId: ''
      });
    } catch (err) {
      console.error('Error removing employee:', err);
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      alert('Failed to remove employee: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="item-page-container">
      <h1 style={{ color: 'black' }}>Employee Management</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        {/* Add Employee Section */}
        <div className="form-section">
          <h2>Add New Employee:</h2>
          <form onSubmit={handleAddSubmit} className="product-form">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="Email"
                value={addEmployee.Email}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="Password"
                value={addEmployee.Password}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="FName"
                value={addEmployee.FName}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="LName"
                value={addEmployee.LName}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Date of Birth:</label>
              <input
                type="date"
                name="DOB"
                value={addEmployee.DOB}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Gender:</label>
              <select
                name="Gender"
                value={addEmployee.Gender}
                onChange={handleAddInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                name="PhoneNo"
                value={addEmployee.PhoneNo}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Address:</label>
              <textarea
                name="Address"
                value={addEmployee.Address}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>CNIC:</label>
              <input
                type="text"
                name="CNIC"
                value={addEmployee.CNIC}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Salary:</label>
              <input
                type="number"
                name="Salary"
                value={addEmployee.Salary}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Bank Account:</label>
              <input
                type="text"
                name="BankAccount"
                value={addEmployee.BankAccount}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Manager ID (optional):</label>
              <input
                type="text"
                name="ManagerID"
                value={addEmployee.ManagerID}
                onChange={handleAddInputChange}
              />
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Employee'}
            </button>
          </form>
        </div>
        
        {/* Remove Employee Section */}
        <div className="form-section">
          <h2>Remove Employee</h2>
          <form onSubmit={handleRemoveSubmit} className="product-form">
            <div className="form-group">
              <label>Employee ID:</label>
              <input
                type="text"
                name="employeeId"
                value={removeEmployee.employeeId}
                onChange={handleRemoveInputChange}
                required
              />
            </div>
            
            <button type="submit" className="submit-btn remove-btn">
              Remove Employee
            </button>
          </form>
        </div>

        {/* View Employees Section */}
        <div className="form-section">
          <h2>View Employees</h2>
          <form onSubmit={handleViewEmployees}>
            <button 
              type="submit" 
              className="submit-btn view-btn"
              disabled={viewLoading}
            >
              {viewLoading ? 'Loading...' : 'View Employees'}
            </button>
          </form>

          {/* Employees Display */}
          {employees.length > 0 && (
  <div className="products-container">
    {employees.map((employee) => (
      <div key={employee.EmployeeID} className="product-summary">
        <div className="product-details">
          <div className='product-title'>
            <h3 className="product-name">{employee.FName}</h3>
            <span className="employee-id">ID: {employee.EmployeeID}</span>
          </div>
          <p className="product-description">
            <strong>User ID:</strong> {employee.UserID}<br />
            <strong>CNIC:</strong> {employee.CNIC}<br />
            <strong>Bank Account:</strong> {employee.BankAccount}
          </p>
          <p className="product-price">Salary: Rs {employee.Salary}</p>
    
          <div className="product-meta">
            {employee.ManagerID && (
              <>
                <span>Manager ID: {employee.ManagerID}</span>
                {employee.ManagerName && (
                  <span>Manager Name: {employee.ManagerName}</span>
                )}
              </>
            )}
            {!employee.ManagerID && (
              <span>No Manager Assigned</span>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
)}
        </div>
      </div>
    </Layout>
  );
}

export default EmployeePage;