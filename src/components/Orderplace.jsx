import React from "react";
import Layout from "../components/Layout";
import './Orderplace.css';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const Orderplace = () => {
  const items = useSelector((state) => state.bag.items); 
  const location = useLocation();
  const orderType = location.state?.orderType || "delivery";
  const customerId = useSelector((state) => state.user.customerId);
  console.log("Received Order Type:", orderType);
  console.log("Customer ID:", customerId);
  

  const handleSubmitOrder = async () => {
    try {
    
      const order = items.map(item => ({
        item_id: item.id,
        quantity: item.quantity,
        current_price: item.current_price
      }));

      const response = await fetch("http://localhost:3000/api/v2/updateIngredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: customerId,
          order: order,
          order_type: orderType
        }),
      });
      
      const result = await response.json();
      console.log("Order response:", result);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  React.useEffect(() => {
    handleSubmitOrder();
  }, []);

  return (
    <Layout>
      <div className="orderplace">
        <h1>Thanks for ordering from Grubify</h1>
        <br />
        <h3>Order will be delivered within 40 minutes</h3>
      </div>
    </Layout>
  );
};

export default Orderplace;
