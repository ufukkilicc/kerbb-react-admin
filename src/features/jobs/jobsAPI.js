import jobsApi from "../../common/apis/jobsApi";
import axios from "axios";
import BASE_URL from "../../common/apis/Api";

export const fetchJobs = async (paramObject) => {
  const response = await axios
    .get(`${BASE_URL}/jobs`, {
      params: {
        page: paramObject.page,
        sort_by: paramObject.sort_by,
        sort: paramObject.sort,
        query_text: paramObject.query_text,
      },
    })
    .catch((err) => console.log(err));
  return response;
};
export const fetchJob = async (id) => {
  const response = await axios
    .get(`${BASE_URL}/jobs/${id}`)
    .catch((err) => console.log(err));
  return response;
};
export const updateJob = async (token, id, body) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/jobs/${id}`,
    headers: { Authorization: `Bearer ${token}` },
    data: body,
  });
  return response;
};
export const approveRefuseJob = async (token, id) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/jobs/${id}/approve-refuse`,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
export const highlightJob = async (token, id) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/jobs/${id}/highlight`,
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
export const highlightOrderJob = async (token, id, body) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/jobs/${id}/highlight-order`,
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
export const removeJobById = async (token, id) => {
  const response = await axios({
    method: "delete",
    url: `${BASE_URL}/jobs/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
