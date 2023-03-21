const BASE_URL =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "local"
    ? "http://localhost:5000"
    : "https://kerbb.com/api";

export default BASE_URL;
