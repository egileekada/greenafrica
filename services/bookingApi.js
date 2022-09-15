let baseURL = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : "https://dev-mid.gadevenv.com/api/";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
let token;

import { store } from "redux/store";

const getReduxState = () => require("redux/store").default.getState();

// Define a service using a base URL and expected endpoints
export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    findBooking: builder.mutation({
      query: (value) => ({
        url: "Booking/FindBooking",
        method: "POST",
        body: {
          header: {
            signature: store.getState().session.signature,
            messageContractVersion: "",
            enableExceptionStackTrace: false,
            contractVersion: 0,
          },
          findBookingRequestData: {
            FindBookingBy: 1,
            FindBookingBySpecified: true,
            FindByContact: {
              RecordLocator: value.pnr,
              LastName: "",
              FirstName: "",
              PhoneNumber: "",
              EmailAddress: value.email,
              OrganizationCode: "",
              SourceOrganization: "",
              OrganizationGroupCode: "",
              AgentID: 0,
              agentIDSpecified: true,
              AsOfUTC: "0001-01-01T00:00:00",
              asOfUTCSpecified: true,
            },
            lastID: 0,
            lastIDSpecified: true,
            pageSize: 0,
            pageSizeSpecified: true,
            searchArchive: false,
            searchArchiveSpecified: true,
          },
        },
      }),
    }),
    startCheckIn: builder.mutation({
      query: (body) => ({
        url: "Operation/CheckInPassengers",
        method: "POST",
        body: {
          header: {
            signature: store.getState().session.signature,
            messageContractVersion: "",
            enableExceptionStackTrace: false,
            contractVersion: 0,
          },
          checkInPassengersRequestDto: {
            checkInPassengersRequest: {
              checkInMultiplePassengersRequest: {
                checkInMultiplePassengerRequestList: [...body],
              },
            },
          },
        },
      }),
    }),
    tryAssignSeat: builder.mutation({
      query: () => ({
        url: "/Booking/AssignSeats",
        method: "POST",
        body: {
          header: {
            signature: store.getState().session.signature,
            messageContractVersion: "",
            enableExceptionStackTrace: false,
            contractVersion: 0,
          },
          assignSeatsRequest: {
            sellSeatRequest: {
              blockType: 0,
              blockTypeSpecified: true,
              sameSeatRequiredOnThruLegs: false,
              sameSeatRequiredOnThruLegsSpecified: true,
              assignNoSeatIfAlreadyTaken: false,
              assignNoSeatIfAlreadyTakenSpecified: true,
              allowSeatSwappingInPnr: false,
              allowSeatSwappingInPnrSpecified: true,
              waiveFee: false,
              waiveFeeSpecified: true,
              replaceSpecificSeatRequest: false,
              replaceSpecificSeatRequestSpecified: true,
              seatAssignmentMode: 0,
              seatAssignmentModeSpecified: true,
              ignoreSeatSsRs: false,
              ignoreSeatSSRsSpecified: true,
              segmentSeatRequests: [...store.getState().session.seats],
              equipmentDeviations: [
                {
                  equipmentType: "",
                  equipmentTypeSuffix: "",
                  marketingCode: "",
                },
              ],
              collectedCurrencyCode: "NGN",
              includeSeatData: false,
              includeSeatDataSpecified: true,
              feePricingMode: 0,
              feePricingModeSpecified: true,
            },
          },
        },
      }),
    }),
    bookingCommit: builder.mutation({
      query: (recordLocator) => ({
        url: "/Booking/BookingCommit",
        method: "POST",
        body: {
          signature: store.getState().session.signature,
          messageContractVersion: "",
          enableExceptionStackTrace: true,
          contractVersion: 0,
          bookingCommitRequestData: {
            state: 0,
            recordLocator: recordLocator,
            paxCount: 0,
            bookingID: 0,
            bookingParentID: 0,
            restrictionOverride: false,
            changeHoldDateTime: false,
            changeHoldDateTimeSpecified: false,
            waiveNameChangeFee: false,
            waiveNameChangeFeeSpecified: true,
            waivePenaltyFee: false,
            waivePenaltyFeeSpecified: true,
            waiveSpoilageFee: false,
            waiveSpoilageFeeSpecified: true,
            distributeToContacts: false,
            distributeToContactsSpecified: true,
          },
        },
      }),
    }),
    bookingState: builder.mutation({
      query: () => ({
        url: "",
        body: {
          header: {
            signature: store.getState().session.signature,
            messageContractVersion: "",
            enableExceptionStackTrace: false,
            contractVersion: 0,
          },
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useFindBookingMutation,
  useStartCheckInMutation,
  useTryAssignSeatMutation,
  useBookingCommitMutation,
  useBookingStateMutation,
} = bookingApi;
