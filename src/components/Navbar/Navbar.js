import React from "react";
import "./Navbar.scss";
import RefreshIcon from "@mui/icons-material/Refresh";

const Navbar = () => {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <div className="navbar">
      <ul className="navbar-items">
        <li className="navbar-item">
          <div className="refresh-icon-container" onClick={handleRefresh}>
            <RefreshIcon fontSize="medium" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
