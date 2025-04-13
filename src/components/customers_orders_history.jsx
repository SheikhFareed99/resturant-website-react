import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import "./customer_history.css";

const CustomerHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        // Get customer ID - in a real app this would come from auth or params
        const customerId = 1; // TEST WITH KNOWN VALID CUSTOMER ID
        
        console.log("Starting fetch for customer ID:", customerId); // Debug log
        
        const response = await axios.get(
          `http://localhost:3000/api/v2/customerorderhistory/${customerId}`,
          {
            headers: {
              "Content-Type": "application/json",
              // Add authentication header if needed:
              // "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        console.log("API Response:", response); // Debug log
        
        if (response.data) {
          // Handle both array and object responses
          const ordersData = Array.isArray(response.data) 
            ? response.data 
            : response.data.Orders || [];
          
          setOrders(ordersData);
          console.log("Orders data set:", ordersData); // Debug log
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Fetch error details:", err);
        const errorMessage = err.response?.data?.message 
          || err.message 
          || "Failed to fetch order history";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  const getStatusClass = (status) => {
    if (!status) return "status-pending";
    const statusLower = status.toLowerCase();
    if (statusLower.includes("delivered")) return "status-delivered";
    if (statusLower.includes("paid")) return "status-paid";
    if (statusLower.includes("pending")) return "status-pending";
    if (statusLower.includes("cancelled")) return "status-cancelled";
    return "status-pending";
  };

  // Debug render
  console.log("Current state:", { loading, error, orders });

  if (loading) {
    return (
      <Layout>
        <div className="customer-history-container">
          <h1 className="customer-history-header">Order History</h1>
          <div className="customer-history-loading">
            <div className="customer-history-spinner"></div>
            <p>Loading your order history...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="customer-history-container">
          <h1 className="customer-history-header">Order History</h1>
          <div className="customer-history-error">
            <p>Error: {error}</p>
            <p>Please try again later or contact support.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="customer-history-container">
        <h1 className="customer-history-header">Your Order History</h1>
        
        {orders.length === 0 ? (
          <p className="customer-history-empty">
            No orders found for your account.
          </p>
        ) : (
          <table className="customer-history-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.OrderID}>
                  <td>{order.OrderID}</td>
                  <td>{order.OrderType || "N/A"}</td>
                  <td>
                    {order.OrderDate 
                      ? new Date(order.OrderDate).toLocaleDateString() 
                      : "N/A"}
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.OrderStatus)}`}>
                      {order.OrderStatus || "Pending"}
                    </span>
                  </td>
                  <td>
                    {order.TotalAmount 
                      ? `$${order.TotalAmount.toFixed(2)}` 
                      : "N/A"}
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.PaidStatus)}`}>
                      {order.PaidStatus || "Pending"}
                    </span>
                  </td>
                  <td>
                    <button className="details-button">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default CustomerHistory;