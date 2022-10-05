import React from "react";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import "./TagsPage.scss";
import { Helmet } from "react-helmet";

const TagsPage = () => {
  return (
    <div className="tags-page-container">
      <Helmet>
        <title>Tags</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
    </div>
  );
};

export default TagsPage;
