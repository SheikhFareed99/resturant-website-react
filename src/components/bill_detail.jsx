import React, { useState } from 'react';
import './bag.css';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BillDetail() {
  const items = useSelector((state) => state.bag.items);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  let total_mri = 0;
  for (let i = 0; i < items.length; i++) {
    let count = items[i].quantity;
    if (count > 0)
      total_mri += (items[i].current_price * count);
  }

  let platform_fee = 99;
  let discount = 0;
  let total_bill = total_mri + platform_fee - discount;

  const handlePlaceOrder = async () => {
    setError("");

    if (paymentMethod === "card") {
      navigate('/Order');
    } else if (paymentMethod === "wallet") {
      try {
        const res = await axios.post('http://localhost:3000/api/v2/deductmoneytowallet', {
          customerId: 1,
          amount: total_bill
        });

        if (res.data && res.data.Success === 1) {
          navigate('/Order');
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
          <span className="tax1">Platform fee</span>
          <span className="tax2 gap_p2">Rs {platform_fee}</span>
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
