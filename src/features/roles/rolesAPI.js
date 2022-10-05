import axios from "axios";
import BASE_URL from "../../common/apis/Api";

export const fetchRoles = async (paramObject) => {
  const response = await axios
    .get(`${BASE_URL}/role`, {
      params: {
        page: paramObject.page,
      },
    })
    .catch((err) => console.log(err));
  return response;
};
