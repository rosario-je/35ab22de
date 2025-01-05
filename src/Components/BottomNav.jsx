import React, { useContext } from "react";

//Context
import { AppContext } from "../Context/AppContext.jsx";


//Icons
import { IoCallSharp, IoSettingsSharp } from "react-icons/io5";
import { FaUserLarge, FaUsers } from "react-icons/fa6";
import { PiNumpad } from "react-icons/pi";




const BottomNav = () => {
  const { callList } = useContext(AppContext);

  return (
    <nav className="bottom-nav">
      <ul className="bottom-nav-list">
        <li className="relative text-green-600" onClick={() => navigate("/")}>
          <IoCallSharp size={20} />
          {callList.length > 0 && (
            <span className="absolute -top-2 left-2 w-4 h-4 flex items-center justify-center text-xs text-white bg-red-500 rounded-full">
              {callList.length}
            </span>
          )}
        </li>
        <li>
          <FaUserLarge size={20} />
        </li>
        <li>
          <PiNumpad size={30} />
        </li>
        <li>
          <FaUsers size={20} />
        </li>
        <li>
          <IoSettingsSharp size={20} />
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
