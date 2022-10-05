import axios from "axios";
import BASE_URL from "../../common/apis/Api";

export const fetchUsers = async (paramObject) => {
  const response = await axios
    .get(`${BASE_URL}/users`, {
      params: {
        page: paramObject.page,
      },
    })
    .catch((err) => console.log(err));
  return response;
};

export const postUser = async (token, body) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/users`,
    data: {
      user_name: body.user_name,
      user_surname: body.user_surname,
      user_email: body.user_email,
      user_password: body.user_password,
      user_roles: body.user_roles,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
export const updateUser = async (token, body) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/users`,
    data: {
      user_name: body.user_name,
      user_surname: body.user_surname,
      user_email: body.user_email,
      user_password: body.user_password,
      user_roles: body.user_roles,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
export const removeUser = async (token, id) => {
  const response = await axios({
    method: "delete",
    url: `${BASE_URL}/users/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
