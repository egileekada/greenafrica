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
        url: "/Booking/GetBookingFromState",
        method: "POST",
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
    getBooking: builder.mutation({
      query: (pnr) => ({
        url: "Booking/GetBooking",
        method: "POST",
        body: {
          header: {
            signature: store.getState().session.signature,
            messageContractVersion: "",
            enableExceptionStackTrace: false,
            contractVersion: 0,
          },
          getBookingRequestDto: {
            getBookingRequestData: {
              getBookingBy: 0,
              getBookingBySpecified: true,
              getByRecordLocator: {
                recordLocator: pnr,
              },
            },
          },
        },
      }),
    }),
    saveNewCheckInSSRs: builder.mutation({
      query: (body) => ({
        url: "Booking/Sell",
        method: "POST",
        body: {
          header: {
            signature: store.getState().session.signature,
            messageContractVersion: "",
            enableExceptionStackTrace: false,
            contractVersion: 0,
          },
          sellRequestDto: {
            sellRequest: {
              sellRequestData: {
                sellBy: 2,
                sellBySpecified: true,
                sellSSR: {
                  ssrRequest: {
                    segmentSSRRequests: [...body],
                    currencyCode: "NGN",
                    cancelFirstSSR: true,
                    cancelFirstSSRSpecified: true,
                    ssrFeeForceWaiveOnSell: false,
                    ssrFeeForceWaiveOnSellSpecified: true,
                    sellSSRMode: 0,
                    sellSSRModeSpecified: true,
                    feePricingMode: 0,
                    feePricingModeSpecified: true,
                  },
                },
              },
            },
          },
        },
      }),
    }),
    ResellNewJourney: builder.mutation({
      query: (payload) => ({
        url: "/Booking/Sell",
        method: "POST",
        body: {
          header: {
            signature: store.getState().session.signature,
            messageContractVersion: "",
            enableExceptionStackTrace: false,
            contractVersion: 0,
          },
          sellRequestDto: payload.sellRequestDto,
        },
      }),
    }),
    CancelSSR: builder.mutation({
      query: (cancelSSRRequest) => ({
        url: "/Booking/Cancel",
        method: "POST",
        body: {
          signature: store.getState().session.signature,
          messageContractVersion: "",
          enableExceptionStackTrace: false,
          contractVersion: 0,
          cancelRequestData: cancelSSRRequest.cancelRequestData,
        },
      }),
    }),
    ResellSSR: builder.mutation({
      query: (segmentSSRRequests) => ({
        url: "/Booking/Sell",
        method: "POST",
        body: {
          header: {
            signature: store.getState().session.signature,
            messageContractVersion: "",
            enableExceptionStackTrace: false,
            contractVersion: 0,
          },
          sellRequestDto: {
            sellRequest: {
              sellRequestData: {
                sellBy: 2,
                sellBySpecified: true,
                sellSSR: {
                  ssrRequest: {
                    segmentSSRRequests: [...segmentSSRRequests],
                    currencyCode: "NGN",
                    cancelFirstSSR: true,
                    cancelFirstSSRSpecified: true,
                    ssrFeeForceWaiveOnSell: false,
                    ssrFeeForceWaiveOnSellSpecified: true,
                    sellSSRMode: 0,
                    sellSSRModeSpecified: true,
                    feePricingMode: 0,
                    feePricingModeSpecified: true,
                  },
                },
              },
            },
          },
        },
      }),
    }),
    bookingCommitWithoutPayment: builder.mutation({
      query: () => ({
        url: "/Booking/BookingCommitWithoutPayment",
        method: "POST",
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
    updatePassengerInfo: builder.mutation({
      query: (updatePassengersRequest) => ({
        url: "/Booking/UpdatePassengers",
        method: "POST",
        body: {
          header: {
            signature: store.getState().session.signature,
            messageContractVersion: "",
            enableExceptionStackTrace: false,
            contractVersion: 0,
          },
          updatePassengersRequestDto: updatePassengersRequest,
        },
      }),
    }),
    updateContactInfo: builder.mutation({
      query: (payload) => ({
        url: "/Booking/UpdateContacts",
        method: "POST",
        body: {
          header: {
            signature: store.getState().session.signature,
            messageContractVersion: "",
            enableExceptionStackTrace: false,
            contractVersion: 0,
          },
          updateContactsRequestDto: payload.updateContactsRequestDto,
        },
      }),
    }),
    getAccountByReference: builder.mutation({
      query: (payload) => ({
        url: `/Account/GetAccountByReference`,
        method: "POST",
        body: payload,
      }),
    }),
    startSession: builder.mutation({
      query: () => ({
        url: "/Session/Logon",
        method: "POST",
        body: {
          logonRequestData: {
            domainCode: "",
            agentName: "",
            password: "",
            locationCode: "",
            roleCode: "",
            terminalInfo: "",
            clientName: "",
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
  useGetBookingMutation,
  useSaveNewCheckInSSRsMutation,
  useBookingCommitWithoutPaymentMutation,
  useResellNewJourneyMutation,
  useCancelSSRMutation,
  useResellSSRMutation,
  useUpdatePassengerInfoMutation,
  useUpdateContactInfoMutation,
  useGetAccountByReferenceMutation,
  useStartSessionMutation,
} = bookingApi;
