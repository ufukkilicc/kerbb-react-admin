import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import "./PublishersPage.scss";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Button from "@mui/material/Button";
import {
  fetchPublishers,
  removePublisher,
} from "../../features/publishers/publishersAPI";
import {
  addPublishers,
  deletePublisher,
  getAllPublishers,
  getAllPublishersPage,
  updatePublishersPage,
} from "../../features/publishers/publishersSlice";
import Pagination from "@mui/material/Pagination";
import { getTotal } from "../../features/total/totalSlice";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getCookie } from "../../helpers/authHelper";
import alertify from "alertifyjs";

const PublishersPage = () => {
  const [loadingRemove, setLoadingRemove] = useState(false);

  const [pageTitle, setPageTitle] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      SetPageTitle();
      const publishersResponse = await fetchPublishers({
        page: publishersPage,
        size: 10,
      });
      dispatch(addPublishers(publishersResponse.data));
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
  const handleRemovePublisher = async (id, tracking_id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const token = getCookie("k_t");
      setLoadingRemove(id);
      const removePublisherResponse = await removePublisher(token, id);
      setLoadingRemove("");
      const status = removePublisherResponse.status;
      if (status === 200) {
        dispatch(deletePublisher(id));
        alertify.success(
          `Status: ${status} - Item #${tracking_id} has been deleted`
        );
      } else {
        alertify.error(`Status: ${500} - Error occured`);
      }
    }
  };
  const handlePaginationChange = async (e) => {
    const requestedPage = e.target.textContent;
    if (publishersPage !== requestedPage) {
      dispatch(updatePublishersPage(requestedPage));
      const publishersResponseSecond = await fetchPublishers({
        page: requestedPage,
        size: 7,
      });
      dispatch(addPublishers(publishersResponseSecond.data));
    }
  };
  const publishers = useSelector(getAllPublishers);
  const publishersPage = useSelector(getAllPublishersPage);
  const total = useSelector(getTotal);
  return (
    <div className="publishers-page-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="publisher-add-button-container">
        <Link to="/dashboard/features/publishers/add">
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
              <th>Tracking ID</th>
              <th>Publisher Name</th>
              <th>Publisher Redirect Link</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {publishers.map((publisher) => {
              return (
                <tr key={publisher._id} className="publisher">
                  <td className="publisher-image">
                    <img
                      src={
                        publisher.logo_image_url === ""
                          ? `${process.env.PUBLIC_URL}/no-image.png`
                          : publisher.logo_image_url
                      }
                      alt=""
                    />
                  </td>
                  <td className="publisher-tracking-id">
                    <h4 className="publisher-tracking-id-header">
                      {publisher.tracking_id}
                    </h4>
                  </td>
                  <td className="publisher-name">
                    <h4 className="publisher-name-header">
                      {publisher.publisher_name}
                    </h4>
                  </td>
                  <td className="publisher-redirect-link">
                    <a
                      href={publisher.publisher_redirect_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <h4 className="publisher-redirect-link-header">
                        {publisher.publisher_redirect_link}
                      </h4>
                    </a>
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/features/publishers/${publisher._id}/edit`}
                    >
                      <LoadingButton
                        size="small"
                        // onClick={handleClick}
                        startIcon={<EditIcon />}
                        // loading={loadingDelete === news._id ? true : false}
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
                      loading={loadingRemove === publisher._id ? true : false}
                      loadingPosition="start"
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handleRemovePublisher(
                          publisher._id,
                          publisher.tracking_id
                        )
                      }
                    >
                      Delete
                    </LoadingButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination-container">
          <Pagination
            count={total ? parseInt(total["publisher"] / 10) + 1 : 0}
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

export default PublishersPage;
