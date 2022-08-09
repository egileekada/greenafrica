/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";
// import axios from "axios";

const SESSION = `Session/`;

export const Logon = async (payload) => {
  console.log("recieved seee", `${SESSION}Logon`);
  // let request = axios.post(`${SESSION}Logon`, { ...payload });
  let request = axios.post(
    // "https://dev-mid.gadevenv.com/api/Session/WhoAmI",
    // "https://dev-mid.gadevenv.com/api/Session/Logon",
    // "https://cors-anywhere.herokuapp.com/https://dev-mid.gadevenv.com/api/Session/Logon",
    "https://dev-mid.gadevenv.com/api/Session/Logon",
    {
      logonRequestData: {
        domainCode: "",
        agentName: "",
        password: "",
        locationCode: "",
        roleCode: "",
        terminalInfo: "",
        clientName: "",
      },
    }
  );
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const WhoAmI = async (payload) => {
  let request = axios.post(`${SESSION}WhoAmI`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const KeepAlive = async (payload) => {
  let request = axios.post(`${SESSION}KeepAlive`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const LogOutAsync = async (payload) => {
  let request = axios.post(`${SESSION}LogOutAsync`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const ChangePassword = async (payload) => {
  let request = axios.post(`${SESSION}ChangePassword`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const TransferSession = async (payload) => {
  let request = axios.post(`${SESSION}TransferSession`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
