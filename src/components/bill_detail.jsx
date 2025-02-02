import React from 'react';
import './bag.css';

function  bill_detail() 
{
    return (

        <div>
  
            <div className="bill">
              <p className="total_item">Price details (3items)</p>
              <div className="mrp gap_p">
                <span className="mrp1">Total Mri</span>
                <span className="mrp2 gap_p2">12000</span>
              </div>
              <div className="discount gap_p">
                <span className="discount1">Total discount</span>
                <span className="discount2 gap_p2">-200</span>
              </div>
              <div className="tax gap_p">
                <span className="tax1">Plateform fee</span>
                <span className="tax2 gap_p2">99</span>
              </div>
              <hr className="thin-light-hr"/>
              <div className="total_bill gap_p">
                <span className="total_bill1">Total Bill</span>
                <span className="total_bill2 gap_p2">Rs:11500</span>
              </div>
              <button className='order'>Place order</button>
            </div>
            </div>
    
    )
}   
export default bill_detail;