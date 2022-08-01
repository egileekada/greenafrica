/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

const SESSION = `Session/`;

export const Logon = async (payload) => {
  let request = axios.post(`${SESSION}Logon`, payload);
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
