import axios from "axios";
import BASE_URL from "../../common/apis/Api";

export const fetchPublishers = async (paramObject) => {
  const response = await axios
    .get(`${BASE_URL}/publisher`, {
      params: {
        page: paramObject.page,
        size: paramObject.size,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
export const fetchOnePublisher = async (id) => {
  const response = await axios
    .get(`${BASE_URL}/publisher/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
export const postPublisher = async (token, body) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/publisher`,
    data: {
      publisher_name: body.publisher_name,
      publisher_redirect_link: body.publisher_redirect_link,
    },
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

export const updatePublisher = async (token, id, body) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/publisher/${id}`,
    data: {
      publisher_name: body.publisher_name,
      publisher_redirect_link: body.publisher_redirect_link,
    },
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
export const uploadPublisherLogo = async (token, id, file) => {
  let formData = new FormData();
  formData.append("file", file);
  const response = await axios
    .post(`${BASE_URL}/publisher/${id}/upload-logo`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
export const removePublisher = async (token, id) => {
  const response = await axios({
    method: "delete",
    url: `${BASE_URL}/publisher/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
export const uploadNewsImage = async (token, id, file) => {
  let formData = new FormData();
  formData.append("file", file);
  const response = await axios
    .post(`${BASE_URL}/news/${id}/upload`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.log(err));
  return response;
};
