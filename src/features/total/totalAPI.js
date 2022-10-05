import totalApi from "../../common/apis/totalApi";

export const fetchTotal = async () => {
  const response = await totalApi.get().catch((err) => console.log(err));
  return response;
};
