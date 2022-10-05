import newsApi from "../../common/apis/newsApi";
import axios from "axios";
import BASE_URL from "../../common/apis/Api";

export const fetchNews = async (paramObject) => {
  const response = await axios
    .get(`${BASE_URL}/news`, {
      params: {
        page: paramObject.page,
        size: paramObject.size,
      },
    })
    .catch((err) => console.log(err));
  return response;
};
export const fetchOneNews = async (id) => {
  const response = await axios
    .get(`${BASE_URL}/news/${id}`)
    .catch((err) => console.log(err));
  return response;
};
export const postNews = async (token, body) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/news`,
    data: {
      news_title: body.news_title,
      news_content: body.news_content,
      news_publisher: body.news_publisher,
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
export const removeNews = async (token, id) => {
  const response = await axios({
    method: "delete",
    url: `${BASE_URL}/news/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const updateNews = async (token, id, body) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/news/${id}`,
    data: {
      news_title: body.news_title,
      news_content: body.news_content,
      news_publisher: body.news_publisher,
    },
    headers: { Authorization: `Bearer ${token}` },
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
export const uploadNewsImageSecondary = async (token, id, file) => {
  let formData = new FormData();
  formData.append("file", file);
  const response = await axios
    .post(`${BASE_URL}/news/${id}/upload-secondary`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.log(err));
  return response;
};
