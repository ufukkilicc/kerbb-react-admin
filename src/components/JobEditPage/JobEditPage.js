import React, { useEffect, useState } from "react";
import "./JobsEditPage.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import { fetchJob } from "../../features/jobs/jobsAPI";
import { addJob, getOneJob } from "../../features/jobs/jobsSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { Helmet } from "react-helmet";

const JobEditPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [jobTitle, setJobTitle] = useState("");
  const [jobCompanyTitle, setJobCompanyTitle] = useState("");
  const [jobCompanyImage, setJobCompanyImage] = useState("");
  const [jobTrackingId, setJobTrackingId] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobViews, setJobViews] = useState(0);
  const [jobLink, setJobLink] = useState("");
  const [jobTags, setJobTags] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  useEffect(() => {
    async function fetchData() {
      SetPageTitle();
      const jobDetailResponse = await fetchJob(id);
      const job = jobDetailResponse.data;
      dispatch(addJob(job));
      setJobTitle(job.job_title);
      setJobCompanyTitle(job.job_company.name);
      setJobCompanyImage(job.job_company.logo_image_url);
      setJobTrackingId(job.tracking_id);
      setJobLocation(job.job_location);
      setJobViews(job.job_views);
      setJobLink(job.job_link);
      setJobTags(job.job_tags);
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
  const handleChangeJobTitle = (e) => {
    const job_title = e.target.value;
    setJobTitle(job_title);
  };
  const job = useSelector(getOneJob);
  return (
    <div className="jobs-edit-page-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="job-edit-header-container">
        <h1 className="job-edit-header">JOB EDIT</h1>
      </div>
      <div className="job-container">
        <div className="image-container">
          <img src={jobCompanyImage} alt="" />
        </div>
        <div className="job-edit-form-container">
          <form className="job-edit-form">
            <TextField
              id="outlined-basic"
              label="ID"
              variant="outlined"
              value={jobTrackingId}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Job Company"
              variant="outlined"
              value={jobCompanyTitle}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Job Location"
              variant="outlined"
              value={jobLocation}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Views"
              variant="outlined"
              value={jobViews}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Job Link"
              variant="outlined"
              value={jobLink}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={jobTitle}
              onChange={handleChangeJobTitle}
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
              // onClick={handleClick}
              // loading={loading}
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

export default JobEditPage;
