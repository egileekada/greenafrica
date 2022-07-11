/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

export const loginUser = async (credentials) => {
  let request = axios.post("auth/signin", credentials);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const registerUser = async (credentials) => {
  let request = axios.post("auth/signup", credentials);

  return request.then((response) => {
    if (response.status === 201) {
      return response.data && response.data.data;
    }
  });
};

export const getUser = async () => {
  let request = axios.get(`user/my-profile`);

  return request.then((response) => {
    if (response.status === 200) {
      return response.data && response.data;
    }
  });
};

export const updateUser = async (details) => {
  let request = await axios.put("/user/update", details);
  console.log("request", request);
  return request;
  // return request.then((response) => {
  //   console.log("response", response);
  //   // if (response.status === 200) {
  //     return response && response;
  //   // }
  // });
};

export const deleteResume = async (resumeId) => {
  let request = axios.get(`user/resume/${resumeId}`);

  return request.then((response) => {
    if (response.status === 200) {
      return response.data && response.data;
    }
  });
};

export const updatePassword = async (values) => {
  let request = axios.post("user/update-password", values);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const confirmToken = async (token) => {
  let request = axios.get(`signup/confirmation/?token=${token}`);

  return request.then((response) => {
    if (response.status === 200) {
      return response.data && response.data;
    }
  });
};

export const recoverPassword = async (email) => {
  let request = axios.put("forgotPassword", email);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const confirmResetCode = async (code) => {
  let data = {
    resetCode: code,
  };
  let request = axios.post("auth/confirm-reset-password-code", data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const resetPassword = async (values) => {
  let request = axios.post("updatePassword/{userId}", values);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
