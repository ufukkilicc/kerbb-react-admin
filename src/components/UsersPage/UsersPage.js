import React, { useEffect, useState } from "react";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import "./UsersPage.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, removeUser } from "../../features/users/usersAPI";
import {
  addUsers,
  deleteUser,
  getAllUsers,
  getUsersPage,
  updateUsersPage,
} from "../../features/users/usersSlice";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Link } from "react-router-dom";
import { getTotal } from "../../features/total/totalSlice";
import Pagination from "@mui/material/Pagination";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Helmet } from "react-helmet";
import { getCookie } from "../../helpers/authHelper";
import alertify from "alertifyjs";

const UsersPage = () => {
  const dispatch = useDispatch();
  const [pageTitle, setPageTitle] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  useEffect(() => {
    async function fetchData() {
      SetPageTitle();
      const usersResponse = await fetchUsers({ page: usersPage });
      dispatch(addUsers(usersResponse.data));
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
    if (usersPage !== requestedPage) {
      dispatch(updateUsersPage(requestedPage));
      const usersResponseSecond = await fetchUsers({
        page: requestedPage,
      });
      dispatch(addUsers(usersResponseSecond.data));
    }
  };
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Do you really want to delete this item?")) {
      const token = getCookie("k_t");
      setLoadingDelete(true);
      const deleteUserResponse = await removeUser(token, userId);
      const status = deleteUserResponse.status;
      if (status === 200) {
        if (status === 200) {
          alertify.success(
            `Status: ${status} - Item #${deleteUserResponse.data.tracking_id} has been removed`
          );
        }
      }
      dispatch(deleteUser(deleteUserResponse.data._id));
      setLoadingDelete(false);
    }
  };
  const users = useSelector(getAllUsers);
  const total = useSelector(getTotal);
  const usersPage = useSelector(getUsersPage);
  return (
    <div className="users-page-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="users-add-button-container">
        <Link to="/dashboard/lists/users/add">
          <Button variant="contained" startIcon={<AddBoxIcon />}>
            Add
          </Button>
        </Link>
      </div>
      <div className="list-table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Roles</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users ? (
              users.map((user) => {
                return (
                  <tr className="user" key={user._id}>
                    <td className="user-tracking-id">
                      <h4 className="user-tracking-id-header">
                        {user.tracking_id}
                      </h4>
                    </td>
                    <td className="user-name">
                      <h4 className="user-name-header">{user.user_name}</h4>
                    </td>
                    <td className="user-surname">
                      <h4 className="user-surname-header">
                        {user.user_surname}
                      </h4>
                    </td>
                    <td className="user-email">
                      <h4 className="user-email-header">{user.user_email}</h4>
                    </td>
                    <td className="user-roles">
                      {user.user_roles.length !== 0 ? (
                        <ul className="roles-list">
                          {user.user_roles.map((role) => {
                            return (
                              <li className="roles-item" key={role._id}>
                                <Button variant="contained" color="primary">
                                  {role.role_name.toUpperCase()}
                                </Button>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <div className="roles-list-none">
                          <Button variant="contained" color="inherit">
                            NONE
                          </Button>
                        </div>
                      )}
                    </td>
                    <td>
                      <Link to={`/dashboard/users/${user._id}/edit`}>
                        <LoadingButton
                          size="small"
                          // onClick={handleClick}
                          startIcon={<EditIcon />}
                          // loading={loadingDelete === job._id ? true : false}
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
                        onClick={() => handleDeleteUser(user._id)}
                        startIcon={<DeleteIcon />}
                        loading={loadingDelete}
                        loadingPosition="start"
                        variant="contained"
                        color="error"
                        // onClick={() =>
                        //   handleRemoveJob(job._id, job.tracking_id)
                        // }
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
            count={total ? parseInt(total["user"] / 10) + 1 : 0}
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

export default UsersPage;
