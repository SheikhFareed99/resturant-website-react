import { FiAlignJustify } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import React, { useState } from "react";
import Sidebar from "./sidebar";

function Header() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
 

  const handleClick = () => {
    console.log('clicked');

    setSidebarVisible(true);
  };

 

  return (
    <header className="header">
      <FiAlignJustify className="menu_icon" onClick={handleClick} />
      <IoBagHandleOutline className="bag" />
      <h1 className="header_box">Grubify</h1>
      {isSidebarVisible && <Sidebar setSidebarVisible={setSidebarVisible} />}
   
    </header>
  );
}

export default Header;