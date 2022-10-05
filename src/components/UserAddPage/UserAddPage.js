import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserAddPage.scss";
import { getCookie } from "../../helpers/authHelper";
import alertify from "alertifyjs";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { fetchRoles } from "../../features/roles/rolesAPI";
import { addRoles, getAllRoles } from "../../features/roles/rolesSlice";
import Button from "@mui/material/Button";
import { postUser } from "../../features/users/usersAPI";
import { postUserObject } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const UserAddPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRoles, setUserRoles] = useState([]);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const rolesResponse = await fetchRoles({ page: 1 });
      dispatch(addRoles(rolesResponse.data));
    }
    fetchData();
  }, []);

  const handleChangeName = (e) => {
    const user_name = e.target.value;
    setUserName(user_name);
  };
  const handleChangeSurname = (e) => {
    const user_surname = e.target.value;
    setUserSurname(user_surname);
  };
  const handleChangeEmail = (e) => {
    const user_email = e.target.value;
    setUserEmail(user_email);
  };
  const handleChangePassword = (e) => {
    const user_password = e.target.value;
    setUserPassword(user_password);
  };
  const handleSelectChange = (e) => {
    const selectedRole = e.target.value;
    let user_roles = userRoles;
    user_roles.push(selectedRole);
    setUserRoles([...userRoles]);
  };
  const handleSubmit = async () => {
    const token = getCookie("k_t");
    setSubmitButtonLoading(true);
    const postUserResponse = await postUser(token, {
      user_name: userName,
      user_surname: userSurname,
      user_email: userEmail,
      user_password: userPassword,
      user_roles: userRoles,
    });
    setSubmitButtonLoading(false);
    const status = postUserResponse.status;
    if (status === 201) {
      alertify.success(`Status: ${status} - Item has been added successfully`);
      const user = postUserResponse.data;
      dispatch(postUserObject(user));
      navigate("/dashboard/lists/users");
    }
  };
  const roles = useSelector(getAllRoles);
  return (
    <div className="user-add-page-container">
      <Helmet>
        <title>User Add</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="user-add-header-container">
        <h1 className="user-add-header">USER ADD</h1>
      </div>
      <div className="user-container">
        <div className="user-add-form-container">
          <form className="user-add-form">
            <div className="user-add-form-fields">
              <TextField
                id="outlined-basic"
                label="NAME"
                variant="outlined"
                onChange={handleChangeName}
              />
              <TextField
                id="outlined-basic"
                label="SURNAME"
                variant="outlined"
                onChange={handleChangeSurname}
              />
              <TextField
                id="outlined-basic"
                label="EMAIL"
                variant="outlined"
                onChange={handleChangeEmail}
              />
              <TextField
                id="outlined-basic"
                label="PASSWORD"
                type="password"
                variant="outlined"
                onChange={handleChangePassword}
                autoComplete="new-password"
              />
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                //   value={age}
                label="Roles"
                onChange={handleSelectChange}
              >
                {roles.map((role) => {
                  return (
                    <MenuItem value={role} key={role._id}>
                      {role.role_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className="user-add-form-roles">
              <ul className="user-add-form-roles-list">
                {userRoles.map((role) => {
                  return (
                    <li className="roles-item" key={role._id}>
                      <Button variant="contained" color="primary">
                        {role.role_name.toUpperCase()}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
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

export default UserAddPage;
