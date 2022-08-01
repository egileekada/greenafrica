import Swal from "sweetalert2";
const accessToken = window.localStorage.getItem("accessToken");

const appInstance = process.env.REACT_APP_ENVIRONMENT;

const baseURL =
  appInstance === "development"
    ? process.env.REACT_APP_BASE_URL_DEVELOPMENT
    : process.env.REACT_APP_BASE_URL_PRODUCTION;

const http = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${accessToken}` },
});

http.defaults.headers.post["Content-Type"] = "application/json";

http.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    const { response, request } = error;
    const errorMsg = response?.data?.message || response?.data?.error;
    if (response) {
      if (
        (response?.status === 400 && errorMsg === "Token expired") ||
        response?.status === 401
      ) {
        // Swal.fire({
        //   icon: "error",
        //   title: "Session Expired!",
        //   text: "Your session token has expired, please login again!",
        //   confirmButtonColor: "#0f9af0",
        // }).then(() => {
        //
        // });
        // Clear Session adn show alert
        // logOutProvider();
      }
      // return null;
    } else if (request) {
      // message.error("Request failed. Please try again.");
      // return null;
    }
    return Promise.reject(error);
  }
);

const logOutProvider = () => {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("_profile");
  window.location.replace("/");
};

export default http;
