import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
function Sidebar({ setSidebarVisible })
 {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h1 className="sidebar-title">Menu</h1>
        <div className='cross'>< RxCross2  className='icon_c' onClick={() => setSidebarVisible(false)}  /> </div>
        <div className="sidebar-section">
          <ul className="sidebar-list">
            <hr id="hr-fast-food" />
            <div className="sidebar-item">
              <span className=" hover-underline sidebar-text">Fast Food</span>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-chinese" />
            <div className="sidebar-item">
              <Link to="/chineese" style={{ textDecoration: "none", color: "black" }}><span className=" hover-underline sidebar-text">Chinese</span></Link>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-pasta" />
            <div className="sidebar-item">
              <span className="hover-underline sidebar-text">Pasta</span>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-desserts" />
            <div className="sidebar-item">
              <span className="hover-underline sidebar-text">Desserts</span>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-local" />
            <div className="sidebar-item">
              <span className="hover-underline sidebar-text">Local</span>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-drinks" />
            <div className="sidebar-item">
              <span className="hover-underline sidebar-text">Drinks</span>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-end" />
          </ul>
        </div>
        <div className='adress'>
              <h3 className="adress_t">Contact Information</h3>
              <div className="h12">
              <li className="sidebar-text   ">Landline: 042-32301484</li>
              <li className="sidebar-text ">Email: info@haven.com.pk</li>
              </div>
            </div>
      </div>
    </div>
  );
}

export default Sidebar;