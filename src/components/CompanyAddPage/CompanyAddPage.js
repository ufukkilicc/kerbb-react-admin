import React, { useEffect, useState } from "react";
import "./CompanyAddPage.scss";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import { useDispatch } from "react-redux";
import { postCompany } from "../../features/companies/companiesAPI";
import { getCookie } from "../../helpers/authHelper";
import alertify from "alertifyjs";
import { postCompanyObject } from "../../features/companies/companiesSlice";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const CompanyAddPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [companyScrapeName, setCompanyScrapeName] = useState("");
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    SetPageTitle();
  }, []);

  const SetPageTitle = () => {
    let title = "";
    window.location.pathname
      .split("/")
      .slice(2)
      .forEach((el) => {
        title += `/${el.charAt(0).toUpperCase() + el.slice(1)}`;
      });
    setPageTitle(title);
  };
  const handleChangeName = (e) => {
    const companyName = e.target.value;
    setCompanyName(companyName);
  };
  const handleChangeScrapeName = (e) => {
    const scrapeName = e.target.value;
    setCompanyScrapeName(scrapeName);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitButtonLoading(true);
    const token = getCookie("k_t");
    const postCompanyResponse = await postCompany(token, {
      name: companyName,
      scrape_name: companyScrapeName,
    });
    setSubmitButtonLoading(false);
    const status = postCompanyResponse.status;
    if (status === 201) {
      alertify.success(`Status: ${status} - Item has been added successfully`);
      const company = postCompanyResponse.data;
      dispatch(postCompanyObject(company));
      navigate("/dashboard/lists/companies");
    }
  };
  return (
    <div className="company-add-page-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="company-add-header-container">
        <h1 className="company-add-header">COMPANY ADD</h1>
      </div>
      <div className="company-container">
        <div className="company-add-form-container">
          <form className="company-add-form" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="NAME"
              variant="outlined"
              onChange={handleChangeName}
            />
            <TextField
              id="outlined-basic"
              label="SCRAPE_NAME"
              variant="outlined"
              onChange={handleChangeScrapeName}
            />
            {/* <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              //   value={age}
              label="Tags"
              //   onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select> */}
          </form>
          <div className="button-container">
            <LoadingButton
              size="small"
              color="primary"
              onClick={handleSubmit}
              loading={submitButtonLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              Add
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAddPage;
