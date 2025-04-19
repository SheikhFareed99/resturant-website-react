import React, { useEffect, useState } from 'react';
import Layout from './layout2';
import './ingredientinventory.css';

const IngredientInventory = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    IngredientID: '',
    VendorID: '',
    PurchaseDate: '',
    PurchaseAmount: '',
    PurchaseRate: ''
  });
  const [submissionError, setSubmissionError] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState('');

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/v2/IngredientInventory");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
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

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    setSubmissionSuccess('');
    
    try {
      const response = await fetch('http://localhost:3000/api/v2/addingredientsupply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add supply');
      }

      setSubmissionSuccess('Supply added successfully!');
      setFormData({
        IngredientID: '',
        VendorID: '',
        PurchaseDate: '',
        PurchaseAmount: '',
        PurchaseRate: ''
      });
      await fetchInventory();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionError(error.message);
    }
  };

  const handleIngredientSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    setSubmissionSuccess('');

    try {
      const response = await fetch('http://localhost:3000/api/v2/addingredient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          IngredientName: e.target.IngredientName.value,
          RemainingStock: parseInt(e.target.RemainingStock.value),
          Unit: e.target.Unit.value,
          ExpiryDate: e.target.ExpiryDate.value,
          VendorID: e.target.VendorID.value ? parseInt(e.target.VendorID.value) : null,
          Type: e.target.Type.value,
          LowStockAlert: e.target.LowStockAlert.checked
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add ingredient");
      }

      setSubmissionSuccess("Ingredient added successfully!");
      await fetchInventory();
      e.target.reset();
    } catch (error) {
      setSubmissionError(error.message);
      console.error("Add ingredient error:", error);
    }
  };

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

        <div className="add-ingredient-form">
          <h2>Add New Ingredient</h2>
          <form onSubmit={handleIngredientSubmit}>
            <div className="form-group">
              <label>Ingredient Name:</label>
              <input type="text" name="IngredientName" required />
            </div>

            <div className="form-group">
              <label>Remaining Stock:</label>
              <input type="number" name="RemainingStock" min="0" required />
            </div>

            <div className="form-group">
              <label>Unit:</label>
              <input type="text" name="Unit" required />
            </div>

            <div className="form-group">
              <label>Expiry Date:</label>
              <input type="date" name="ExpiryDate" required />
            </div>

            <div className="form-group">
              <label>Vendor ID:</label>
              <input type="number" name="VendorID" min="1" />
            </div>

            <div className="form-group">
              <label>Type:</label>
              <select name="Type" required>
                <option value="">Select Type</option>
                <option value="Frozen">Frozen</option>
                <option value="Dry">Dry</option>
              </select>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input type="checkbox" name="LowStockAlert" />
                Low Stock Alert
              </label>
            </div>

            {submissionError && <div className="error">{submissionError}</div>}
            {submissionSuccess && <div className="success">{submissionSuccess}</div>}

            <button type="submit" className="submit-button">Add Ingredient</button>
          </form>
        </div>

        <div className="add-supply-form">
          <h2>Add New Supply</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Ingredient:</label>
              <select
                name="IngredientID"
                value={formData.IngredientID}
                onChange={handleFormChange}
                required
              >
                <option value="">Select an Ingredient</option>
                {ingredients.map(ingredient => (
                  <option 
                    key={ingredient.IngredientID} 
                    value={ingredient.IngredientID}
                  >
                    {ingredient.IngredientName} (ID: {ingredient.IngredientID})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Vendor ID:</label>
              <input
                type="number"
                name="VendorID"
                value={formData.VendorID}
                onChange={handleFormChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Purchase Date:</label>
              <input
                type="date"
                name="PurchaseDate"
                value={formData.PurchaseDate}
                onChange={handleFormChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Purchase Amount:</label>
              <input
                type="number"
                name="PurchaseAmount"
                value={formData.PurchaseAmount}
                onChange={handleFormChange}
                min="1"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Purchase Rate:</label>
              <input
                type="number"
                name="PurchaseRate"
                value={formData.PurchaseRate}
                onChange={handleFormChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            
            {submissionError && <div className="error">{submissionError}</div>}
            {submissionSuccess && <div className="success">{submissionSuccess}</div>}
            
            <button type="submit" className="submit-button">
              Add Supply
            </button>
          </form>
        </div>

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
                      <span className="ok">OK</span>
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
