import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import "./PublishersAddPage.scss";
import alertify from "alertifyjs";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { getCookie } from "../../helpers/authHelper";
import { postPublisher } from "../../features/publishers/publishersAPI";
import { useNavigate } from "react-router-dom";

const PublishersAddPage = () => {
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState("");

  const [publisherName, setPublisherName] = useState("");
  const [publisherRedirectLink, setPublisherRedirectLink] = useState("");

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      SetPageTitle();
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
  const handleChangePublisherName = (e) => {
    const inputValue = e.target.value;
    setPublisherName(inputValue);
  };
  const handleChangePublisherRedirectLink = (e) => {
    const inputValue = e.target.value;
    setPublisherRedirectLink(inputValue);
  };
  const handleSubmit = async () => {
    const token = getCookie("k_t");
    const body = {
      publisher_name: publisherName,
      publisher_redirect_link: publisherRedirectLink,
    };
    setSubmitButtonLoading(true);
    const postPublisherResponse = await postPublisher(token, body);
    setSubmitButtonLoading(false);
    const status = postPublisherResponse.status;
    if (status === 201) {
      setPublisherName("");
      setPublisherRedirectLink("");
      navigate("/dashboard/features/publishers");
      alertify.success(`Status: ${status} - Item has been added successfully`);
    } else {
      alertify.error(`Status: ${500} - Error occured`);
    }
  };
  return (
    <div className="publishers-add-page-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="publishers-add-header-container">
        <h1 className="publishers-add-header">PUBLİSHER ADD</h1>
      </div>
      <div className="publisher-container">
        <div className="publisher-add-form-container">
          <form className="publisher-add-form">
            <TextField
              id="outlined-basic"
              label="Publisher Name"
              variant="outlined"
              value={publisherName}
              onChange={handleChangePublisherName}
            />
            <TextField
              id="outlined-basic"
              label="Publisher Redirect Link"
              variant="outlined"
              value={publisherRedirectLink}
              onChange={handleChangePublisherRedirectLink}
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
              Add
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishersAddPage;
