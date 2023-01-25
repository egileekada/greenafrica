import axios from "axios";
let baseURL = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : "https://dev-mid.gadevenv.com/api/";


let token;
axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const instance = axios.create({
  baseURL,
});

// instance.interceptors.request.use(
//   function (config) {
//     token = localStorage.getItem("ptp-token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export default instance;
