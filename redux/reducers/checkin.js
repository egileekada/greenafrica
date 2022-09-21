import { createSlice } from "@reduxjs/toolkit";
import {
  BookingSell,
  CancelSSR,
  GetSSRAvailabilityForBooking,
} from "services/bookingService";
import { notification } from "antd";
import { PURGE } from "redux-persist";

const initialState = {
  checkinPNR: null,
  testCheckin: "null",
  SSRAvailabilityLoading: false,
  SSRAvailabilityResponse: null,

  checkinSessionSSRs: [],
  checkinSessionReturnSSRs: [],

  ResellSSRLoading: false,
  ResellSSRResponse: null,

  cancelCheckinSSRLoading: false,
  cancelCheckinSSRResponse: null,
};

export const checkinSlice = createSlice({
  name: "checkin",
  initialState,
  reducers: {
    setCheckinPNR: (state, { payload }) => {
      state.checkinPNR = payload;
    },
    setSSRAvailabilityLoading: (state, { payload }) => {
      state.SSRAvailabilityLoading = payload;
    },
    setSSRAvailabilityResponse: (state, { payload }) => {
      state.SSRAvailabilityResponse = payload;
    },

    setCheckinSessionSSRs: (state, { payload }) => {
      state.checkinSessionSSRs = payload;
    },
    setCheckinSessionReturnSSRs: (state, { payload }) => {
      state.checkinSessionReturnSSRs = payload;
    },

    setResellSSRLoading: (state, { payload }) => {
      state.ResellSSRLoading = payload;
    },
    setResellSSRResponse: (state, { payload }) => {
      state.ResellSSRResponse = payload;
    },

    setCancelCheckinSSRLoading: (state, { payload }) => {
      state.cancelCheckinSSRLoading = payload;
    },
    setCancelCheckinSSRResponse: (state, { payload }) => {
      state.cancelCheckinSSRResponse = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const {
  setCheckinPNR,

  setSSRAvailabilityLoading,
  setSSRAvailabilityResponse,

  setCheckinSessionSSRs,
  setCheckinSessionReturnSSRs,

  setResellSSRLoading,
  setResellSSRResponse,

  setCancelCheckinSSRLoading,
  setCancelCheckinSSRResponse,
} = checkinSlice.actions;

export const checkinSelector = (state) => state.checkin;
export default checkinSlice.reducer;

export const FetchSSRAvailability = () => async (dispatch, getState) => {
  dispatch(setSSRAvailabilityLoading(true));

  const currentSession = getState().session;
  const _bookingResponse = currentSession?.bookingResponse;
  let _segmentKeyList = [];

  if (_bookingResponse) {
    const JOURNEYS = _bookingResponse?.Booking?.Journeys;

    if (JOURNEYS && JOURNEYS?.length > 0) {
      JOURNEYS.map((_sessionJourney) => {
        let newObj = {
          carrierCode:
            _sessionJourney?.Segments[0]?.FlightDesignator?.CarrierCode,
          flightNumber:
            _sessionJourney?.Segments[0]?.FlightDesignator?.FlightNumber,
          opSuffix: "",
          departureDate: _sessionJourney?.Segments[0]?.STD,
          departureDateSpecified: true,
          arrivalStation: _sessionJourney?.Segments[0]?.ArrivalStation,
          departureStation: _sessionJourney?.Segments[0]?.DepartureStation,
        };

        _segmentKeyList.push(newObj);
      });
      let requestPayload = {
        header: {
          signature: currentSession?.signature,
          messageContractVersion: "",
          enableExceptionStackTrace: true,
          contractVersion: 0,
        },
        getSsrAvailabilityForBookingRequestDto: {
          getSsrAvailabilityForBookingRequest: {
            ssrAvailabilityForBookingRequest: {
              segmentKeyList: [..._segmentKeyList],
              PassengerNumberList: [0],
              inventoryControlled: true,
              inventoryControlledSpecified: true,
              nonInventoryControlled: true,
              nonInventoryControlledSpecified: true,
              seatDependent: true,
              seatDependentSpecified: true,
              nonSeatDependent: true,
              nonSeatDependentSpecified: true,
              currencyCode: "NGN",
              ssrAvailabilityMode: 0,
              ssrAvailabilityModeSpecified: true,
              feePricingMode: 0,
              feePricingModeSpecified: true,
            },
          },
        },
      };
      try {
        const SSRAvailabilityResponse = await GetSSRAvailabilityForBooking(
          requestPayload
        );
        await dispatch(
          setSSRAvailabilityResponse(SSRAvailabilityResponse.data)
        );
      } catch (err) {
        // notification.error({
        //   message: "Error",
        //   description: "Fetch SSR Failed",
        // });
      }
    }
  } else {
    notification.error({
      message: "Error",
      description:
        "Fetch Additional Services Failed,Please go back and fill-in relevant details",
    });
  }

  dispatch(setSSRAvailabilityLoading(false));
};

export const ReSellSSROption =
  (payload, returnPayload = []) =>
  async (dispatch, getState) => {
    dispatch(setResellSSRLoading(true));
    dispatch(setCheckinSessionSSRs(payload));
    dispatch(setCheckinSessionReturnSSRs(returnPayload));
    const currentSession = getState().session;
    const currentCheckinSession = getState().checkin;
    const segmentSSRRequests = [];
    const _bookingResponse = currentSession?.bookingResponse;

    let JourneyOneSSRs = [];
    let JourneyTwoSSRs = [];

    payload.length > 0
      ? payload.map((_ssr) => {
          let newObj = {
            state: 0,
            stateSpecified: true,
            actionStatusCode: "NN",
            departureStation: _ssr?.DepartureStation,
            arrivalStation: _ssr?.ArrivalStation,
            passengerNumber: _ssr?.passengerNumber,
            passengerNumberSpecified: true,
            ssrCode: _ssr?.ssrCode,
            ssrNumberSpecified: true,
            ssrNumber: 0,
            ssrDetail: "",
            feeCode: "",
            note: "",
            ssrValue: 0,
            ssrValueSpecified: true,
            isInServiceBundle: false,
            isInServiceBundleSpecified: true,
          };
          JourneyOneSSRs.push(newObj);
        })
      : null;

    returnPayload.length > 0
      ? returnPayload.map((_ssr) => {
          let newObj = {
            state: 0,
            stateSpecified: true,
            actionStatusCode: "NN",
            departureStation: _ssr?.DepartureStation,
            arrivalStation: _ssr?.ArrivalStation,
            passengerNumber: _ssr?.passengerNumber,
            passengerNumberSpecified: true,
            ssrCode: _ssr?.ssrCode,
            ssrNumberSpecified: true,
            ssrNumber: 0,
            ssrDetail: "",
            feeCode: "",
            note: "",
            ssrValue: 0,
            ssrValueSpecified: true,
            isInServiceBundle: false,
            isInServiceBundleSpecified: true,
          };
          JourneyTwoSSRs.push(newObj);
        })
      : null;

    if (_bookingResponse) {
      const JOURNEYS = _bookingResponse?.Booking?.Journeys;
      JOURNEYS.map((_journey, _index) => {
        let _segment = {
          flightDesignator: {
            carrierCode: _journey?.Segments[0].FlightDesignator?.CarrierCode,
            flightNumber: _journey?.Segments[0].FlightDesignator?.FlightNumber,
            opSuffix: "",
          },
          std: _journey?.Segments[0]?.STD,
          stdSpecified: true,
          departureStation: _journey?.Segments[0]?.DepartureStation,
          arrivalStation: _journey?.Segments[0]?.ArrivalStation,
          paxSSRs: _index === 0 ? [...JourneyOneSSRs] : [...JourneyTwoSSRs],
        };
        segmentSSRRequests.push(_segment);
      });
    }

    try {
      const sellSSRRequest = {
        header: {
          signature: currentSession.signature,
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
      };
      const res = await BookingSell(sellSSRRequest);
      const PNR = res?.data?.BookingUpdateResponseData?.Success?.RecordLocator;
      window.location.assign(`/checkin/home?pnr=${PNR}`);
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Sell Services failed",
      });
    }

    dispatch(setResellSSRLoading(false));
  };

export const CancelSSRs = () => async (dispatch, getState) => {
  dispatch(setCancelCheckinSSRLoading(true));
  const currentSession = getState().session;
  const _segmentKeyList = [];
  const _bookingResponse = currentSession?.bookingResponse;
  const ALLOWED__SSRS = ["X20", "X15", "X10", "VPRD", "WCHR", "HPRD"];

  if (_bookingResponse && currentSession?.signature) {
    const JOURNEYS = _bookingResponse?.Booking?.Journeys;
    JOURNEYS.map((_journey, _index) => {
      let newObj = {
        flightDesignator: {
          carrierCode: _journey?.Segments[0]?.FlightDesignator?.CarrierCode,
          flightNumber: _journey?.Segments[0]?.FlightDesignator?.FlightNumber,
          opSuffix: "",
        },
        std: _journey?.Segments[0]?.STD,
        stdSpecified: true,
        arrivalStation: _journey?.Segments[0]?.ArrivalStation,
        departureStation: _journey?.Segments[0]?.DepartureStation,
        paxSSRs: [
          ..._journey?.Segments[0]?.PaxSSRs.filter((ssrItem) =>
            ALLOWED__SSRS.includes(ssrItem?.SSRCode)
          ),
        ],
      };

      _segmentKeyList.push(newObj);
    });

    try {
      const cancelSSRRequest = {
        signature: currentSession.signature,
        messageContractVersion: "",
        enableExceptionStackTrace: true,
        contractVersion: 0,
        cancelRequestData: {
          cancelBy: 2,
          cancelBySpecified: true,
          cancelSSR: {
            SSRRequest: {
              segmentSSRRequests: [..._segmentKeyList],
              currencyCode: "NGN",
              cancelFirstSSR: false,
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
      };
      await CancelSSR(cancelSSRRequest);
    } catch (err) {
      // notification.error({
      //   message: "Error",
      //   description: "Cancel Services failed",
      // });
    }
  }

  dispatch(setCancelCheckinSSRLoading(false));
};
