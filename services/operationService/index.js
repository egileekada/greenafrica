/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

const OPERATION = `Operation/`;

export const CheckInPassenger = async (payload) => {
  let request = axios.post(`${OPERATION}CheckInPassenger`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const CheckInPassengers = async (payload) => {
  let request = axios.post(`${OPERATION}CheckInPassengers`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const GetBarCodedBoardingPasses = async (payload) => {
  let request = axios.post(`${OPERATION}GetBarCodedBoardingPasses`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const GetBarCodedBoardingPassesMultiple = async (payload) => {
  let request = axios.post(`${OPERATION}GetBarCodedBoardingPassesMultiple`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
