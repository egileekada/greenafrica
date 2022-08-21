/* eslint-disable no-unused-vars */
import axios from "axios";

const BASE_URL = `https://gacms.klluster.com/api/`;

export const GetPaymentGateways = async () => {
  let request = axios.get(`${BASE_URL}paymentgateways`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const VerifyPayment = async (reference) => {
  let request = axios.get(`${BASE_URL}payments/verify/${reference}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const InitializePayment = async (payload) => {
  let request = axios.post(`${BASE_URL}payments/initialize`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
