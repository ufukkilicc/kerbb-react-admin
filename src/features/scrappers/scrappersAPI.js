import axios from "axios";
import BASE_URL from "../../common/apis/Api";

export const fetchScrappers = async (paramObject) => {
  if (paramObject) {
    if (paramObject.success) {
      const response = await axios
        .get(`${BASE_URL}/scrapper`, {
          params: {
            success: paramObject.success,
          },
        })
        .catch((err) => (err));
      return response;
    } else {
      const response = await axios
        .get(`${BASE_URL}/scrapper`, {
          params: {
            page: paramObject.page,
          },
        })
        .catch((err) => (err));
      return response;
    }
  } else {
    const response = await axios
      .get(`${BASE_URL}/scrapper`)
      .catch((err) => (err));
    return response;
  }
};
export const fetchScrapper = async (token, id) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/scrapper/one/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  }).catch((err) => (err));
  return response;
};
export const scrapeAll = async (token) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/scrapper/scrape-all`,
    headers: { Authorization: `Bearer ${token}` },
  }).catch((err) => (err));
  return response;
};
export const scrapeOne = async (token, scrape_name) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/scrapper/${scrape_name}`,
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
