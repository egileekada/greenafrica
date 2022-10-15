/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import { notification } from "antd";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import BaseLayout from "layouts/Base";

import Popup from "components/Popup";
import Seatslegend from "./Seats/SeatPopUp";

import { useSelector, useDispatch } from "react-redux";

import {
  sessionSelector,
  retrieveCheckinSeatAvailability,
  tryClearSeat,
  setLoading,
  setBookingState,
} from "redux/reducers/session";

import SeatWrapper from "./Seats/SeatWrapper";
import { useGetLocationsQuery } from "services/widgetApi.js";
import {
  useTryAssignSeatMutation,
  useStartCheckInMutation,
  useBookingStateMutation,
} from "services/bookingApi";
import SkeletonLoader from "components/SkeletonLoader";

const SeatSelection = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [assignUserseat] = useTryAssignSeatMutation();
  const [getState, { isLoading: fetchingBookingState }] =
    useBookingStateMutation();
  const { data, isLoading: locationLoading } = useGetLocationsQuery();
  const [showPopUp, setShow] = useState(false);
  const [ticketIndex, setTicketIndex] = useState(0);
  const [showEmergency, setEmergency] = useState(false);

  const {
    signature,
    isLoading,
    bookingResponse,
    seats,
    checkInSelection,
    bookingState,
    selectedPassengers,
  } = useSelector(sessionSelector);

  const [startCheckin, { isLoading: checkInLoading }] =
    useStartCheckInMutation();

  const { TabPane } = Tabs;

  useEffect(() => {
    async function getAvailability() {
      if (signature) {
        dispatch(retrieveCheckinSeatAvailability({ ticketIndex }));
      }
    }
    getAvailability();
  }, [ticketIndex]);

  useEffect(() => {
    getState()
      .unwrap()
      .then((data) => {
        dispatch(setBookingState(data?.BookingData));
      })
      .catch((error) => console.log(error));
  }, []);

  const childRef = useRef(null);

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return (
      <>
        {name} <span className="hidden md:flex ml-1"> ({code})</span>
      </>
    );
  };

  const initAssignSeats = async () => {
    dispatch(setLoading(true));
    await assignUserseat()
      .unwrap()
      .then((data) => {
        notification.success({
          message: "Success",
          description: "Seat Assignment successful",
        });
        makeCommit();
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: "Please select another seat",
        });
      });
    dispatch(setLoading(false));
  };

  const makeCommit = () => {
    getState()
      .unwrap()
      .then((data) => {
        dispatch(setBookingState(data?.BookingData));
        if (parseInt(data?.BookingData?.BookingSum?.BalanceDue) > 0) {
          router.push("/checkin/pay");
        } else {
          startCheckin(checkInSelection)
            .unwrap()
            .then((data) => {
              router.push("/checkin/confirm");
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    async function retrieveState() {
      dispatch(tryClearSeat());
    }
    retrieveState();
  }, []);

  const skipSeatSelection = () => {
    if (parseInt(bookingState?.BookingSum?.BalanceDue) > 0) {
      router.push("/checkin/pay");
    } else {
      startCheckin(checkInSelection)
        .unwrap()
        .then((data) => {
          router.push("/checkin/confirm");
        })
        .catch((error) => {
          notification.error({
            message: "Error",
            description: error?.data?.Error?.ErrorText,
          });
        });
    }
  };

  return (
    <>
      <BaseLayout>
        <section className="w-full checkin">
          <section className="ga__section bg-normal">
            <div className="ga__section__main standalone">
              <div className="mb-8">
                <h2 className="text-black font-bold text-2xl mb-2">
                  Change Seat Selection
                </h2>
              </div>
              {fetchingBookingState ? (
                <section>
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </section>
              ) : (
                <section className="flex flex-col bg-white pb-24 pt-5 px-3 md:px-8 rounded-lg">
                  <Tabs
                    defaultActiveKey="1"
                    tabBarStyle={{ color: "#47FF5A" }}
                    onChange={(e) => setTicketIndex(e - 1)}
                  >
                    {bookingResponse?.Booking?.Journeys.map(
                      (journey, index) =>
                        selectedPassengers.some(
                          (el) => el.journey === index
                        ) && (
                          <TabPane
                            tab={
                              <div className="inline-flex rounded-t-lg border-b-2 border-transparent text-[#9E9BBF] hover:text-[#9E9BBF] items-center font-semibold group">
                                <svg
                                  width="16"
                                  height="16"
                                  className="mr-2 w-5 h-5 text-[#9E9BBF] group-hover:text-[#9E9BBF]"
                                  viewBox="0 0 16 16"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.5021 14.6627C10.8596 14.6627 11.1521 14.3703 11.1521 14.0128C11.1521 13.6553 10.8596 13.3628 10.5021 13.3628H9.75459L10.1771 12.4203H11.3145C11.672 12.4203 11.9645 12.1279 11.9645 11.7704C11.9645 11.4129 11.672 11.1204 11.3145 11.1204H10.7621L11.4445 9.56037C14.2396 9.30023 15.7998 8.71523 15.7998 8.00019C15.7998 7.28516 14.2398 6.70016 11.4448 6.47266L10.7623 4.9126H11.3148C11.6723 4.9126 11.9647 4.62015 11.9647 4.26265C11.9647 3.90515 11.6723 3.61271 11.3148 3.61271L10.1773 3.61271L9.75488 2.6702H10.5024C10.8599 2.6702 11.1524 2.37776 11.1524 2.02026C11.1524 1.66276 10.8599 1.37032 10.5024 1.37032L9.16988 1.37032L8.68224 0.200195L7.02472 0.200195L8.19472 6.40772C5.91979 6.5052 3.64475 6.99272 2.11726 7.41519L0.589743 5.46521H0.199804L0.979769 8.00019V8.03273L0.199804 10.5352H0.589829L2.11735 8.5852C3.64487 9.00767 5.88732 9.49517 8.1948 9.59267L7.0247 15.8002H8.68221L9.16974 14.6627L10.5021 14.6627Z" />
                                </svg>
                                {!locationLoading &&
                                  resolveAbbreviation(
                                    journey.Segments[0].DepartureStation
                                  )}
                                <svg
                                  width="17"
                                  height="8"
                                  viewBox="0 0 17 8"
                                  className="mx-5 w-5 h-5 text-[#9E9BBF] group-hover:text-[#9E9BBF]"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M16.3536 4.35355C16.5488 4.15829 16.5488 3.84171 16.3536 3.64645L13.1716 0.464466C12.9763 0.269204 12.6597 0.269204 12.4645 0.464466C12.2692 0.659728 12.2692 0.976311 12.4645 1.17157L15.2929 4L12.4645 6.82843C12.2692 7.02369 12.2692 7.34027 12.4645 7.53553C12.6597 7.7308 12.9763 7.7308 13.1716 7.53553L16.3536 4.35355ZM16 3.5L0 3.5V4.5L16 4.5V3.5Z" />
                                </svg>
                                {!locationLoading &&
                                  resolveAbbreviation(
                                    journey.Segments[0].ArrivalStation
                                  )}
                              </div>
                            }
                            key={index + 1}
                          >
                            <SeatWrapper
                              setShow={setShow}
                              ticketIndex={index}
                              key={index + 2}
                              productClass={
                                journey?.Segments[0].Fares[0].RuleNumber
                              }
                            />
                          </TabPane>
                        )
                    )}
                  </Tabs>
                </section>
              )}
            </div>
          </section>
        </section>

        <div className="sticky bottom-0 border border-t-2 border-[#dadce0] z-40 bg-[#fff] p-6 w-full">
          <div className="flex md:justify-items-end gap-2">
            <button
              onClick={skipSeatSelection}
              className="btn btn-outline text-center mr-4 w-1/2 md:w-1/6 md:ml-auto"
            >
              {checkInLoading ? "Processing" : "Skip"}
            </button>

            {seats?.length > 0 && (
              <button
                className="btn btn-primary w-1/2 md:w-1/6"
                onClick={initAssignSeats}
                disabled={isLoading}
              >
                {isLoading ? "Assigning..." : "Continue"}
              </button>
            )}
          </div>
        </div>
      </BaseLayout>
      <Popup display={showPopUp} closeModal={() => setShow(false)} top={true}>
        <Seatslegend />
      </Popup>
      <Popup
        display={showEmergency}
        closeModal={() => setEmergency(false)}
        top={true}
        width="w-[507px]"
      >
        <section className="w-full bg-white rounded-xl ">
          <div className="flex flex-col items-center justify-center p-[50px]">
            <h6 className="font-display text-xl mb-5">Emergency Seats</h6>

            <p className="text-center font-body text-sm mb-6">
              Sorry, this seat can only be reserved for passengers that are at
              least 18 years old with no visual or hearing impairment; must have
              sufficient mobility, strength and dexterity in both arms, hands
              and legs to assist in an evacuation.
            </p>
            <div className="flex items-center justify-between w-full">
              <button className="btn btn-primary basis-[48%]  mr-2">
                Accept
              </button>
              <button className="btn btn-outline basis-[48%]">Cancel</button>
            </div>
          </div>
        </section>
      </Popup>
    </>
  );
};

export default SeatSelection;
