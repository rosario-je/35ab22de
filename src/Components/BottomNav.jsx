import React from "react";
import { IoCallSharp, IoSettingsSharp } from "react-icons/io5";
import { FaUserLarge, FaUsers } from "react-icons/fa6";

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <ul className="bottom-nav-list">
        <li className="text-green-600" onClick={() => navigate("/")}>
          <IoCallSharp />
        </li>
        <li>
          <FaUserLarge />
        </li>
        <li>
          <FaUsers />
        </li>
        <li>
          <IoSettingsSharp />
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
