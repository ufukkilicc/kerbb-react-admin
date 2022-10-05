import React, { useEffect, useState } from "react";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import "./CompaniesPage.scss";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  activateCompany,
  approveRefuseCompany,
  deleteCompany,
  fetchCompanies,
  highlightCompany,
  highlightOrderCompany,
} from "../../features/companies/companiesAPI";
import {
  addCompanies,
  getAllCompanies,
  getCompaniesPage,
  removeCompany,
  updateCompaniesPage,
  updateCompany,
} from "../../features/companies/companiesSlice";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Button from "@mui/material/Button";
import { getCookie } from "../../helpers/authHelper";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { getTotal } from "../../features/total/totalSlice";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Helmet } from "react-helmet";
import DeleteIcon from "@mui/icons-material/Delete";
import NativeSelect from "@mui/material/NativeSelect";

const CompaniesPage = () => {
  const dispatch = useDispatch();
  const [loadingHighlightedTrue, setLoadingHighlightedTrue] = useState("");
  const [loadingHighlightedFalse, setLoadingHighlightedFalse] = useState("");
  const [loadingStatusActive, setLoadingStatusActive] = useState("");
  const [loadingStatusPending, setLoadingStatusPending] = useState("");
  const [loadingDeleteButton, setLoadingDeleteButton] = useState(false);
  const [highlightedCompanies, setHighlightedCompanies] = useState([]);
  const [loadingApproved, setLoadingApproved] = useState(false);
  const [loadingRefused, setLoadingRefused] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  useEffect(() => {
    async function fetchData() {
      SetPageTitle();
      const companiesResponse = await fetchCompanies({ page: companiesPage });
      dispatch(addCompanies(companiesResponse.data));
      const highlightedCompaniesResponse = await fetchCompanies({
        page: 1,
        is_highlighted: true,
      });
      setHighlightedCompanies(highlightedCompaniesResponse.data);
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
    const requestedPage = e.target.textContent;
    if (companiesPage !== requestedPage) {
      dispatch(updateCompaniesPage(requestedPage));
      const companiesResponseSecond = await fetchCompanies({
        page: requestedPage,
      });
      dispatch(addCompanies(companiesResponseSecond.data));
    }
  };
  const handleChangeHiglightedTrue = async (id) => {
    const token = getCookie("k_t");
    setLoadingHighlightedTrue(id);
    const highlightResponse = await highlightCompany(token, id);
    setLoadingHighlightedTrue("");
    const status = highlightResponse.status;
    if (status === 200) {
      const UpdatedCompanyTrackingId = highlightResponse.data.tracking_id;
      const UpdatedCompany = highlightResponse.data;
      dispatch(updateCompany(UpdatedCompany));
      const highlightedCompaniesResponse = await fetchCompanies({
        page: 1,
        is_highlighted: true,
      });
      setHighlightedCompanies(highlightedCompaniesResponse.data);
      alertify.success(
        `Status: ${status} - Item #${UpdatedCompanyTrackingId} has been updated`
      );
    }
  };
  const handleChangeHiglightedFalse = async (id) => {
    const token = getCookie("k_t");
    setLoadingHighlightedFalse(id);
    const highlightResponse = await highlightCompany(token, id);
    setLoadingHighlightedFalse("");
    const status = highlightResponse.status;
    if (status === 200) {
      const UpdatedCompanyTrackingId = highlightResponse.data.tracking_id;
      const UpdatedCompany = highlightResponse.data;
      dispatch(updateCompany(UpdatedCompany));
      const highlightedCompaniesResponse = await fetchCompanies({
        page: 1,
        is_highlighted: true,
      });
      setHighlightedCompanies(highlightedCompaniesResponse.data);
      alertify.success(
        `Status: ${status} - Item #${UpdatedCompanyTrackingId} has been updated`
      );
    } else {
      alertify.error(
        `Status: ${400} - Item #${id} can't be updated because it is not activated`
      );
    }
  };
  const handleChangeStatusActive = async (id) => {
    const token = getCookie("k_t");
    setLoadingStatusActive(id);
    const activateResponse = await activateCompany(token, id);
    setLoadingStatusActive("");
    const status = activateResponse.status;
    if (status === 200) {
      const UpdatedCompanyTrackingId = activateResponse.data.tracking_id;
      const UpdatedCompany = activateResponse.data;
      dispatch(updateCompany(UpdatedCompany));
      alertify.success(
        `Status: ${status} - Item #${UpdatedCompanyTrackingId} has been updated`
      );
    }
  };
  const handleChangeStatusPending = async (id) => {
    const token = getCookie("k_t");
    setLoadingStatusPending(id);
    const activateResponse = await activateCompany(token, id);
    setLoadingStatusPending("");
    const status = activateResponse.status;
    if (status === 200) {
      const UpdatedCompanyTrackingId = activateResponse.data.tracking_id;
      const UpdatedCompany = activateResponse.data;
      dispatch(updateCompany(UpdatedCompany));
      alertify.success(
        `Status: ${status} - Item #${UpdatedCompanyTrackingId} has been updated`
      );
    }
  };
  const handleCompanyDelete = async (id) => {
    if (window.confirm("Do you really want to delete item?")) {
      const token = getCookie("k_t");
      setLoadingDeleteButton(true);
      const deleteResponse = await deleteCompany(token, id);
      setLoadingDeleteButton(false);
      const status = deleteResponse.status;
      if (status === 200) {
        const removedCompanyId = deleteResponse.data._id;
        dispatch(removeCompany(removedCompanyId));
        alertify.success(`Status: ${status} - Item #${id} has been deleted`);
      }
    }
  };
  const handleHighlightOrderchange = async (e, id) => {
    const highlightOrderValue = e.target.value;
    const token = getCookie("k_t");
    const highlightOrderResponse = await highlightOrderCompany(token, id, {
      highlight_order: highlightOrderValue,
    });
    const status = highlightOrderResponse.status;
    if (status === 200) {
      const UpdatedCompanyTrackingId = highlightOrderResponse.data.tracking_id;
      const UpdatedCompany = highlightOrderResponse.data;
      dispatch(updateCompany(UpdatedCompany));
      alertify.success(
        `Status: ${status} - Item #${UpdatedCompanyTrackingId} has been updated`
      );
    }
  };
  const handleChangeApprove = async (id) => {
    const token = getCookie("k_t");
    setLoadingApproved(id);
    const approveRefuseResponse = await approveRefuseCompany(token, id);
    setLoadingApproved("");
    const status = approveRefuseResponse.status;
    if (status === 200) {
      const UpdatedCompanyTrackingId = approveRefuseResponse.data.tracking_id;
      const UpdatedCompany = approveRefuseResponse.data;
      dispatch(updateCompany(UpdatedCompany));
      alertify.success(
        `Status: ${status} - Item #${UpdatedCompanyTrackingId} has been updated`
      );
    }
  };
  const handleChangeRefuse = async (id) => {
    const token = getCookie("k_t");
    setLoadingRefused(id);
    const approveRefuseResponse = await approveRefuseCompany(token, id);
    setLoadingRefused("");
    const status = approveRefuseResponse.status;
    if (status === 200) {
      const UpdatedCompanyTrackingId = approveRefuseResponse.data.tracking_id;
      const UpdatedCompany = approveRefuseResponse.data;
      dispatch(updateCompany(UpdatedCompany));
      alertify.success(
        `Status: ${status} - Item #${UpdatedCompanyTrackingId} has been updated`
      );
    }
  };
  const companies = useSelector(getAllCompanies);
  const total = useSelector(getTotal);
  const companiesPage = useSelector(getCompaniesPage);
  return (
    <div className="companies-page-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="company-add-button-container">
        <Link to="/dashboard/lists/companies/add">
          <Button variant="contained" startIcon={<AddBoxIcon />}>
            Add
          </Button>
        </Link>
      </div>
      <div className="list-table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th></th>
              <th>Tracking Id</th>
              <th>Title</th>
              <th>Tags</th>
              <th>Job Count</th>
              <th>Highlighted</th>
              <th>Highlight Order</th>
              <th>Approved</th>
              <th>Status</th>
              <th>Redirect</th>
              <th>Views</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {companies ? (
              companies.map((company) => {
                return (
                  <tr
                    key={company._id}
                    className={
                      company.is_highlighted ? "company-highlighted" : "company"
                    }
                  >
                    <td className="company-image">
                      <img
                        src={
                          company.logo_image_url === ""
                            ? `${process.env.PUBLIC_URL}/no-image.png`
                            : company.logo_image_url
                        }
                        alt=""
                      />
                    </td>
                    <td className="company-tracking-id">
                      <h4 className="company-tracking-id-header">
                        {company.tracking_id}
                      </h4>
                    </td>
                    <td className="company-title">
                      <h4 className="company-title-header">{company.name}</h4>
                    </td>
                    <td className="company-tags">
                      {company.company_tags ? (
                        company.company_tags.length !== 0 ? (
                          <ul className="company-tags-list">
                            {company.company_tags.map((tag) => {
                              return (
                                <li className="company-tags-item" key={tag._id}>
                                  <Button variant="contained" color="primary">
                                    {tag.tag_name.toUpperCase()}
                                  </Button>
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <div className="company-tags-list-none">
                            <Button variant="contained" color="inherit">
                              NONE
                            </Button>
                          </div>
                        )
                      ) : (
                        <div className="company-tags-list-none">
                          <Button variant="contained" color="inherit">
                            NONE
                          </Button>
                        </div>
                      )}
                    </td>
                    <td className="company-job-count">
                      <h4 className="company-job-count-header">
                        {company.job_count}
                      </h4>
                    </td>
                    <td className="company-highlighted">
                      {company.is_highlighted === true ? (
                        <LoadingButton
                          size="small"
                          // onClick={handleClick}
                          startIcon={<CheckCircleOutlineIcon />}
                          loading={
                            loadingHighlightedTrue === company._id
                              ? true
                              : false
                          }
                          loadingPosition="start"
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleChangeHiglightedTrue(company._id)
                          }
                        >
                          TRUE
                        </LoadingButton>
                      ) : (
                        <LoadingButton
                          size="small"
                          // onClick={handleClick}
                          startIcon={<HighlightOffIcon />}
                          loading={
                            loadingHighlightedFalse === company._id
                              ? true
                              : false
                          }
                          loadingPosition="start"
                          variant="contained"
                          color="error"
                          onClick={() =>
                            handleChangeHiglightedFalse(company._id)
                          }
                        >
                          FALSE
                        </LoadingButton>
                      )}
                    </td>
                    <td className="company-highlight-order">
                      <NativeSelect
                        inputProps={{
                          name: "order",
                          id: "uncontrolled-native",
                        }}
                        disabled={!company.is_highlighted}
                        onChange={(event) =>
                          handleHighlightOrderchange(event, company._id)
                        }
                      >
                        <option
                          value={
                            company.highlight_order
                              ? company.highlight_order
                              : "Empty"
                          }
                        >
                          {company.highlight_order
                            ? company.highlight_order
                            : "Empty"}
                        </option>
                        {highlightedCompanies.map((company, index) => {
                          return (
                            <option value={index + 1} key={company._id}>
                              {index + 1}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </td>
                    <td className="company-approved">
                      {company.is_approved === true ? (
                        <LoadingButton
                          size="small"
                          // onClick={handleClick}
                          startIcon={<CheckCircleOutlineIcon />}
                          loading={
                            loadingApproved === company._id ? true : false
                          }
                          loadingPosition="start"
                          variant="contained"
                          color="success"
                          onClick={() => handleChangeApprove(company._id)}
                        >
                          Approved
                        </LoadingButton>
                      ) : (
                        <LoadingButton
                          size="small"
                          // onClick={handleClick}
                          startIcon={<HighlightOffIcon />}
                          loading={
                            loadingRefused === company._id ? true : false
                          }
                          loadingPosition="start"
                          variant="contained"
                          color="error"
                          onClick={() => handleChangeRefuse(company._id)}
                        >
                          Refused
                        </LoadingButton>
                      )}
                    </td>
                    <td className="company-status">
                      {company.is_active === true ? (
                        <LoadingButton
                          size="small"
                          // onClick={handleClick}
                          startIcon={<CheckCircleOutlineIcon />}
                          loading={
                            loadingStatusActive === company._id ? true : false
                          }
                          loadingPosition="start"
                          variant="contained"
                          color="success"
                          onClick={() => handleChangeStatusActive(company._id)}
                        >
                          ACTIVE
                        </LoadingButton>
                      ) : (
                        <LoadingButton
                          size="small"
                          // onClick={handleClick}
                          startIcon={<HighlightOffIcon />}
                          loading={
                            loadingStatusPending === company._id ? true : false
                          }
                          loadingPosition="start"
                          variant="contained"
                          color="warning"
                          onClick={() => handleChangeStatusPending(company._id)}
                        >
                          PENDING
                        </LoadingButton>
                      )}
                    </td>
                    <td className="company-redirect">
                      <h4 className="company-redirect-header">
                        {company.redirect_count}
                      </h4>
                    </td>
                    <td className="company-views">
                      <h4 className="company-views-header">
                        {company.company_views}
                      </h4>
                    </td>
                    <td className="company-edit">
                      <Link
                        to={`/dashboard/lists/companies/${company._id}/edit`}
                      >
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
                    <td className="company-remove">
                      <LoadingButton
                        size="small"
                        // onClick={handleClick}
                        startIcon={<DeleteIcon />}
                        loading={loadingDeleteButton}
                        loadingPosition="start"
                        variant="contained"
                        color="error"
                        onClick={() => handleCompanyDelete(company._id)}
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
      </div>
      <div className="pagination-container">
        <Pagination
          count={total ? parseInt(total["company"] / 10) + 1 : 0}
          variant="outlined"
          shape="rounded"
          color="secondary"
          onChange={handlePaginationChange}
          hideNextButton
          hidePrevButton
        />
      </div>
    </div>
  );
};

export default CompaniesPage;
