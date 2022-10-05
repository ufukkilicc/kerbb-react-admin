import React from "react";
import "./NotFoundPage.scss";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
  return (
    <div className="not-found-page-container">
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="not-found-container">
        <div className="not-found-pre-content-container">
          <h3 className="not-found-pre-content">OOPS! PAGE NOT FOUND</h3>
        </div>
        <div className="not-found-header-container">
          <h1 className="not-found-header">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <div className="not-found-post-content-container">
          <h3 className="not-found-post-content">
            WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND
          </h3>
        </div>
        <div className="not-found-navi-container">
          <Link to="/dashboard">
            <div className="navi-home-container">
              <h1 className="navi-home-header">Home</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
