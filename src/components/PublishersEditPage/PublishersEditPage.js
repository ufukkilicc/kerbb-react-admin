import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchOnePublisher,
  updatePublisher,
  uploadPublisherLogo,
} from "../../features/publishers/publishersAPI";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import "./PublishersEditPage.scss";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { getCookie } from "../../helpers/authHelper";
import alertify from "alertifyjs";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

const PublishersEditPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState("");

  const [logoImageButton, setLogoImageButton] = useState(false);
  const [logoImageLoading, setLogoImageLoading] = useState(false);

  const [publisherTrackingId, setPublisherTrackingId] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [publisherRedirectLink, setPublisherRedirectLink] = useState("");
  const [publisherLogoImageUrl, setPublisherLogoImageUrl] = useState("");

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      SetPageTitle();
      const publisherDetailResponse = await fetchOnePublisher(id);
      setPublisherTrackingId(publisherDetailResponse.data.tracking_id);
      setPublisherName(publisherDetailResponse.data.publisher_name);
      setPublisherRedirectLink(
        publisherDetailResponse.data.publisher_redirect_link
      );
      setPublisherLogoImageUrl(publisherDetailResponse.data.logo_image_url);
    }
    fetchData();
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
  const handlePublisherNameChange = (e) => {
    const inputValue = e.target.value;
    setPublisherName(inputValue);
  };
  const handlePublisherRedirectLinkChange = (e) => {
    const inputValue = e.target.value;
    setPublisherRedirectLink(inputValue);
  };
  const handleSubmit = async () => {
    const token = getCookie("k_t");
    setSubmitButtonLoading(true);
    const publisher_name = publisherName;
    const publisher_redirect_link = publisherRedirectLink;
    const publisherUpdateResponse = await updatePublisher(token, id, {
      publisher_name,
      publisher_redirect_link,
    });
    setSubmitButtonLoading(false);
    const status = publisherUpdateResponse.status;
    if (status === 200) {
      alertify.success(`Status: ${status} - Item updated successfully`);
      navigate("/dashboard/features/publishers");
    }
  };
  const handleLogoImageButtonTrue = () => {
    setLogoImageButton(true);
  };
  const handleLogoImageButtonFalse = () => {
    setLogoImageButton(false);
  };
  const changeLogo = async (e) => {
    const token = getCookie("k_t");
    const logoImage = e.target.files[0];
    setLogoImageLoading(true);
    const uploadPublisherLogoResponse = await uploadPublisherLogo(
      token,
      id,
      logoImage
    );
    setLogoImageLoading(false);
    const status = uploadPublisherLogoResponse.status;
    if (status === 201) {
      alertify.success(`Status: ${status} - Logo updated successfully`);
      const publisher = uploadPublisherLogoResponse.data;
      setPublisherLogoImageUrl(publisher.logo_image_url);
    }
  };
  return (
    <div className="publishers-edit-page-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="publishers-edit-header-container">
        <h1 className="publishers-edit-header">PUBLİSHER EDIT</h1>
      </div>
      <div className="publisher-container">
        <div
          className="image-logo-container"
          onMouseEnter={handleLogoImageButtonTrue}
          onMouseLeave={handleLogoImageButtonFalse}
        >
          <img
            className={logoImageLoading ? "image" : "image-active"}
            src={
              publisherLogoImageUrl === ""
                ? process.env.PUBLIC_URL + "/no-image.png"
                : publisherLogoImageUrl
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
        <div className="publisher-edit-form-container">
          <form className="publisher-edit-form">
            <TextField
              id="outlined-basic"
              label="Tracking ID"
              variant="outlined"
              value={publisherTrackingId}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Publisher Name"
              variant="outlined"
              value={publisherName}
              onChange={handlePublisherNameChange}
            />
            <TextField
              id="outlined-basic"
              label="Publisher Name"
              variant="outlined"
              value={publisherRedirectLink}
              onChange={handlePublisherRedirectLinkChange}
            />
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

export default PublishersEditPage;
