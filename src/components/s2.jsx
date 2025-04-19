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
            <Link to="/wallet" style={{ textDecoration: "none", color: "black" }}>
              <span className="hover-underline sidebar-text">customer wallet</span>
              </Link>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-chinese" />
            <div className="sidebar-item">

              <Link to="/employee" style={{ textDecoration: "none", color: "black" }}>
              <span className=" hover-underline sidebar-text">Employees</span>
              </Link>

              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-pasta" />
            <div className="sidebar-item">
            <Link to="/Orderspage" style={{ textDecoration: "none", color: "black" }}>
              <span className="hover-underline sidebar-text">history</span>
              </Link>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-desserts" />
            <div className="sidebar-item">
            <Link to="/add_ingredient" style={{ textDecoration: "none", color: "black" }}>
              <span className="hover-underline sidebar-text">ingredient data</span>
              </Link>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-local" />
            <div className="sidebar-item">
            <Link to="/DailySalesReport" style={{ textDecoration: "none", color: "black" }}>
              <span className="hover-underline sidebar-text">Daily sales report</span>
              </Link>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-drinks" />
            <div className="sidebar-item">
            <Link to="/ingredientinven" style={{ textDecoration: "none", color: "black" }}>
              <span className="hover-underline sidebar-text">ingredient add</span>
              </Link>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-end" />
            <div className="sidebar-item">
            <Link to="/updatesalary" style={{ textDecoration: "none", color: "black" }}>
              <span className="hover-underline sidebar-text">update employee salary</span>
              </Link>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-end" />
            <div className="sidebar-item">
            <Link to="/items" style={{ textDecoration: "none", color: "black" }}>
              <span className="hover-underline sidebar-text">Products</span>
              </Link>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-end" />
            <div className="sidebar-item">
            <Link to="/MonthlyReportPage" style={{ textDecoration: "none", color: "black" }}>
              <span className="hover-underline sidebar-text">Financial report</span>
              </Link>
              <span className="sidebar-symbol">&gt;</span>
            </div>
            <hr id="hr-end" />
            <div className="sidebar-item">
            <Link to="/Vendor" style={{ textDecoration: "none", color: "black" }}>
              <span className="hover-underline sidebar-text">Vendor managment</span>
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