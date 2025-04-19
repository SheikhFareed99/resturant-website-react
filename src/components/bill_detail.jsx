import React, { useState } from 'react';
import './bag.css';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BillDetail() {
  const items = useSelector((state) => state.bag.items);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderType, setOrderType] = useState("Delivery");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const customerid = useSelector((state) => state.user.customerId);

  let total_mri = 0;
  for (let i = 0; i < items.length; i++) {
    let count = items[i].quantity;
    if (count > 0)
      total_mri += (items[i].current_price * count);
  }

  const discount = 0;
  const taxPercent = paymentMethod === "card" ? 5 : 16;
  const tax = Math.floor((total_mri * taxPercent) / 100);
  const total_bill = total_mri + tax - discount;

  const handlePlaceOrder = async () => {
    setError("");

    if (orderType.toLowerCase() === "dine-in") {
      try {
        const tableCheck = await axios.get("http://localhost:3000/api/v2/checkTableAvailable");

        if (!tableCheck.data.available) {
          setError("No seat available for dine-in. Please choose delivery.");
          return;
        }
      } catch (err) {
        setError("Error checking seat availability.");
        return;
      }
    }

    if (paymentMethod === "card") {
      navigate('/Order', { state: { orderType, paymentMethod } });
    } else if (paymentMethod === "wallet") {
      try {
        const res = await axios.post('http://localhost:3000/api/v2/deductmoneytowallet', {
          customerId: customerid,
          amount: total_bill
        });

        if (res.data && res.data.Success === 1) {
          navigate('/Order', { state: { orderType, paymentMethod } });
        } else {
          setError(res.data?.Message || "Wallet deduction failed");
        }
      } catch (err) {
        setError(err.response?.data?.error || "Error processing wallet payment");
      }
    }
  };

  return (
    <div>
      <div className="bill">
        <p className="total_item">Price details ({items.length} items)</p>

        <div className="mrp gap_p">
          <span className="mrp1">Total MRP</span>
          <span className="mrp2 gap_p2">Rs {total_mri}</span>
        </div>

        <div className="discount gap_p">
          <span className="discount1">Total discount</span>
          <span className="discount2 gap_p2">Rs {discount}</span>
        </div>

        <div className="tax gap_p">
          <span className="tax1">Tax ({taxPercent}%)</span>
          <span className="tax2 gap_p2">Rs {tax}</span>
        </div>

        <hr className="thin-light-hr" />

        <div className="total_bill gap_p">
          <span className="total_bill1">Total Bill</span>
          <span className="total_bill2 gap_p2">Rs {total_bill}</span>
        </div>

        <div style={{ marginTop: '10px', fontSize: '12px', fontWeight:'900' }}>
          <label htmlFor="paymentMethod">Select Payment Method: </label>
          <select
            style={{ borderRadius: '5px', padding: '2px', marginLeft: '15px' }}
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="card">Pay with Card</option>
            <option value="wallet">Pay with Wallet</option>
          </select>
        </div>

        <div style={{ marginTop: '10px', fontSize: '12px', fontWeight:'900' }}>
          <label htmlFor="orderType">Select Order Type: </label>
          <select
            style={{ borderRadius: '5px', padding: '2px', marginLeft: '15px' }}
            id="orderType"
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
          >
            <option value="delivery">Delivery</option>
            <option value="Dine-in">Dine In</option>
          </select>
        </div>

        {error && (
          <div style={{ color: "red", fontSize: "13px", marginTop: "10px" }}>
            {error}
          </div>
        )}

        <button className="order" onClick={handlePlaceOrder}>
          Place order
        </button>
      </div>
    </div>
  );
}

export default BillDetail;
