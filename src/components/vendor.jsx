import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './layout2';
import './vendor.css';

function VendorManagement() {
    const [vendors, setVendors] = useState([]);
    const [formData, setFormData] = useState({
        FName: '',
        LName: '',
        CNIC: '',
        Address: '',
        PhoneNo: '',
        Email: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch all vendors
    const fetchVendors = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/v2/seevendor');
            setVendors(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch vendors');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddVendor = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('http://localhost:3000/api/v2/addvendor', formData);
            setSuccess('Vendor added successfully');
            setFormData({
                FName: '',
                LName: '',
                CNIC: '',
                Address: '',
                PhoneNo: '',
                Email: ''
            });
            fetchVendors(); 
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add vendor');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveVendor = async (vendorId) => {
        if (!window.confirm('Are you sure you want to remove this vendor?')) return;
        
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axios.delete(`http://localhost:3000/api/v2/removevendor/${vendorId}`);
            setSuccess('Vendor removed successfully');
            fetchVendors(); 
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to remove vendor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="vendor-management-container">
                <h1>Vendor Management</h1>
                
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                {/* Add Vendor Form */}
                <div className="form-section">
                    <h2>Add New Vendor</h2>
                    <form onSubmit={handleAddVendor} className="vendor-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name:</label>
                                <input
                                    type="text"
                                    name="FName"
                                    value={formData.FName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name:</label>
                                <input
                                    type="text"
                                    name="LName"
                                    value={formData.LName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label>CNIC:</label>
                                <input
                                    type="text"
                                    name="CNIC"
                                    value={formData.CNIC}
                                    onChange={handleInputChange}
                                    required
                                    pattern="[0-9]{13}"
                                    title="13-digit CNIC without dashes"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone No:</label>
                                <input
                                    type="tel"
                                    name="PhoneNo"
                                    value={formData.PhoneNo}
                                    onChange={handleInputChange}
                                    required
                                    pattern="[0-9]{11}"
                                    title="11-digit phone number"
                                />
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Address:</label>
                                <input
                                    type="text"
                                    name="Address"
                                    value={formData.Address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Vendor'}
                        </button>
                    </form>
                </div>

                {/* Vendors List */}
                <div className="vendors-list-section">
                    <h2>Vendors List</h2>
                    {loading && vendors.length === 0 ? (
                        <p>Loading vendors...</p>
                    ) : vendors.length === 0 ? (
                        <p>No vendors found</p>
                    ) : (
                        <table className="vendors-table">
                            <thead>
                                <tr>
                                    <th>Vendor ID</th>
                                    <th>Name</th>
                                    <th>CNIC</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendors.map(vendor => (
                                    <tr key={vendor.VendorID}>
                                        <td>{vendor.VendorID}</td>
                                        <td>{vendor.FName} {vendor.LName}</td>
                                        <td>{vendor.CNIC}</td>
                                        <td>{vendor.PhoneNo}</td>
                                        <td>{vendor.Email}</td>
                                        <td>{vendor.Address}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleRemoveVendor(vendor.VendorID)}
                                                className="remove-btn"
                                                disabled={loading}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default VendorManagement;