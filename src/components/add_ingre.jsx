import React, { useEffect, useState } from 'react';
import Layout from './layout2';
import './ingredientinventory.css';

const IngredientInventory = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v2/IngredientInventory");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        // Validate API response structure
        if (!data.Inventory || !Array.isArray(data.Inventory)) {
          throw new Error('Unexpected API response format');
        }
        
        setIngredients(data.Inventory);
        setMessage(data.message);
        setError(null);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
        setIngredients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="loading">Loading inventory...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <Layout>
      <div className="inventory-container">
        <h1>Ingredient Inventory</h1>
       
        {ingredients.length === 0 ? (
          <div className="empty-state">No ingredients found in inventory</div>
        ) : (
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Ingredient Name</th>
                <th>Stock</th>
                <th>Unit</th>
                <th>Expiry Date</th>
                <th>Stock Status</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className={ingredient.LowStockAlert ? 'low-stock' : ''}>
                  <td>{ingredient.IngredientName}</td>
                  <td>{ingredient.RemainingStock}</td>
                  <td>{ingredient.Unit}</td>
                  <td>{formatDate(ingredient.ExpiryDate)}</td>
                  <td>
                    {ingredient.LowStockAlert ? (
                      <span className="alert">Low Stock</span>
                    ) : (
                      <span className="ok">no</span>
                    )}
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

export default IngredientInventory;