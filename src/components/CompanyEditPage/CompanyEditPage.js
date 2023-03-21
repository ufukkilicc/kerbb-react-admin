import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCompany,
  updateCompany,
  uploadCompanyCover,
  uploadCompanyLogo,
} from "../../features/companies/companiesAPI";
import {
  addCompany,
  getOneCompany,
} from "../../features/companies/companiesSlice";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import "./CompanyEditPage.scss";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { getCookie } from "../../helpers/authHelper";
import alertify from "alertifyjs";
import Skeleton from "@mui/material/Skeleton";
import { Helmet } from "react-helmet";
// import PhotoCamera from '@mui/icons-material/PhotoCamera';

const CompanyEditPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoImageButton, setLogoImageButton] = useState(false);
  const [logoImageLoading, setLogoImageLoading] = useState(false);
  const [coverImageButton, setCoverImageButton] = useState(false);
  const [coverImageLoading, setCoverImageLoading] = useState(false);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [companyTrackingId, setCompanyTrackingId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyJobCount, setCompanyJobCount] = useState("");
  const [companyIsHighlighted, setCompanyIsHighlighted] = useState("");
  const [companyHighlightOrder, setCompanyHighlightOrder] = useState(0);
  const [companyIsActive, setCompanyIsActive] = useState("");
  const [companyIsApproved, setCompanyIsApproved] = useState("");
  const [companyTags, setCompanyTags] = useState([]);
  const [companyViews, setCompanyViews] = useState("");
  const [companyImageUrl, setCompanyImageUrl] = useState("");
  const [companyCoverImageUrl, setCompanyCoverImageUrl] = useState("");
  const [companyScrapeName, setCompanyScrapeName] = useState("");
  const [companyStaffCount, setCompanyStaffCount] = useState();
  const [companySector, setCompanySector] = useState("");
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    async function fetchData() {
      SetPageTitle();
      const companyDetailResponse = await fetchCompany(id);
      const company = companyDetailResponse.data;
      //   dispatch(addCompany(company));
      setCompanyTrackingId(company.tracking_id);
      setCompanyName(company.name);
      setCompanyJobCount(company.job_count);
      setCompanyIsHighlighted(company.is_highlighted);
      setCompanyIsActive(company.is_active);
      setCompanyTags(company.company_tags);
      setCompanyViews(company.company_views);
      setCompanyImageUrl(company.logo_image_url);
      setCompanyCoverImageUrl(company.cover_image_url);
      setCompanyScrapeName(company.scrape_name);
      setCompanyHighlightOrder(company.highlight_order);
      setCompanyIsApproved(company.is_approved);
      setCompanyStaffCount(company.staff_count);
      setCompanySector(company.sector);
    }
    fetchData();
  }, []);
  //   const company = useSelector(getOneCompany);
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
  const handleLogoImageButtonTrue = () => {
    setLogoImageButton(true);
  };
  const handleLogoImageButtonFalse = () => {
    setLogoImageButton(false);
  };
  const handleCoverImageButtonTrue = () => {
    setCoverImageButton(true);
  };
  const handleCoverImageButtonFalse = () => {
    setCoverImageButton(false);
  };
  const changeLogo = async (e) => {
    const token = getCookie("k_t");
    const logoImage = e.target.files[0];
    setLogoImageLoading(true);
    const uploadCompanyLogoResponse = await uploadCompanyLogo(
      token,
      id,
      logoImage
    );
    setLogoImageLoading(false);
    const status = uploadCompanyLogoResponse.status;
    if (status === 201) {
      alertify.success(`Status: ${status} - Logo updated successfully`);
      const company = uploadCompanyLogoResponse.data;
      setCompanyImageUrl(company.logo_image_url);
    }
  };
  const changeCover = async (e) => {
    const token = getCookie("k_t");
    const logoImage = e.target.files[0];
    setCoverImageLoading(true);
    const uploadCompanyCoverResponse = await uploadCompanyCover(
      token,
      id,
      logoImage
    );
    setCoverImageLoading(false);
    const status = uploadCompanyCoverResponse.status;
    if (status === 201) {
      alertify.success(`Status: ${status} - Cover updated successfully`);
      const company = uploadCompanyCoverResponse.data;
      setCompanyCoverImageUrl(company.cover_image_url);
    }
  };
  const handleSubmit = async () => {
    const token = getCookie("k_t");
    const body = {
      name: companyName,
      scrape_name: companyScrapeName,
      staff_count: companyStaffCount,
      sector: companySector,
    };
    setSubmitButtonLoading(true);
    const updateCompanyResponse = await updateCompany(token, id, body);
    setSubmitButtonLoading(false);
    const status = updateCompanyResponse.status;
    if (status === 200) {
      alertify.success(`Status: ${status} - Item has been added successfully`);
      navigate("/dashboard/lists/companies");
    }
  };
  const handleCompanyNameChange = (e) => {
    const companyNameValue = e.target.value;
    setCompanyName(companyNameValue);
  };
  const handleCompanyStaffCountChange = (e) => {
    const companySectorValue = e.target.value;
    setCompanyStaffCount(companySectorValue);
  };
  const handleCompanySectorChange = (e) => {
    const companySectorValue = e.target.value;
    setCompanySector(companySectorValue);
  };
  const handleCompanyScrapeNameChange = (e) => {
    const companyScrapeNameValue = e.target.value;
    setCompanyScrapeName(companyScrapeNameValue);
  };
  return (
    <div className="company-edit-page-container">
      <Helmet>
        <title>Company Edit</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="company-edit-header-container">
        <h1 className="company-edit-header">COMPANY EDIT</h1>
      </div>
      <div className="company-container">
        <div
          className="image-logo-container"
          onMouseEnter={handleLogoImageButtonTrue}
          onMouseLeave={handleLogoImageButtonFalse}
        >
          <img
            className={logoImageLoading ? "image" : "image-active"}
            src={
              companyImageUrl === ""
                ? process.env.PUBLIC_URL + "/no-image.png"
                : companyImageUrl
            }
            alt=""
          />
          <div
            className={
              logoImageLoading ? "image-loader-active" : "image-loader"
            }
          >
            <Skeleton variant="rectangular" width={200} height={200} />
          </div>
          <div
            className={
              logoImageButton
                ? "logo-image-upload-button-container-active"
                : "logo-image-upload-button-container"
            }
          >
            <Button variant="contained" component="label">
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => changeLogo(e)}
              />
            </Button>
          </div>
        </div>
        <div
          className="image-cover-container"
          onMouseEnter={handleCoverImageButtonTrue}
          onMouseLeave={handleCoverImageButtonFalse}
        >
          <img
            className={coverImageLoading ? "image" : "image-active"}
            src={
              companyCoverImageUrl === ""
                ? process.env.PUBLIC_URL + "/no-image.png"
                : companyCoverImageUrl
            }
            alt=""
          />
          <div
            className={
              coverImageLoading ? "image-loader-active" : "image-loader"
            }
          >
            <Skeleton variant="rectangular" width={200} height={200} />
          </div>
          <div
            className={
              coverImageButton
                ? "logo-image-upload-button-container-active"
                : "logo-image-upload-button-container"
            }
          >
            <Button variant="contained" component="label">
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => changeCover(e)}
              />
            </Button>
          </div>
        </div>
        <div className="company-edit-form-container">
          <form className="company-edit-form" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="ID"
              variant="outlined"
              value={companyTrackingId}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Company"
              variant="outlined"
              value={companyName}
              onChange={handleCompanyNameChange}
            />
            <TextField
              id="outlined-basic"
              label="Scrape Name"
              variant="outlined"
              value={companyScrapeName}
              onChange={handleCompanyScrapeNameChange}
            />
            <TextField
              id="outlined-basic"
              label="Staff Count"
              variant="outlined"
              value={companyStaffCount}
              onChange={handleCompanyStaffCountChange}
            />
            <TextField
              id="outlined-basic"
              label="Sector"
              variant="outlined"
              value={companySector}
              onChange={handleCompanySectorChange}
            />
            <TextField
              id="outlined-basic"
              label="Job Count"
              variant="outlined"
              value={companyJobCount}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Highlighted"
              variant="outlined"
              value={companyIsHighlighted}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Highlight Order"
              variant="outlined"
              value={companyHighlightOrder}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Active"
              variant="outlined"
              value={companyIsActive}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Approved"
              variant="outlined"
              value={companyIsApproved}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Views"
              variant="outlined"
              value={companyViews}
              disabled
            />
            <Select
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
            </Select>
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
              Save
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyEditPage;
