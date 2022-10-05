import React from "react";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import "./TagTypesPage.scss";
import { Helmet } from "react-helmet";

const TagTypesPage = () => {
  return (
    <div className="tag-types-page-container">
      <Helmet>
        <title>Tag Types</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
    </div>
  );
};

export default TagTypesPage;
