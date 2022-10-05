import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  approveRefuseJob,
  fetchJobs,
  highlightJob,
  highlightOrderJob,
  removeJobById,
} from "../../features/jobs/jobsAPI";
import {
  addJobs,
  getAllJobs,
  updateJob,
  removeJob,
  getJobsPage,
  updateJobsPage,
  getJobSearchObject,
  updateJobSearchObject,
} from "../../features/jobs/jobsSlice";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import "./JobsPage.scss";
import Button from "@mui/material/Button";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Pagination from "@mui/material/Pagination";
import { getCookie } from "../../helpers/authHelper";
import alertify from "alertifyjs";
import { getTotal } from "../../features/total/totalSlice";
import { Helmet } from "react-helmet";
import NativeSelect from "@mui/material/NativeSelect";
import { DateHelper } from "../../helpers/dateHelper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const JobsPage = () => {
  const dispatch = useDispatch();
  const [pageTitle, setPageTitle] = useState("");
  const [loadingApproved, setLoadingApproved] = useState("");
  const [loadingRefused, setLoadingRefused] = useState("");
  const [loadingDelete, setLoadingDelete] = useState("");
  const [highlightedJobs, setHighlightedJobs] = useState([]);
  const [loadingHighlightedTrue, setLoadingHighlightedTrue] = useState("");
  const [loadingHighlightedFalse, setLoadingHighlightedFalse] = useState("");

  const [orderByFilter, setOrderByFilter] = useState("date");
  const [orderFilter, setOrderFilter] = useState("DESC");

  const [whatInput, setWhatInput] = useState("");

  useEffect(() => {
    async function fetchData() {
      SetPageTitle();
      const jobsResponse = await fetchJobs({
        page: jobsPage,
        sort_by: jobSearchObject.sort_by,
        query_text: jobSearchObject.query_text,
      });
      dispatch(addJobs(jobsResponse.data));
      const highlightedJobsResponse = await fetchJobs({
        page: 1,
        is_highlighted: true,
      });
      setHighlightedJobs(highlightedJobsResponse.data);
      setOrderByFilter(jobSearchObject.sort_by);
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
  const handlePaginationChange = async (e) => {
    console.log(jobSearchObject);
    const requestedPage = e.target.textContent;
    if (jobsPage !== requestedPage) {
      dispatch(updateJobsPage(requestedPage));
      const jobsResponse = await fetchJobs({
        page: requestedPage,
        sort_by: jobSearchObject.sort_by,
        query_text: jobSearchObject.query_text,
      });
      dispatch(addJobs(jobsResponse.data));
    }
  };
  const handleChangeApprove = async (id) => {
    const token = getCookie("k_t");
    setLoadingApproved(id);
    const approveRefuseResponse = await approveRefuseJob(token, id);
    setLoadingApproved("");
    const status = approveRefuseResponse.status;
    if (status === 200) {
      const UpdatedJobTrackingId = approveRefuseResponse.data.tracking_id;
      const UpdatedJob = approveRefuseResponse.data;
      dispatch(updateJob(UpdatedJob));
      alertify.success(
        `Status: ${status} - Item #${UpdatedJobTrackingId} has been updated`
      );
    }
  };
  const handleChangeRefuse = async (id) => {
    const token = getCookie("k_t");
    setLoadingApproved(id);
    const approveRefuseResponse = await approveRefuseJob(token, id);
    setLoadingApproved("");
    const status = approveRefuseResponse.status;
    if (status === 200) {
      const UpdatedJobTrackingId = approveRefuseResponse.data.tracking_id;
      const UpdatedJob = approveRefuseResponse.data;
      dispatch(updateJob(UpdatedJob));
      alertify.success(
        `Status: ${status} - Item #${UpdatedJobTrackingId} has been updated`
      );
    }
  };
  const handleRemoveJob = async (id, tracking_id) => {
    const token = getCookie("k_t");
    setLoadingDelete(id);
    const removeJobResponse = await removeJobById(token, id);
    setLoadingDelete("");
    const status = removeJobResponse.status;
    if (status === 200) {
      dispatch(removeJob(id));
      alertify.success(
        `Status: ${status} - Item #${tracking_id} has been deleted`
      );
    }
  };
  const handleDate = (date) => {
    return DateHelper(date);
  };
  const handleChangeHiglightedTrue = async (id) => {
    const token = getCookie("k_t");
    setLoadingHighlightedTrue(id);
    const highlightResponse = await highlightJob(token, id);
    setLoadingHighlightedTrue("");
    const status = highlightResponse.status;
    if (status === 200) {
      const UpdatedJobTrackingId = highlightResponse.data.tracking_id;
      const UpdatedJob = highlightResponse.data;
      dispatch(updateJob(UpdatedJob));
      const highlightedJobsResponse = await fetchJobs({
        page: 1,
        is_highlighted: true,
      });
      setHighlightedJobs(highlightedJobsResponse.data);
      alertify.success(
        `Status: ${status} - Item #${UpdatedJobTrackingId} has been updated`
      );
    }
  };
  const handleChangeHiglightedFalse = async (id) => {
    const token = getCookie("k_t");
    setLoadingHighlightedFalse(id);
    const highlightResponse = await highlightJob(token, id);
    setLoadingHighlightedFalse("");
    const status = highlightResponse.status;
    if (status === 200) {
      const UpdatedJobTrackingId = highlightResponse.data.tracking_id;
      const UpdatedJob = highlightResponse.data;
      dispatch(updateJob(UpdatedJob));
      const highlightedJobsResponse = await fetchJobs({
        page: 1,
        is_highlighted: true,
      });
      setHighlightedJobs(highlightedJobsResponse.data);
      alertify.success(
        `Status: ${status} - Item #${UpdatedJobTrackingId} has been updated`
      );
    } else {
      alertify.error(
        `Status: ${400} - Item #${id} can't be updated because it is not activated`
      );
    }
  };
  const handleHighlightOrderchange = async (e, id) => {
    const highlightOrderValue = e.target.value;
    const token = getCookie("k_t");
    const highlightOrderResponse = await highlightOrderJob(token, id, {
      highlight_order: highlightOrderValue,
    });
    const status = highlightOrderResponse.status;
    if (status === 200) {
      const UpdatedJobTrackingId = highlightOrderResponse.data.tracking_id;
      const UpdatedJob = highlightOrderResponse.data;
      dispatch(updateJob(UpdatedJob));
      alertify.success(
        `Status: ${status} - Item #${UpdatedJobTrackingId} has been updated`
      );
    }
  };
  const handleChangeOrderBy = (orderBy) => {
    setOrderByFilter(orderBy);
    const newJobSearchObject = {
      sort_by: orderByFilter,
      sort: jobSearchObject.sort,
      query_text: jobSearchObject.query_text,
    };
    dispatch(updateJobSearchObject(newJobSearchObject));
  };
  const handleChangeOrder = () => {
    if (orderFilter === "DESC") {
      setOrderFilter("ASC");
    } else {
      setOrderFilter("DESC");
    }
    const newJobSearchObject = {
      sort_by: jobSearchObject.sort_by,
      sort: orderFilter,
      query_text: jobSearchObject.query_text,
    };
    dispatch(updateJobSearchObject(newJobSearchObject));
  };
  const jobs = useSelector(getAllJobs);
  const total = useSelector(getTotal);
  const jobsPage = useSelector(getJobsPage);
  const jobSearchObject = useSelector(getJobSearchObject);
  useEffect(() => {
    async function fetchData() {
      const jobsResponse = await fetchJobs({
        page: jobsPage,
        sort_by: jobSearchObject.sort_by,
        sort: jobSearchObject.sort,
        query_text: jobSearchObject.query_text,
      });
      dispatch(addJobs(jobsResponse.data));
    }
    fetchData();
  }, [jobSearchObject]);
  const handleChangeWhat = (e) => {
    const inputValue = e.target.value;
    setWhatInput(inputValue);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newJobSearchObject = {
      sort_by: jobSearchObject.sort_by,
      sort: jobSearchObject.sort,
      query_text: whatInput,
    };
    const jobsResponse = await fetchJobs({
      page: jobsPage,
      sort_by: jobSearchObject.sort_by,
      sort: jobSearchObject.sort,
      query_text: whatInput,
    });
    dispatch(addJobs(jobsResponse.data));
    dispatch(updateJobSearchObject(newJobSearchObject));
  };
  return (
    <div className="jobs-page-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="search-form-what-container">
        <form className="search-form-what" onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="What"
            variant="outlined"
            value={whatInput}
            onChange={handleChangeWhat}
          />
          <LoadingButton
            size="small"
            color="primary"
            onClick={handleSubmit}
            // loading={loading}
            loadingPosition="start"
            startIcon={<SearchIcon />}
            variant="contained"
          >
            Search
          </LoadingButton>
        </form>
      </div>
      <div className="list-table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th></th>
              <th className="table-header">
                <div className="table-header-inner">
                  <h5
                    className="table-header"
                    onClick={() => handleChangeOrderBy("tracking_id")}
                  >
                    Tracking ID
                  </h5>
                  <div
                    className={
                      orderByFilter === "tracking_id" && orderFilter === "ASC"
                        ? "table-header-icon-active"
                        : "table-header-icon"
                    }
                    onClick={handleChangeOrder}
                  >
                    <KeyboardArrowDownIcon fontSize="medium" />
                  </div>
                </div>
              </th>
              <th className="table-header">
                <div className="table-header-inner">
                  <h5
                    className="table-header"
                    onClick={() => handleChangeOrderBy("job_title")}
                  >
                    Title
                  </h5>
                  <div
                    className={
                      orderByFilter === "job_title" && orderFilter === "ASC"
                        ? "table-header-icon-active"
                        : "table-header-icon"
                    }
                    onClick={handleChangeOrder}
                  >
                    <KeyboardArrowDownIcon fontSize="medium" />
                  </div>
                </div>
              </th>
              <th className="table-header">
                <div className="table-header-inner">
                  <h5
                    className="table-header"
                    onClick={() => handleChangeOrderBy("company")}
                  >
                    Company
                  </h5>
                  <div
                    className={
                      orderByFilter === "company" && orderFilter === "ASC"
                        ? "table-header-icon-active"
                        : "table-header-icon"
                    }
                    onClick={handleChangeOrder}
                  >
                    <KeyboardArrowDownIcon fontSize="medium" />
                  </div>
                </div>
              </th>
              <th className="table-header">
                <div className="table-header-inner">
                  <h5
                    className="table-header"
                    onClick={() => handleChangeOrderBy("job_location")}
                  >
                    Location
                  </h5>
                  <div
                    className={
                      orderByFilter === "job_location" && orderFilter === "ASC"
                        ? "table-header-icon-active"
                        : "table-header-icon"
                    }
                    onClick={handleChangeOrder}
                  >
                    <KeyboardArrowDownIcon fontSize="medium" />
                  </div>
                </div>
              </th>
              <th className="table-header">
                <div className="table-header-inner">
                  <h5
                    className="table-header"
                    onClick={() => handleChangeOrderBy("date")}
                  >
                    Date
                  </h5>
                  <div
                    className={
                      orderByFilter === "date" && orderFilter === "ASC"
                        ? "table-header-icon-active"
                        : "table-header-icon"
                    }
                    onClick={handleChangeOrder}
                  >
                    <KeyboardArrowDownIcon fontSize="medium" />
                  </div>
                </div>
              </th>
              <th className="table-header">Tags</th>
              <th>Link</th>
              <th>Redirect</th>
              <th className="table-header">
                <div className="table-header-inner">
                  <h5
                    className="table-header"
                    onClick={() => handleChangeOrderBy("is_highlighted")}
                  >
                    Highlighted
                  </h5>
                  <div
                    className={
                      orderByFilter === "is_highlighted" &&
                      orderFilter === "ASC"
                        ? "table-header-icon-active"
                        : "table-header-icon"
                    }
                    onClick={handleChangeOrder}
                  >
                    <KeyboardArrowDownIcon fontSize="medium" />
                  </div>
                </div>
              </th>
              <th className="table-header">
                <div className="table-header-inner">
                  <h5
                    className="table-header"
                    onClick={() => handleChangeOrderBy("highlight_order")}
                  >
                    Highlight Order
                  </h5>
                  <div
                    className={
                      orderByFilter === "highlight_order" &&
                      orderFilter === "ASC"
                        ? "table-header-icon-active"
                        : "table-header-icon"
                    }
                    onClick={handleChangeOrder}
                  >
                    <KeyboardArrowDownIcon fontSize="medium" />
                  </div>
                </div>
              </th>
              <th className="table-header">
                <div className="table-header-inner">
                  <h5
                    className="table-header"
                    onClick={() => handleChangeOrderBy("is_approved")}
                  >
                    Status
                  </h5>
                  <div
                    className={
                      orderByFilter === "is_approved" && orderFilter === "ASC"
                        ? "table-header-icon-active"
                        : "table-header-icon"
                    }
                    onClick={handleChangeOrder}
                  >
                    <KeyboardArrowDownIcon fontSize="medium" />
                  </div>
                </div>
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {jobs ? (
              jobs.map((job) => {
                return (
                  <tr key={job._id} className="job">
                    <td className="job-company-image">
                      <img
                        src={
                          job.job_company
                            ? job.job_company.logo_image_url === ""
                              ? `${process.env.PUBLIC_URL}/no-image.png`
                              : job.job_company.logo_image_url
                            : `${process.env.PUBLIC_URL}/no-image.png`
                        }
                        alt=""
                      />
                    </td>
                    <td
                      className={
                        orderByFilter === "tracking_id"
                          ? "job-tracking-id-active"
                          : "job-tracking-id"
                      }
                    >
                      <h4 className="job-tracking-id-header">
                        {job.tracking_id}
                      </h4>
                    </td>
                    <td
                      className={
                        orderByFilter === "job_title"
                          ? "job-title-active"
                          : "job-title"
                      }
                    >
                      <h4 className="job-title-header">{job.job_title}</h4>
                    </td>
                    <td
                      className={
                        orderByFilter === "company"
                          ? "job-company-name-active"
                          : "job-company-name"
                      }
                    >
                      <h4 className="job-company-name-header">
                        {job.job_company ? job.job_company.name : "-"}
                      </h4>
                    </td>
                    <td
                      className={
                        orderByFilter === "job_location"
                          ? "job-location-active"
                          : "job-location"
                      }
                    >
                      <h4 className="job-location-header">
                        {job.job_location}
                      </h4>
                    </td>
                    <td
                      className={
                        orderByFilter === "date"
                          ? "job-date-active"
                          : "job-date"
                      }
                    >
                      <h4 className="job-date-header">
                        {handleDate(job.date)}
                      </h4>
                    </td>
                    <td className="job-tags">
                      {job.job_tags.length !== 0 ? (
                        <ul className="tag-list">
                          {job.job_tags.map((tag) => {
                            return (
                              <li className="tag-item" key={tag._id}>
                                <Button variant="contained" color="primary">
                                  {tag.tag_name.toUpperCase()}
                                </Button>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <div className="tag-list-none">
                          <Button variant="contained" color="inherit">
                            NONE
                          </Button>
                        </div>
                      )}
                    </td>
                    <td>
                      <a href={job.job_link} rel="noreferrer" target="_blank">
                        <Button variant="outlined" startIcon={<LinkIcon />}>
                          LINK
                        </Button>
                      </a>
                    </td>
                    <td>{job.job_views}</td>
                    <td
                      className={
                        orderByFilter === "is_highlighted"
                          ? "job-highlighted-active"
                          : "job-highlighted"
                      }
                    >
                      {job.is_highlighted === true ? (
                        <LoadingButton
                          size="small"
                          // onClick={handleClick}
                          startIcon={<CheckCircleOutlineIcon />}
                          loading={
                            loadingHighlightedTrue === job._id ? true : false
                          }
                          loadingPosition="start"
                          variant="contained"
                          color="success"
                          onClick={() => handleChangeHiglightedTrue(job._id)}
                        >
                          TRUE
                        </LoadingButton>
                      ) : (
                        <LoadingButton
                          size="small"
                          // onClick={handleClick}
                          startIcon={<HighlightOffIcon />}
                          loading={
                            loadingHighlightedFalse === job._id ? true : false
                          }
                          loadingPosition="start"
                          variant="contained"
                          color="error"
                          onClick={() => handleChangeHiglightedFalse(job._id)}
                        >
                          FALSE
                        </LoadingButton>
                      )}
                    </td>
                    <td
                      className={
                        orderByFilter === "highlight_order"
                          ? "job-highlight-order-active"
                          : "job-highlight-order"
                      }
                    >
                      <NativeSelect
                        inputProps={{
                          name: "order",
                          id: "uncontrolled-native",
                        }}
                        disabled={!job.is_highlighted}
                        onChange={(event) =>
                          handleHighlightOrderchange(event, job._id)
                        }
                      >
                        <option
                          value={
                            job.highlight_order ? job.highlight_order : "Empty"
                          }
                        >
                          {job.highlight_order ? job.highlight_order : "Empty"}
                        </option>
                        {highlightedJobs.map((job, index) => {
                          return (
                            <option value={index + 1} key={job._id}>
                              {index + 1}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </td>
                    <td
                      className={
                        orderByFilter === "is_approved"
                          ? "job-status-active"
                          : "job-status"
                      }
                    >
                      {job.is_approved === true ? (
                        <LoadingButton
                          size="small"
                          // onClick={handleClick}
                          startIcon={<CheckCircleOutlineIcon />}
                          loading={loadingApproved === job._id ? true : false}
                          loadingPosition="start"
                          variant="contained"
                          color="success"
                          onClick={() => handleChangeApprove(job._id)}
                        >
                          Approved
                        </LoadingButton>
                      ) : (
                        <LoadingButton
                          size="small"
                          // onClick={handleClick}
                          startIcon={<HighlightOffIcon />}
                          loading={loadingRefused === job._id ? true : false}
                          loadingPosition="start"
                          variant="contained"
                          color="error"
                          onClick={() => handleChangeRefuse(job._id)}
                        >
                          Refused
                        </LoadingButton>
                      )}
                    </td>
                    <td>
                      <Link to={`/dashboard/lists/jobs/${job._id}/edit`}>
                        <LoadingButton
                          size="small"
                          // onClick={handleClick}
                          startIcon={<EditIcon />}
                          loadingPosition="start"
                          variant="contained"
                          color="warning"
                        >
                          Edit
                        </LoadingButton>
                      </Link>
                    </td>
                    <td>
                      <LoadingButton
                        size="small"
                        // onClick={handleClick}
                        startIcon={<DeleteIcon />}
                        // loading={loading}
                        loading={loadingDelete === job._id ? true : false}
                        loadingPosition="start"
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleRemoveJob(job._id, job.tracking_id)
                        }
                      >
                        Delete
                      </LoadingButton>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div></div>
            )}
          </tbody>
        </table>
        <div className="pagination-container">
          <Pagination
            count={total ? parseInt(total["job"] / 10) + 3 : 0}
            variant="outlined"
            shape="rounded"
            color="secondary"
            onChange={handlePaginationChange}
            hideNextButton
            hidePrevButton
          />
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
