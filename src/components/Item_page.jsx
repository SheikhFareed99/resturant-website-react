import React, { useState } from 'react';
import axios from 'axios';
import Layout from './layout2';
import './item_page.css';

function ItemPage() {
  const [addProduct, setAddProduct] = useState({
    ItemName: '',
    Category: '',
    SpiceLevel: '',
    CookingTime: '',
    CurrentPrice: '',
    AvailabilityStatus: 0,
    ItemDescription: '',
    Image: '',
    Quantity: ''
  });

  const [removeProduct, setRemoveProduct] = useState({
    productId: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewError, setViewError] = useState(null);

  // ... (previous handlers remain the same)

  const handleViewProducts = async (e) => {
    e.preventDefault();
    setViewLoading(true);
    setViewError(null);

    try {
      const response = await axios.get('http://localhost:3000/api/v2/menu');
      console.log('Menu items fetched:', response.data);
      setMenuItems(response.data.Menu || []);
    } catch (err) {
      console.error('Error fetching menu items:', err);
      setViewError(err.response?.data?.message || err.message);
    } finally {
      setViewLoading(false);
    }
  };
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRemoveInputChange = (e) => {
    setRemoveProduct({
      productId: e.target.value
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
   
      const productData = {
        ItemName: addProduct.ItemName,
        Category: addProduct.Category,
        SpiceLevel: addProduct.SpiceLevel,
        CookingTime: parseInt(addProduct.CookingTime),
        CurrentPrice: parseInt(addProduct.CurrentPrice),
        AvailabilityStatus: parseInt(addProduct.AvailabilityStatus),
        ItemDescription: addProduct.ItemDescription,
        Image: addProduct.Image,
        Quantity: parseInt(addProduct.Quantity)
      };

      const response = await axios.post('http://localhost:3000/api/v2/addproduct', productData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Product added:', response.data);
      alert(response.data.message || 'Product added successfully!');
      
      // Reset form
      setAddProduct({
        ItemName: '',
        Category: '',
        SpiceLevel: '',
        CookingTime: '',
        CurrentPrice: '',
        AvailabilityStatus: 0,
        ItemDescription: '',
        Image: '',
        Quantity: ''
      });
    } catch (err) {
      console.error('Error adding product:', err);
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      alert('Failed to add product: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!removeProduct.productId) {
        throw new Error('Product ID is required');
      }

      const response = await axios.delete(`http://localhost:3000/api/v2/removemenuitem/${removeProduct.productId}`);

      console.log('Product removed:', response.data);
      alert(response.data.message || `Product with ID ${removeProduct.productId} removed successfully!`);
      
      // Reset form    
      setRemoveProduct({
        productId: ''
      });
    } catch (err) {
      console.error('Error removing product:', err);
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      alert('Failed to remove product: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="item-page-container">
      <h1 style={{ color: 'black' }}>Product Management</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        {/* Add Product Section */}
        <div className="form-section">
          <h2 style={{ color: '' }}>Add New Product:</h2>
          <form onSubmit={handleAddSubmit} className="product-form">
            <div className="form-group">
              <label>Item Name:</label>
              <input
                type="text"
                name="ItemName"
                value={addProduct.ItemName}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                name="Category"
                value={addProduct.Category}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Spice Level:</label>
              <select
                name="SpiceLevel"
                value={addProduct.SpiceLevel}
                onChange={handleAddInputChange}
                required
              >
                <option value="">Select Spice Level</option>
                <option value="Mild">Mild</option>
                <option value="Medium">Medium</option>
                <option value="Hot">Hot</option>
                <option value="Extra Hot">Extra Hot</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Cooking Time (minutes):</label>
              <input
                type="number"
                name="CookingTime"
                value={addProduct.CookingTime}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Current Price:</label>
              <input
                type="number"
                name="CurrentPrice"
                value={addProduct.CurrentPrice}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Availability Status:</label>
              <select
                name="AvailabilityStatus"
                value={addProduct.AvailabilityStatus}
                onChange={handleAddInputChange}
                required
              >
                <option value="0">Not Available</option>
                <option value="1">Available</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Item Description:</label>
              <textarea
                name="ItemDescription"
                value={addProduct.ItemDescription}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                name="Image"
                value={addProduct.Image}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="number"
                name="Quantity"
                value={addProduct.Quantity}
                onChange={handleAddInputChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              { 'Add Product'}
            </button>
          </form>
        </div>
        
        {/* Remove Product Section */}
        <div className="form-section">
          <h2>Remove Product</h2>
          <form onSubmit={handleRemoveSubmit} className="product-form">
            <div className="form-group">
              <label>Product ID:</label>
              <input
                type="text"
                name="productId"
                value={removeProduct.productId}
                onChange={handleRemoveInputChange}
                required
              />
            </div>
            
            <button type="submit" className="submit-btn remove-btn">
              Remove Product
            </button>
          </form>
        </div>

  {/* View Products Section */}
  <div className="form-section">
          <h2>View Products</h2>
          <form onSubmit={handleViewProducts}>
            <button 
              type="submit" 
              className="submit-btn view-btn"
              disabled={viewLoading}
            >
              {viewLoading ? 'Loading...' : 'View Products'}
            </button>
          </form>

{/* Products Display */}
{menuItems.length > 0 && (
  <div className="products-container">
    {menuItems.map((item) => (
      <div key={item.ProductName} className="product-summary">
        <div className="product-img">
          <img 
            src={item.ImagePath} 
            alt={item.ProductName}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150';
            }}
          />
        </div>
        <div className="product-details">
          <div className='product-title'>
            <h3 className="product-name">{item.ProductName}</h3>
          </div>
          <p className="product-description">{item.Description}</p>
          <p className="product-delivery"> <span>productid: {item.productid}</span></p>
          <p className="product-price">Rs: {item.Price}</p>
   
          <div className="product-meta">
            <span>Category: {item.Category}</span>
           
            <span>Spice: {item.SpiceLevel}</span>
            <span>Time: {item.CookingTime} mins</span>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

{menuItems.length === 0 && !viewLoading && (
  <p className="no-products">No products available</p>
)}
   </div>
      </div>
    </Layout>
  );
}

export default ItemPage;