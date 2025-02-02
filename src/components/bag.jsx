import React from 'react';
import './bag.css';
import { BsTrash } from "react-icons/bs";

function Bag({ item }) {
    return (
        <div className="bag_summary">
            <div className="img_d">
                <img src={item.image} alt={item.item_name} />
              
            </div>
               <div className="detail_i">
                <div className='title_trash'>
                  <h3 className="name">{item.item_name}</h3> 
                  <div className="trash"><BsTrash /></div> 
                  </div>
                <p className="description">{item.item_description}</p>
                <p className="price_bag">Rs: {item.current_price}</p>
                <p className="delivery">Return within <span>14 days</span></p>
            </div>
        </div>
    );
}

export default Bag;
