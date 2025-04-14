import React, { useState } from 'react';
import Layout from './layout2';
import axios from 'axios';
import './wallet.css';

function Wallet() {
    const [formData, setFormData] = useState({
        CustomerID: '',
        Amount: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        
        try {
            const response = await axios.post('http://localhost:3000/api/v2/addmoneytowallet', {
                CustomerID: formData.CustomerID,
                Amount: formData.Amount
            });
            
            setMessage(response.data.message);
            setFormData({ CustomerID: '', Amount: '' });
        } catch (error) {
            setMessage(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="wallet-page">
                <h1>Wallet Management</h1>
                
                <div className="wallet-form-container">
                    <h2>Add Money to Wallet</h2>
                    
                    {message && (
                        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Customer ID:</label>
                            <input
                                type="number"
                                name="CustomerID"
                                value={formData.CustomerID}
                                onChange={handleChange}
                                required
                                min="1"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Amount:</label>
                            <input
                                type="number"
                                name="Amount"
                                value={formData.Amount}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <button type="submit" disabled={loading}>
                            {loading ? 'Processing...' : 'Add Money'}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Wallet;