import React from "react";
import { Link } from "react-router-dom";
import "./ProfilePageNavbar.scss";

const ProfilePageNavbar = () => {
  return (
    <div className="profile-page-navbar">
      <ul className="profile-page-items">
        <li className="profile-page-item">
          <Link to="/dashboard/auth/profile/settings">
            <h2 className="profile-page-settings">Settings</h2>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfilePageNavbar;
