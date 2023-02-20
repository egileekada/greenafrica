import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const widgetApi = createApi({
  reducerPath: "widgetApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://gacms.klluster.com/api/" }),
  endpoints: (builder) => ({
    getDestination: builder.query({
      query: () => `/destination_matrices/transformed`,
    }),
    getLocations: builder.query({
      query: () => `/locations`,
    }),
    getProducts: builder.query({
      query: () => `/products`,
    }),
    getProductsByCode: builder.query({
      query: (code) => `/products/${code}/services`,
    }),
    getSeatlegends: builder.query({
      query: () => `/seatlegends`,
    }),
    getSalutations: builder.query({
      query: () => `/salutations`,
    }),
    getSpecialAssistances: builder.query({
      query: () => `/specialassistances`,
    }),
    getFareconfigs: builder.query({
      query: () => `/fareconfigs`,
    }),
    getSSRconfigs: builder.query({
      query: () => `/ssrconfigs`,
    }),
    getPaymentConfigs: builder.query({
      query: () => `/paymentgateways`,
    }),
    initiatePayment: builder.mutation({
      query: (body) => ({
        url: "payments/initialize",
        method: "POST",
        body,
      }),
    }),
    verifyPayment: builder.query({
      query: (reference) => `payments/verify/${reference}`,
    }),
    sendBoardingPass: builder.mutation({
      query: (body) => ({
        url: "send/boardingpass",
        method: "POST",
        body,
      }),
    }),
    checkCreditShell: builder.query({
      query: (payload) =>
        `/payments/verify/${encodeURIComponent(
          payload.reference
        )}?email=${encodeURIComponent(
          payload.email
        )}&creditShell=true&signature=${encodeURIComponent(payload.signature)}`,
    }),
  }),
});

export const {
  useGetDestinationQuery,
  useGetLocationsQuery,
  useGetProductsQuery,
  useGetProductsByCodeQuery,
  useGetSeatlegendsQuery,
  useGetSalutationsQuery,
  useGetSpecialAssistancesQuery,
  useGetFareconfigsQuery,
  useGetSSRconfigsQuery,
  useInitiatePaymentMutation,
  useSendBoardingPassMutation,
  useVerifyPaymentQuery,
  useGetPaymentConfigsQuery,
  useCheckCreditShellQuery,
} = widgetApi;
