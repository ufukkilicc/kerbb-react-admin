import authApi from "../../common/apis/authApi";
import axios from "axios";
import BASE_URL from "../../common/apis/Api";

export const authLogin = async (body) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/auth/login`,
    data: {
      user_email: body.user_email,
      user_password: body.user_password,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
export const authForgotPassword = async (body) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/auth/forgot-password`,
    data: {
      user_email: body.user_email,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
export const authResetPassword = async (body, token) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/auth/reset-password?resetPasswordToken=${token}`,
    data: {
      reset_password: body.reset_password,
      reset_password_retype: body.reset_password_retype,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
export const authProfile = async (token) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/auth/profile`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
export const authUpdateProfile = async (token, body) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/auth/update-profile`,
    data: {
      user_name: body.user_name,
      user_surname: body.user_surname,
      user_email: body.user_email,
    },
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
export const authUpdatePassword = async (token, body) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/auth/update-password`,
    data: {
      old_password: body.old_password,
      new_password: body.new_password,
      new_password_again: body.new_password_again,
    },
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
