import React, { useEffect, useState } from 'react';
import Layout from './layout2';
import './inventary.css';

function Inventary() {
  const [inventory, setInventory] = useState([]);
  const [showInventory, setShowInventory] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/api/v2/productinventory")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.Inventory)) {
          setInventory(data.Inventory);
        }
      })
      .catch((err) => console.error("Failed to fetch inventory:", err));
  }, []);

  const toggleInventory = () => {
    setShowInventory(prev => !prev);
  };

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Layout>
      <h1 className="inventory-heading">
        <button onClick={toggleInventory} className="title-arrow">
          {showInventory ? '▲' : '▼'}
        </button>{" "}
        Inventory
      </h1>

      {showInventory && (
        <table className="inventory-table">
          <thead>
            <tr>
              <th></th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              const isExpanded = expandedItems[item.id];
              return (
                <React.Fragment key={item.id}>
                  <tr>
                    <td>
                      <button className="arrow-btn" onClick={() => toggleItem(item.id)}>
                        {isExpanded ? "▲" : "▼"}
                      </button>
                    </td>
                    <td>{item.item_name}</td>
                    <td>{item.quantity}</td>
                    <td>Rs {item.current_price}</td>
                  </tr>
                  {isExpanded && (
                    <tr className="expanded-row">
                      <td colSpan="4">
                        <div className="expanded-content">
                          <p><strong>Description:</strong> {item.item_description}</p>
                          <p><strong>Category:</strong> {item.Category}</p>
                          <p><strong>Spice Level:</strong> {item.SpiceLevel}</p>
                          <p><strong>Cooking Time:</strong> {item.CookingTime} minutes</p>
                          <p><strong>Availability:</strong> {item.AvailablityStatus ? "Available" : "Not Available"}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default Inventary;
