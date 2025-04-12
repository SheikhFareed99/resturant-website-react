import React from "react"
import Layout from "../components/Layout";
import './Orderplace.css';
import { useSelector } from "react-redux";
const Orderplace = () => {
    const items = useSelector((state) => state.bag.items); 

    const handleSubmitOrder = async () => {
        try {
          const response = await fetch("http://localhost:3000/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order: items }),
          });
    
          const result = await response.json();
          console.log("Order response:", result);
          alert("Order placed successfully!");
        } catch (error) {
          console.error("Error placing order:", error);
        }
      };

      handleSubmitOrder();
    return (
      <>
<Layout>
   <div className="orderplace">
    <h1>Thanks for ordering from Grubify</h1>
    <br />
    <h3>Order will be delivered within 40 minutes</h3>
   </div>
</Layout>
      </>
    )
  }
  export default Orderplace;