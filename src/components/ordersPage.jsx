import React, { useState } from 'react';
import axios from 'axios';
import Layout from './layout2';
import './orders_page.css';

function OrdersPage() {
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDateRange(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:3000/api/v2/by-date-range', {
                params: {
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate
                }
            });
            setOrders(response.data);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="orders-container">
                <h1>Order Management</h1>
                
                {/* Date Range Filter Form */}
                <div className="filter-section">
                    <h2>Filter Orders by Date Range</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Start Date:</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={dateRange.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>End Date:</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={dateRange.endDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Get Orders'}
                        </button>
                    </form>
                </div>

                {/* Error Message */}
                {error && <div className="error-message">{error}</div>}

                {/* Orders List */}
                <div className="orders-list">
                    {orders.length > 0 ? (
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Type</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.OrderID}>
                                        <td>{order.OrderID}</td>
                                        <td>{order.CustomerName || 'Guest'}</td>
                                        <td>{order.OrderType}</td>
                                        <td>{new Date(order.OrderDate).toLocaleString()}</td>
                                        <td>
                                            <span className={`status-badge ${order.OrderStatus.toLowerCase()}`}>
                                                {order.OrderStatus}
                                            </span>
                                        </td>
                                        <td>
                                            {order.Rating ? (
                                                <div className="rating-stars">
                                                    {'★'.repeat(order.Rating)}
                                                    {'☆'.repeat(5 - order.Rating)}
                                                </div>
                                            ) : 'No rating'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        !loading && <p className="no-orders">No orders found for the selected date range</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default OrdersPage;