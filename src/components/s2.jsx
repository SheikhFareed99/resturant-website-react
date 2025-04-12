import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
function Sidebar({ setSidebarVisible })
 {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h1 className="sidebar-title">To-do</h1>
        <div className='cross'>< RxCross2  className='icon_c' onClick={() => setSidebarVisible(false)}  /> </div>
        <div className="sidebar-section">
          <ul className="sidebar-list">
            <hr id="hr-fast-food" />
            <div className="sidebar-item">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <span className=" hover-underline sidebar-text">orders</span>
              </Link>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-chinese" />
            <div className="sidebar-item">

              <Link to="/chineese" style={{ textDecoration: "none", color: "black" }}>
              <span className=" hover-underline sidebar-text">Employees</span>
              </Link>

              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-pasta" />
            <div className="sidebar-item">
            <Link to="/pasta" style={{ textDecoration: "none", color: "black" }}>
              <span className="hover-underline sidebar-text">history</span>
              </Link>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-desserts" />
            <div className="sidebar-item">
            <Link to="/desserts" style={{ textDecoration: "none", color: "black" }}>
              <span className="hover-underline sidebar-text">users</span>
              </Link>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-local" />
            <div className="sidebar-item">
            <Link to="/local" style={{ textDecoration: "none", color: "black" }}>
              <span className="hover-underline sidebar-text">inventories</span>
              </Link>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-drinks" />
            <div className="sidebar-item">
            <Link to="/drinks" style={{ textDecoration: "none", color: "black" }}>
              <span className="hover-underline sidebar-text">suppliers</span>
              </Link>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-end" />
            <div className="sidebar-item">
            <Link to="/items" style={{ textDecoration: "none", color: "black" }}>
              <span className="hover-underline sidebar-text">items</span>
              </Link>
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