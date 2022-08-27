/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

const BOOKING = `Booking/`;

export const GetAvailabilityRequest = async (payload) => {
  let request = axios.post(`${BOOKING}GetAvailabilityRequest`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const GetBooking = async (payload) => {
  let request = axios.post(`${BOOKING}GetBooking`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const GetItineraryPrice = async (payload) => {
  let request = axios.post(`${BOOKING}GetItineraryPrice`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const GetLowFareAvailability = async (payload) => {
  let request = axios.post(`${BOOKING}GetLowFareAvailability`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const BookingCommit = async (payload) => {
  let request = axios.post(`${BOOKING}BookingCommit`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const BookingSell = async (payload) => {
  let request = axios.post(`${BOOKING}Sell`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const GetSSRAvailability = async (payload) => {
  let request = axios.post(`${BOOKING}GetSSRAvailability`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const GetSSRAvailabilityForBooking = async (payload) => {
  let request = axios.post(`${BOOKING}GetSSRAvailabilityForBooking`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const ResellSSR = async (payload) => {
  let request = axios.post(`${BOOKING}ResellSSR`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const AssignSeats = async (payload) => {
  let request = axios.post(`${BOOKING}AssignSeats`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const UpdatePassengers = async (payload) => {
  let request = axios.post(`${BOOKING}UpdatePassengers`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const UpdateContacts = async (payload) => {
  let request = axios.post(`${BOOKING}UpdateContacts`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const AddPaymentToBooking = async (payload) => {
  let request = axios.post(`${BOOKING}AddPaymentToBooking`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const GetBookingFromState = async (payload) => {
  let request = axios.post(`${BOOKING}GetBookingFromState`, payload);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
