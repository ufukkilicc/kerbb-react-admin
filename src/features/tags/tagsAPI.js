import axios from "axios";
import BASE_URL from "../../common/apis/Api";

export const fetchTags = async () => {
  const response = await axios
    .get(`${BASE_URL}/tags`)
    .catch((err) => (err));
  return response;
};
