import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './layout2';
import './item_page.css';

function ItemPage() {
  // Product states
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

  // Ingredient states
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState({
    IngredientID: '',
    Quantity: ''
  });
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [ingredientError, setIngredientError] = useState(null);

  // Other states
  const [removeProduct, setRemoveProduct] = useState({ productId: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewError, setViewError] = useState(null);
  const [showRecipeSection, setShowRecipeSection] = useState(false);

  // Fetch ingredients on component mount
  useEffect(() => {
    const fetchIngredients = async () => {
      setLoadingIngredients(true);
      setIngredientError(null);
      try {
        const response = await axios.get('http://localhost:3000/api/v2/getAllIngredientNames');
        setIngredients(response.data);
      } catch (err) {
        console.error('Error fetching ingredients:', err);
        setIngredientError(err.response?.data?.error || err.message);
      } finally {
        setLoadingIngredients(false);
      }
    };
    fetchIngredients();
  }, []);

  // Handle product input changes
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddProduct(prev => ({ ...prev, [name]: value }));
  };

  // Handle ingredient selection
  const handleIngredientSelect = (e) => {
    setCurrentIngredient(prev => ({
      ...prev,
      IngredientID: e.target.value
    }));
  };

  // Handle ingredient quantity change
  const handleIngredientQuantityChange = (e) => {
    setCurrentIngredient(prev => ({
      ...prev,
      Quantity: e.target.value
    }));
  };

  // Add ingredient to recipe
  const addIngredientToRecipe = () => {
    if (!currentIngredient.IngredientID || !currentIngredient.Quantity) {
      alert('Please select an ingredient and specify quantity');
      return;
    }

    const existingIndex = selectedIngredients.findIndex(
      ing => ing.IngredientID === currentIngredient.IngredientID
    );

    if (existingIndex >= 0) {
      const updated = [...selectedIngredients];
      updated[existingIndex].Quantity = currentIngredient.Quantity;
      setSelectedIngredients(updated);
    } else {
      const selected = ingredients.find(ing => 
        ing.IngredientID == currentIngredient.IngredientID
      );
      
      setSelectedIngredients(prev => [
        ...prev,
        {
          IngredientID: currentIngredient.IngredientID,
          IngredientName: selected.IngredientName,
          Quantity: currentIngredient.Quantity
        }
      ]);
    }

    setCurrentIngredient({ IngredientID: '', Quantity: '' });
  };

  // Remove ingredient from recipe
  const removeIngredientFromRecipe = (ingredientId) => {
    setSelectedIngredients(prev => 
      prev.filter(ing => ing.IngredientID != ingredientId)
    );
  };

  // Submit product with recipe
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!showRecipeSection) {
        // Validate basic product info
        if (!addProduct.ItemName || !addProduct.Category) {
          throw new Error('Item name and category are required');
        }
        setShowRecipeSection(true);
        return;
      }

      // Prepare complete product data
      const productData = {
        ...addProduct,
        CookingTime: parseInt(addProduct.CookingTime),
        CurrentPrice: parseFloat(addProduct.CurrentPrice),
        AvailabilityStatus: parseInt(addProduct.AvailabilityStatus),
        Quantity: parseInt(addProduct.Quantity),
        Recipe: selectedIngredients.map(ing => ({
          IngredientID: parseInt(ing.IngredientID),
          Quantity: parseFloat(ing.Quantity)
        }))
      };

      const response = await axios.post(
        'http://localhost:3000/api/v2/addproduct', 
        productData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      alert('Product added successfully!');
      resetForms();
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.response?.data?.error || err.message);
      alert(`Failed to add product: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Reset all forms
  const resetForms = () => {
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
    setSelectedIngredients([]);
    setShowRecipeSection(false);
  };

  // View products handler (keep your existing implementation)
  const handleViewProducts = async (e) => {
    e.preventDefault();
    setViewLoading(true);
    setViewError(null);
    try {
      const response = await axios.get('http://localhost:3000/api/v2/menu');
      setMenuItems(response.data.Menu || []);
    } catch (err) {
      console.error('Error fetching menu items:', err);
      setViewError(err.response?.data?.message || err.message);
    } finally {
      setViewLoading(false);
    }
  };

  // Remove product handler (keep your existing implementation)
  const handleRemoveSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!removeProduct.productId) {
        throw new Error('Product ID is required');
      }
      await axios.delete(
        `http://localhost:3000/api/v2/removemenuitem/${removeProduct.productId}`
      );
      alert(`Product with ID ${removeProduct.productId} removed successfully!`);
      setRemoveProduct({ productId: '' });
    } catch (err) {
      console.error('Error removing product:', err);
      setError(err.response?.data?.message || err.message);
      alert('Failed to remove product: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="item-page-container">
        <h1>Product Management</h1>
        
        {/* Error displays */}
        {error && <div className="error-message">{error}</div>}
        {ingredientError && <div className="error-message">{ingredientError}</div>}

        {/* Add Product Section */}
        <div className="form-section">
          <h2>Add New Product</h2>
          <form onSubmit={handleAddSubmit} className="product-form">
            {/* Basic Product Info */}
            {!showRecipeSection ? (
              <>
                <div className="form-row">
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
                </div>

                {/* Other product fields */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Spice Level:</label>
                    <select
                      name="SpiceLevel"
                      value={addProduct.SpiceLevel}
                      onChange={handleAddInputChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Mild">Mild</option>
                      <option value="Medium">Medium</option>
                      <option value="Hot">Hot</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Price:</label>
                    <input
                      type="number"
                      name="CurrentPrice"
                      value={addProduct.CurrentPrice}
                      onChange={handleAddInputChange}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Cooking Time (mins):</label>
                    <input
                      type="number"
                      name="CookingTime"
                      value={addProduct.CookingTime}
                      onChange={handleAddInputChange}
                      required
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Availability:</label>
                    <select
                      name="AvailabilityStatus"
                      value={addProduct.AvailabilityStatus}
                      onChange={handleAddInputChange}
                      required
                    >
                      <option value="1">Available</option>
                      <option value="0">Not Available</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="ItemDescription"
                    value={addProduct.ItemDescription}
                    onChange={handleAddInputChange}
                    required
                  />
                </div>

                <div className="form-row">
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
                    <label>Initial Quantity:</label>
                    <input
                      type="number"
                      name="Quantity"
                      value={addProduct.Quantity}
                      onChange={handleAddInputChange}
                      required
                      min="1"
                    />
                  </div>
                </div>
              </>
            ) : (
              /* Recipe Section */
              <div className="recipe-section">
                <h3>Build Recipe</h3>
                
                <div className="ingredient-selector">
                  <select
                    value={currentIngredient.IngredientID}
                    onChange={handleIngredientSelect}
                    disabled={loadingIngredients}
                  >
                    <option value="">Select Ingredient</option>
                    {ingredients.map(ing => (
                      <option key={ing.IngredientID} value={ing.IngredientID}>
                        {ing.IngredientName}
                      </option>
                    ))}
                  </select>
                  
                  {currentIngredient.IngredientID && (
                    <>
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={currentIngredient.Quantity}
                        onChange={handleIngredientQuantityChange}
                        step="0.1"
                        min="0"
                      />
                      <button
                        type="button"
                        onClick={addIngredientToRecipe}
                        className="add-btn"
                      >
                        Add
                      </button>
                    </>
                  )}
                </div>

                {selectedIngredients.length > 0 && (
                  <div className="selected-ingredients">
                    <h4>Recipe Ingredients:</h4>
                    <ul>
                      {selectedIngredients.map(ing => (
                        <li key={ing.IngredientID}>
                          <span>{ing.IngredientName} - {ing.Quantity}</span>
                          <button
                            type="button"
                            onClick={() => removeIngredientFromRecipe(ing.IngredientID)}
                            className="remove-btn"
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="form-actions">
              {showRecipeSection && (
                <button
                  type="button"
                  onClick={() => setShowRecipeSection(false)}
                  className="secondary-btn"
                >
                  Back
                </button>
              )}
              <button 
                type="submit" 
                className="primary-btn"
                disabled={loading}
              >
                {loading ? 'Processing...' : 
                 showRecipeSection ? 'Complete Product Addition' : 'Next: Add Recipe'}
              </button>
            </div>
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
                onChange={(e) => setRemoveProduct({ productId: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="danger-btn" disabled={loading}>
              {loading ? 'Removing...' : 'Remove Product'}
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