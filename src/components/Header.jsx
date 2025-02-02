import { FiAlignJustify } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx"; 
import React, { useState } from "react";
import Sidebar from "./sidebar";
import { Link } from "react-router-dom";

function Header() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const handleClick = () => {
    console.log('clicked');
    setSidebarVisible(true);
  };

  const handleClick2 = () => {
    console.log('clicked2');
    setSidebarVisible(false);
  };

  return (

    <header className="header">
      <FiAlignJustify className="menu_icon" onClick={()=>{handleClick()}} />
        <Link to="/bag" style={{ textDecoration: "none", color: "black" }}><IoBagHandleOutline className="bag" /></Link>
     <Link to="/" style={{ textDecoration: "none", color: "black" }}> <h1 className="header_box">Grubify</h1></Link>
      {isSidebarVisible && <Sidebar setSidebarVisible={setSidebarVisible} />}
      {isSidebarVisible && <div className='cross'><RxCross2 className='icon_c' onClick={()=>{handleClick2()}} /></div>}
    </header>
  );
}

export default Header;