import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './layout2';
import './manager.css';

function Body1() {
  const [groupedOrders, setGroupedOrders] = useState({});
  const [expandedOrders, setExpandedOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchActiveOrders = () => {
    fetch("http://localhost:3000/api/v2/activeorders")
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.orders)) {
          const grouped = {};
          data.orders.forEach(order => {
            if (!grouped[order.OrderID]) {
              grouped[order.OrderID] = {
                customerName: order.CustomerName,
                orderStatus: order.OrderStatus,
                items: []
              };
            }
            grouped[order.OrderID].items.push({
              productName: order.ProductName,
              quantity: order.Quantity,
              totalPrice: order.TotalPrice
            });
          });
          setGroupedOrders(grouped);
        } else {
          setGroupedOrders({});
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching active orders:", error);
        setLoading(false);
      });
  };

  const handleSignOut = () => {

    navigate('/');
  };

  useEffect(() => {
    fetchActiveOrders();
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch("http://localhost:3000/api/v2/updateorderstatus", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ OrderID: parseInt(orderId), NewStatus: newStatus })
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const result = await response.json();
      setMessage("Updated successfully");

      if (["Cancelled", "Delivered", "completed","received"].includes(newStatus)) {
        const updatedOrders = { ...groupedOrders };
        delete updatedOrders[orderId];
        setGroupedOrders(updatedOrders);
      } else {
        fetchActiveOrders();
      }

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Layout>
      <div className="header-actions">
      <h1 className="active-orders-heading" style={{ color: "black", marginTop:"20px"}}>Active Orders</h1>
        <button onClick={handleSignOut} className="signout-btn">
          Sign Out
        </button>
      </div>

      {message && <p className="success-message">{message}</p>}

      {loading ? (
        <p className="orders-message">Loading orders...</p>
      ) : Object.keys(groupedOrders).length === 0 ? (
        <p className="orders-message">No active orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th></th>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Order Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedOrders).map(([orderId, order]) => {
              const isExpanded = expandedOrders[orderId];
              return (
                <React.Fragment key={orderId}>
                  <tr>
                    <td>
                      {order.items.length > 1 && (
                        <button
                          onClick={() => toggleExpand(orderId)}
                          className="expand-btn"
                        >
                          {isExpanded ? '▲' : '▼'}
                        </button>
                      )}
                    </td>
                    <td>{orderId}</td>
                    <td>{order.customerName}</td>
                    <td>{order.items[0].productName}</td>
                    <td>{order.items[0].quantity}</td>
                    <td>${order.items[0].totalPrice}</td>
                    <td>{order.orderStatus}</td>
                    <td>
                      <select
                        onChange={(e) => handleStatusChange(orderId, e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>Update Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Received">Received</option>
                        <option value="Cooking">Cooking</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="completed">completed</option>
                      </select>
                    </td>
                  </tr>

                  {isExpanded &&
                    order.items.slice(1).map((item, index) => (
                      <tr key={`${orderId}-extra-${index}`}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>${item.totalPrice}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default Body1;