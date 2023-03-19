import companiesApi from "../../common/apis/companiesApi";
import axios from "axios";
import BASE_URL from "../../common/apis/Api";

export const fetchCompanies = async (paramObject) => {
  if (paramObject) {
    if (paramObject.state) {
      const response = await axios
        .get(`${BASE_URL}/companies`, {
          params: {
            state: paramObject.state,
          },
        })
        .catch((err) => (err));
      return response;
    } else if (paramObject.is_highlighted) {
      const response = await axios
        .get(`${BASE_URL}/companies`, {
          params: {
            page: paramObject.page,
            size: paramObject.size,
            is_highlighted: paramObject.is_highlighted,
          },
        })
        .catch((err) => (err));
      return response;
    } else {
      const response = await axios
        .get(`${BASE_URL}/companies`, {
          params: {
            page: paramObject.page,
          },
        })
        .catch((err) => (err));
      return response;
    }
  } else {
    const response = await axios
      .get(`${BASE_URL}/companies`)
      .catch((err) => (err));
    return response;
  }
};
export const fetchCompany = async (id) => {
  const response = await axios
    .get(`${BASE_URL}/companies/${id}`)
    .catch((err) => (err));
  return response;
};
export const postCompany = async (token, body) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/companies`,
    data: {
      name: body.name,
      scrape_name: body.scrape_name,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
export const updateCompany = async (token, id, body) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/companies/${id}`,
    headers: { Authorization: `Bearer ${token}` },
    data: body,
  });
  return response;
};
export const uploadCompanyLogo = async (token, id, file) => {
  let formData = new FormData();
  formData.append("file", file);
  const response = await axios
    .post(`${BASE_URL}/companies/${id}/upload-logo`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (err));
  return response;
};
export const uploadCompanyCover = async (token, id, file) => {
  let formData = new FormData();
  formData.append("file", file);
  const response = await axios
    .post(`${BASE_URL}/companies/${id}/upload-cover`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => (err));
  return response;
};
export const highlightCompany = async (token, id) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/companies/${id}/highlight`,
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
export const highlightOrderCompany = async (token, id, body) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/companies/${id}/highlight-order`,
    headers: { Authorization: `Bearer ${token}` },
    data: body,
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
export const activateCompany = async (token, id) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/companies/${id}/activate-deactivate`,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
export const approveRefuseCompany = async (token, id) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/companies/${id}/approve-refuse`,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
export const deleteCompany = async (token, id) => {
  const response = await axios({
    method: "delete",
    url: `${BASE_URL}/companies/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
