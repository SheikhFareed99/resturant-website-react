import React from "react";
import './chinease.css';
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { bagActions } from "../stores/bagslice";

function Chinease({ item }) {
  const dispatch = useDispatch();

  const handleAddToBag = () => {
    console.log("added to bag " + item.id);
    dispatch(bagActions.addItemToBag(item));
  };

  return (
    <div>
      <div className="chinease_card">
        <div className="img_china">
          <img src={item.image} alt={item.item_name} />
        </div>
        <span className="price">Rs: {item.current_price}</span>
        <div className="title">
          <p>{item.item_name}</p>
          <span className="plus_icon">
            <HiOutlinePlusCircle onClick={handleAddToBag} />
          </span>
        </div>
        <p className="food_dis">{item.item_description}</p>
      </div>
    </div>
  );
}

export default Chinease;