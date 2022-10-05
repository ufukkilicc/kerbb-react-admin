import React, { useEffect, useState } from "react";
import "./SideNavbar.scss";
import Logo from "../Logo/Logo";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import BugReportIcon from "@mui/icons-material/BugReport";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import StarsIcon from "@mui/icons-material/Stars";
import GroupIcon from "@mui/icons-material/Group";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import SettingsIcon from "@mui/icons-material/Settings";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import SquareIcon from "@mui/icons-material/Square";
import PublicIcon from '@mui/icons-material/Public';
import { Link, useNavigate } from "react-router-dom";
import { unauthenticate } from "../../helpers/authHelper";
import alertify from "alertifyjs";

const SideNavbar = () => {
  const navigate = useNavigate();
  const [current_path, set_current_path] = useState("");
  const MINUTE_MS = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      set_current_path(window.location.pathname);
    }, MINUTE_MS);

    return () => clearInterval(interval);
    // This represents the unmount function,
    // in which you need to clear your interval to
    // prevent memory leaks.
  }, []);
  const handleLogout = () => {
    alertify.success("Logout Successful");
    unauthenticate(() => {
      navigate("/auth/login");
    });
  };
  return (
    <div className="side-navbar">
      <div className="side-navbar-logo-container">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="side-navbar-items-container">
        <div className="main-list-container">
          <h4 className="main-list-header">MAIN</h4>
          <ul className="main-list">
            <Link to="/dashboard">
              <li
                className={
                  current_path === "/" || current_path === "/dashboard"
                    ? "main-item active"
                    : "main-item"
                }
              >
                <div className="main-item-icon">
                  <DashboardIcon fontSize="small" />
                </div>
                <h4 className="main-item-header">Dashboard</h4>
              </li>
            </Link>
          </ul>
        </div>
        <div className="lists-list-container">
          <h4 className="lists-list-header">LISTS</h4>
          <ul className="lists-list">
            <Link to="/dashboard/lists/users">
              <li
                className={
                  current_path.startsWith("/dashboard/lists/users")
                    ? "lists-item active"
                    : "lists-item"
                }
              >
                <div className="lists-item-icon">
                  <PersonIcon fontSize="medium" />
                </div>
                <h4 className="lists-item-header">Users</h4>
              </li>
            </Link>
            <Link to="/dashboard/lists/jobs">
              <li
                className={
                  current_path.startsWith("/dashboard/lists/jobs")
                    ? "lists-item active"
                    : "lists-item"
                }
              >
                <div className="lists-item-icon">
                  <WorkIcon fontSize="small" />
                </div>
                <h4 className="lists-item-header">Jobs</h4>
              </li>
            </Link>
            <Link to="/dashboard/lists/companies">
              <li
                className={
                  current_path.startsWith("/dashboard/lists/companies")
                    ? "lists-item active"
                    : "lists-item"
                }
              >
                <div className="lists-item-icon">
                  <BusinessIcon fontSize="small" />
                </div>
                <h4 className="lists-item-header">Companies</h4>
              </li>
            </Link>
            <Link to="/dashboard/lists/news">
              <li
                className={
                  current_path.startsWith("/dashboard/lists/news")
                    ? "lists-item active"
                    : "lists-item"
                }
              >
                <div className="lists-item-icon">
                  <NewspaperIcon fontSize="small" />
                </div>
                <h4 className="lists-item-header">News</h4>
              </li>
            </Link>
            <Link to="/dashboard/lists/scrappers">
              <li
                className={
                  current_path.startsWith("/dashboard/lists/scrappers")
                    ? "lists-item active"
                    : "lists-item"
                }
              >
                <div className="lists-item-icon">
                  <BugReportIcon fontSize="small" />
                </div>
                <h4 className="lists-item-header">Scrappers</h4>
              </li>
            </Link>
          </ul>
        </div>
        <div className="features-list-container">
          <h4 className="features-list-header">FEATURES</h4>
          <ul className="features-list">
            <Link to="/dashboard/features/publishers">
              <li
                className={
                  current_path.startsWith("/dashboard/features/publishers")
                    ? "features-item active"
                    : "features-item"
                }
              >
                <div className="features-item-icon">
                  <PublicIcon fontSize="small" />
                </div>
                <h4 className="features-item-header">Publishers</h4>
              </li>
            </Link>
            <Link to="/dashboard/features/tags">
              <li
                className={
                  current_path.startsWith("/dashboard/features/tags")
                    ? "features-item active"
                    : "features-item"
                }
              >
                <div className="features-item-icon">
                  <LocalOfferIcon fontSize="small" />
                </div>
                <h4 className="features-item-header">Tags</h4>
              </li>
            </Link>
            <Link to="/dashboard/features/tag-types">
              <li
                className={
                  current_path.startsWith("/dashboard/features/tag-types")
                    ? "features-item active"
                    : "features-item"
                }
              >
                <div className="features-item-icon">
                  <LocalOfferIcon fontSize="small" />
                </div>
                <h4 className="features-item-header">Tag Types</h4>
              </li>
            </Link>
            <Link to="/dashboard/features/roles">
              <li
                className={
                  current_path.startsWith("/dashboard/features/roles")
                    ? "features-item active"
                    : "features-item"
                }
              >
                <div className="features-item-icon">
                  <StarsIcon fontSize="small" />
                </div>
                <h4 className="features-item-header">Roles</h4>
              </li>
            </Link>
            <Link to="/dashboard/features/groups">
              <li
                className={
                  current_path.startsWith("/dashboard/features/groups")
                    ? "features-item active"
                    : "features-item"
                }
              >
                <div className="features-item-icon">
                  <GroupIcon fontSize="small" />
                </div>
                <h4 className="features-item-header">Groups</h4>
              </li>
            </Link>
            <Link to="/dashboard/features/tickets">
              <li
                className={
                  current_path.startsWith("/dashboard/features/tickets")
                    ? "features-item active"
                    : "features-item"
                }
              >
                <div className="features-item-icon">
                  <ConfirmationNumberIcon fontSize="small" />
                </div>
                <h4 className="features-item-header">Tickets</h4>
              </li>
            </Link>
            <Link to="/dashboard/features/ticket-types">
              <li
                className={
                  current_path.startsWith("/dashboard/features/ticket-types")
                    ? "features-types-item active"
                    : "features-types-item"
                }
              >
                <div className="features-item-icon">
                  <ConfirmationNumberIcon fontSize="small" />
                </div>
                <h4 className="features-item-header">Ticket Types</h4>
              </li>
            </Link>
          </ul>
        </div>
        <div className="usefuls-list-container">
          <h4 className="usefuls-list-header">USEFUL</h4>
          <ul className="usefuls-list">
            <Link to="/dashboard/usefuls/stats">
              <li
                className={
                  current_path.startsWith("/dashboard/usefuls/stats")
                    ? "usefuls-item active"
                    : "usefuls-item"
                }
              >
                <div className="usefuls-item-icon">
                  <BarChartIcon fontSize="small" />
                </div>
                <h4 className="usefuls-item-header">Stats</h4>
              </li>
            </Link>
            <Link to="/dashboard/usefuls/notifications">
              <li
                className={
                  current_path.startsWith("/dashboard/usefuls/notifications")
                    ? "usefuls-item active"
                    : "usefuls-item"
                }
              >
                <div className="usefuls-item-icon">
                  <NotificationsIcon fontSize="small" />
                </div>
                <h4 className="usefuls-item-header">Notifications</h4>
              </li>
            </Link>
          </ul>
        </div>
        <div className="service-list-container">
          <h4 className="service-list-header">SERVICE</h4>
          <ul className="service-list">
            <Link to="/dashboard/services/system">
              <li
                className={
                  current_path.startsWith("/dashboard/services/system")
                    ? "service-item active"
                    : "service-item"
                }
              >
                <div className="service-item-icon">
                  <HealthAndSafetyIcon fontSize="small" />
                </div>
                <h4 className="service-item-header">System Health</h4>
              </li>
            </Link>
            <Link to="/dashboard/services/logs">
              <li
                className={
                  current_path.startsWith("/dashboard/services/logs")
                    ? "service-item active"
                    : "service-item"
                }
              >
                <div className="service-item-icon">
                  <WysiwygIcon fontSize="small" />
                </div>
                <h4 className="service-item-header">Logs</h4>
              </li>
            </Link>
            <Link to="/dashboard/services/settings">
              <li
                className={
                  current_path.startsWith("/dashboard/services/settings")
                    ? "service-item active"
                    : "service-item"
                }
              >
                <div className="service-item-icon">
                  <SettingsIcon fontSize="small" />
                </div>
                <h4 className="service-item-header">Settings</h4>
              </li>
            </Link>
          </ul>
        </div>
        <div className="user-list-container">
          <h4 className="user-list-header">USER</h4>
          <ul className="user-list">
            <Link to="/dashboard/auth/profile">
              <li
                className={
                  current_path.startsWith("/dashboard/auth/profile")
                    ? "user-item active"
                    : "user-item"
                }
              >
                <div className="user-item-icon">
                  <FolderSharedIcon fontSize="small" />
                </div>
                <h4 className="user-item-header">Profile</h4>
              </li>
            </Link>
            <a href="">
              <li className="user-item" onClick={handleLogout}>
                <div className="user-item-icon">
                  <LogoutIcon fontSize="small" />
                </div>
                <h4 className="user-item-header">Logout</h4>
              </li>
            </a>
          </ul>
        </div>
        <div className="theme-list-container">
          <h4 className="theme-list-header">THEME</h4>
          <ul className="theme-list">
            <li className="theme-item">
              <div className="theme-item-icon-light">
                <SquareIcon fontSize="large" />
              </div>
            </li>
            <li className="theme-item">
              <div className="theme-item-icon-dark">
                <SquareIcon fontSize="large" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
