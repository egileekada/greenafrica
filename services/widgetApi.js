import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const widgetApi = createApi({
  reducerPath: "widgetApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://gacms.klluster.com/api/" }),
  endpoints: (builder) => ({
    getDestination: builder.query({
      query: () => `/destination_matrices/transformed`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDestinationQuery } = widgetApi;
