/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useEffect } from "react";
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import IbeAdbar from "containers/IbeAdbar";
import SkeletonLoader from "components/SkeletonLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  sessionSelector,
  GetBookingDetailsWithPNR,
  saveClientSignature,
} from "redux/reducers/session";
import {
  bookingSelector,
  saveTripParams,
  saveReturnParams,
  setManageBookingPnr,
} from "redux/reducers/booking";
import { paymentSelector } from "redux/reducers/payment";
import { useRouter } from "next/router";
import Link from "next/link";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";
import { decryptPnr } from "lib/utils";
import ManagePassengerItem from "containers/Booking/components/PassengerItem";
import { atcb_action } from "add-to-calendar-button";
import "add-to-calendar-button/assets/css/atcb.css";
import {
  useGetLocationsQuery,
  useGetPaymentConfigsQuery,
} from "services/widgetApi.js";
import PageFares from "./components/PageFares";
import LogoIcon from "assets/svgs/logo.svg";
import Spinner from "components/Spinner";
import {
  useGetAccountByReferenceMutation,
  useStartSessionMutation,
} from "services/bookingApi";
import { notification } from "antd";

const ManageBookings = (props) => {
  const router = useRouter();
  const [statePNR, setStatePnr] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);
  const dispatch = useDispatch();
  const { bookingResponseLoading, bookingResponse, signature } =
    useSelector(sessionSelector);
  const { verifyManageBookingResponse } = useSelector(paymentSelector);
  const { tripParams, returnParams, managedPnrWithoutPayment } =
    useSelector(bookingSelector);
  const { data, isLoading: locationLoading } = useGetLocationsQuery();
  const { data: paymentConfigs } = useGetPaymentConfigsQuery();
  const [getAccountByReference] = useGetAccountByReferenceMutation();
  const [getCreds, { isLoading }] = useStartSessionMutation();

  const { bookingId } = router.query;

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return `${name}`;
  };

  useEffect(() => {
    ScrollToTop();
  }, []);

  const parsed = router.asPath.split(/\?/)[1];

  async function fetchBookingDetails(pnr, newsignature = signature) {
    if (newsignature) {
      if (pnr) {
        setStatePnr(pnr);
        dispatch(setManageBookingPnr(pnr));
        dispatch(GetBookingDetailsWithPNR({ pnr: pnr }));

        const payload = {
          header: {
            signature: newsignature,
            messageContractVersion: "",
            enableExceptionStackTrace: true,
            contractVersion: 0,
          },
          getAccountByReferenceRequestDto: {
            getAccountByReferenceReqData: {
              accountReference: pnr,
              currencyCode: "NGN",
              accountHolderType: 0,
              accountHolderTypeSpecified: true,
            },
          },
        };

        getAccountByReference(payload)
          .unwrap()
          .then((data) => {
            const _availableCredit = parseInt(data?.Account?.AvailableCredits);
            if (_availableCredit > 0) {
              router.push(
                {
                  pathname: "/credit/home",
                  query: {
                    pnr: pnr,
                  },
                },
                "/credit/home"
              );
            }
          })
          .catch(() => {
            notification.error({
              message: "Error",
              description: "Getting acount details failed",
            });
          });
      }
    }
  }

  const requestSignature = async (parsedBookingId) => {
    getCreds()
      .unwrap()
      .then((data) => {
        const credvalue = data.signature;
        window.localStorage.setItem("clientSignature", credvalue);
        dispatch(saveClientSignature(credvalue));
        if (data && !isLoading) {
          fetchBookingDetails(
            decryptPnr(parsedBookingId, "/bookings"),
            data.signature
          );
        }
      })
      .catch((e) => {
        notification.error({
          message: "Error",
          description: "Signature creation failed",
        });
      });
  };

  useEffect(() => {
    if (router.isReady) {
      //check if pnr is encrypted
      if (bookingId !== undefined) {
        let parsedBookingId = parsed.split("bookingId=").pop();
        if (signature) {
          fetchBookingDetails(decryptPnr(parsedBookingId, "/bookings"));
        } else {
          requestSignature(parsedBookingId);
        }
      } else if (!props.pnr) {
        router.push("/bookings");
      } else {
        fetchBookingDetails(props.pnr);
      }
    }
  }, [router]);

  useEffect(() => {
    if (
      bookingResponse &&
      bookingResponse?.Booking &&
      bookingResponse?.Booking?.Journeys?.length > 0
    ) {
      const _manageIndicator = parseInt(bookingResponse?.ManageIndicator);
      if (_manageIndicator > 0) {
        setCheckedIn(true);
      } else {
        setCheckedIn(false);
      }
    }
  }, [bookingResponse]);

  const formatPaymentStatus = (status) => {
    let res = "";
    switch (parseInt(status)) {
      case 1:
        res = "Pending";
        break;
      case 2:
        res = "Under Paid";
        break;
      case 3:
        res = "Approved";
        break;
      case 4:
        res = "Over Paid";
        break;
      case 5:
        res = "Pending Customer Action";
        break;
      case 6:
        res = "Pending Customer Action";
        break;
      default:
        res = "";
    }
    return res;
  };

  const TripHeader = () => {
    return (
      <section className="ibe__flight__info__destination">
        <p>Booking Code: {bookingResponse?.Booking?.RecordLocator}</p>
        <figure className="flightCircle">
          <FlightIcon />
        </figure>
      </section>
    );
  };

  const PassengersSection = () => {
    return (
      <section className="mx-6 my-6 flex flex-col ">
        <h3 className="title-text no-mb font-700 text-sm">
          PASSENGER
          {bookingResponse?.Booking?.Passengers?.length > 0 ? "S" : ""}
        </h3>
        <section className="flex flex-col">
          {bookingResponse?.Booking?.Passengers.map((_pax, _paxIndex) => {
            return (
              <ManagePassengerItem passenger={_pax} paxIndex={_paxIndex} />
            );
          })}
        </section>
      </section>
    );
  };
  // Generate add booking to calendar data
  const myData = [];
  bookingResponse?.Booking?.Journeys.forEach((journey) => {
    const data = {
      name: `Flight to ${
        !locationLoading &&
        resolveAbbreviation(journey.Segments[0].ArrivalStation)
      } (${journey.Segments[0].FlightDesignator?.CarrierCode} ${
        journey.Segments[0].FlightDesignator?.FlightNumber
      })`,
      description: `Green Africa flight ${
        journey.Segments[0].FlightDesignator?.CarrierCode
      } ${journey.Segments[0].FlightDesignator?.FlightNumber} | ${
        !locationLoading &&
        resolveAbbreviation(journey.Segments[0].DepartureStation)
      } (${journey.Segments[0].DepartureStation}) ${format(
        new Date(journey.Segments[0]?.STD),
        "hh:mm bbb"
      )} (local time) - ${
        !locationLoading &&
        resolveAbbreviation(journey.Segments[0].ArrivalStation)
      } (${journey.Segments[0].ArrivalStation}) ${format(
        new Date(journey.Segments[0]?.STA),
        "hh:mm bbb"
      )} (local time)
        
      Booking number: ${bookingResponse?.Booking?.RecordLocator}`,
      startDate: format(new Date(journey.Segments[0]?.STD), "yyyy-MM-dd"),
      startTime: format(new Date(journey.Segments[0]?.STD), "HH:mm"),
      endTime: format(new Date(journey.Segments[0]?.STA), "HH:mm"),
    };
    myData.push(data);
  });

  const PageCTA = () => {
    return (
      <section
        className={`flex flex-wrap md:flex-nowrap mx-6 ${
          checkedIn ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
        }`}
        // className={`flex flex-wrap md:flex-nowrap mx-6`}
      >
        <button
          className="btn btn-primary font-title block h-full mb-3 md:mb-0 md:mr-3"
          onClick={() =>
            atcb_action({
              name: "name",
              dates: myData,
              options: [
                "Apple",
                "Google",
                "iCal",
                "Microsoft365",
                "Outlook.com",
                "Yahoo",
              ],
              iCalFileName: "Reminder-Event",
            })
          }
        >
          Add to Calendar
        </button>
        <button
          className={`basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3 ${
            checkedIn ||
            parseInt(bookingResponse?.Booking?.BookingSum?.BalanceDue) > 0
              ? "pointer-events-none opacity-50 cursor-not-allowed"
              : ""
          } `}
          onClick={handleItenary}
        >
          Change Flight
        </button>
        <button
          onClick={handleServices}
          // className={`basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3 `}
          className={`basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3 ${
            checkedIn ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Manage Services
        </button>
        <Link href="/bookings/seat-selection">
          <a
            className={`basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3 text-center ${
              checkedIn
                ? "pointer-events-none opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Seat Management
          </a>
        </Link>
      </section>
    );
  };

  const PaymentContact = () => {
    return (
      <section className="flex mx-6 mt-6 justify-between">
        <div className="basis-[48%]">
          {bookingResponse?.Booking?.Payments?.map((_payment) => {
            return (
              <div className="trip__summary__item !mb-6">
                <h2 className="trip-title mb-2 font-semibold text-primary-main">
                  PAYMENT DETAILS
                </h2>
                <div className="flex flex-col">
                  <section className="flex flex-col">
                    <>
                      <div className="trip__summary__details">
                        <div className="f-1">
                          <h5>Type:</h5>
                        </div>
                        <div className="f-1">
                          <h6>
                            {paymentConfigs &&
                              resolvePaymnet(_payment?.PaymentMethodCode)}
                          </h6>
                        </div>
                      </div>
                      <div className="trip__summary__details">
                        <div className="f-1">
                          <h5>Date:</h5>
                        </div>
                        <div className="f-1">
                          <h6>
                            {format(
                              new Date(_payment?.ApprovalDate),
                              "d MMMM yyyy"
                            )}
                          </h6>
                        </div>
                      </div>
                      <div className="trip__summary__details">
                        <div className="f-1">
                          <h5>Status:</h5>
                        </div>
                        <div className="f-1">
                          <h6>{formatPaymentStatus(_payment?.Status)}</h6>
                        </div>
                      </div>
                      <div className="trip__summary__details">
                        <div className="f-1">
                          <h5>Total Fare:</h5>
                        </div>
                        <div className="f-1">
                          <h6>
                            ₦{_payment?.PaymentAmount?.toLocaleString("NGN")}
                          </h6>
                        </div>
                      </div>
                    </>
                  </section>
                </div>
              </div>
            );
          })}
        </div>
        <div className="basis-[48%]">
          <div className="trip__summary__item">
            <h2 className="trip-title mb-2 font-semibold text-primary-main">
              CONTACT DETAILS
            </h2>
            <div className="flex flex-col">
              <section className="flex flex-col ">
                {bookingResponse?.Booking?.BookingContacts?.map((_contact) => {
                  return (
                    <>
                      <div className="trip__summary__details">
                        <div className="f-1">
                          <h5>Name:</h5>
                        </div>
                        <div className="f-1">
                          <h6>{`${_contact?.Names[0]?.FirstName} ${_contact?.Names[0]?.LastName}`}</h6>
                        </div>
                      </div>
                      <div className="trip__summary__details">
                        <div className="f-1">
                          <h5>Email:</h5>
                        </div>
                        <div className="f-1">
                          <h6>{_contact?.EmailAddress}</h6>
                        </div>
                      </div>
                      <div className="trip__summary__details">
                        <div className="f-1">
                          <h5>Phone Number:</h5>
                        </div>
                        <div className="f-1">
                          <h6>{_contact?.HomePhone}</h6>
                        </div>
                      </div>
                    </>
                  );
                })}
              </section>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const TabContent = () => {
    return (
      <>
        {bookingResponse?.Booking?.Journeys?.length > 0 ? (
          <>
            {bookingResponse?.Booking?.Journeys.map((_journey, _index) => {
              return (
                <SingleJourneyItem journey={_journey} journeyIndex={_index} />
              );
            })}
            <PageCTA />
            <PassengersSection />
            <PaymentContact />
            <PageFares />
          </>
        ) : (
          <p className="errorText p-4">No Journeys</p>
        )}
      </>
    );
  };

  const handleItenary = () => {
    let _JourneyOneTax = 0;
    let _JourneyOneFare = 0;

    const _JourneyOneServiceCharges =
      bookingResponse?.Booking?.Journeys[0].Segments[0].Fares[0].PaxFares[0]
        .ServiceCharges;

    _JourneyOneServiceCharges.map((_serviceCharge) => {
      _serviceCharge.ChargeCode === ""
        ? (_JourneyOneFare = _serviceCharge?.Amount)
        : (_JourneyOneTax = _JourneyOneTax + parseInt(_serviceCharge?.Amount));
    });

    const _STD = format(
      new Date(bookingResponse?.Booking?.Journeys[0].Segments[0].STD),
      "yyyy-MM-dd"
    );
    const tripPayload = {
      departureStation:
        bookingResponse?.Booking?.Journeys[0].Segments[0].DepartureStation,
      arrivalStation:
        bookingResponse?.Booking?.Journeys[0].Segments[0].ArrivalStation,
      beginDate: _STD,
      endDate: _STD,
      returnDate: null,
      goStd: _STD,
      returnSTD: null,
      isRoundTrip: bookingResponse?.Booking?.Journeys.length > 1 ? true : false,
      totalPaxCount: bookingResponse?.Booking?.Passengers.length,
      taxAmount: _JourneyOneTax,
      minimumFarePrice: _JourneyOneFare,
      serviceBundleItem:
        bookingResponse?.Booking?.Journeys[0].Segments[0].Fares[0].RuleNumber,
      scheduleIndex: 0,
      currentDate: new Date(),
      LiftStatus: bookingResponse?.Booking?.Journeys[0]?.State,
    };

    // const goStd = bookingResponse?.Booking?.Journeys[0].Segments[0].STD;

    if (bookingResponse?.Booking?.Journeys.length > 1) {
      let _JourneyTwoTax = 0;
      let _JourneyTwoFare = 0;

      const _JourneyTwoServiceCharges =
        bookingResponse?.Booking?.Journeys[1].Segments[0].Fares[0].PaxFares[0]
          .ServiceCharges;

      _JourneyTwoServiceCharges.map((_serviceCharge) => {
        _serviceCharge.ChargeCode === ""
          ? (_JourneyTwoFare = _serviceCharge?.Amount)
          : (_JourneyTwoTax =
              _JourneyTwoTax + parseInt(_serviceCharge?.Amount));
      });

      const _beginSTD = format(
        new Date(bookingResponse?.Booking?.Journeys[0].Segments[0].STD),
        "yyyy-MM-dd"
      );

      const _returnSTD = format(
        new Date(bookingResponse?.Booking?.Journeys[1].Segments[0].STD),
        "yyyy-MM-dd"
      );

      const returnPayload = {
        departureStation:
          bookingResponse?.Booking?.Journeys[1].Segments[0].DepartureStation,
        arrivalStation:
          bookingResponse?.Booking?.Journeys[1].Segments[0].ArrivalStation,
        beginDate: _beginSTD,
        endDate: _beginSTD,
        returnDate: _returnSTD,
        goStd: _beginSTD,
        returnSTD: _returnSTD,
        isRoundTrip: true,
        totalPaxCount: bookingResponse?.Booking?.Passengers.length,
        taxAmount: _JourneyTwoTax,
        minimumFarePrice: _JourneyTwoFare,
        serviceBundleItem:
          bookingResponse?.Booking?.Journeys[1].Segments[0].Fares[0].RuleNumber,
        scheduleIndex: 1,
        currentDate: new Date(),
        LiftStatus: bookingResponse?.Booking?.Journeys[1]?.State,
      };

      dispatch(saveTripParams(tripPayload));
      dispatch(saveReturnParams(returnPayload));
      router.push("/bookings/change-flight");
    } else {
      dispatch(saveTripParams(tripPayload));
      router.push("/bookings/change-flight");
    }
  };

  const handleServices = () => {
    if (bookingResponse && bookingResponse?.Booking?.Journeys) {
      const tripPayload = {
        ...tripParams,
        LiftStatus: bookingResponse?.Booking?.Journeys[0]?.State,
      };

      if (bookingResponse?.Booking?.Journeys.length > 1) {
        const returnPayload = {
          ...returnParams,
          LiftStatus: bookingResponse?.Booking?.Journeys[1]?.State,
        };
        dispatch(saveTripParams(tripPayload));
        dispatch(saveReturnParams(returnPayload));
        router.push("/bookings/services");
      } else {
        dispatch(saveTripParams(tripPayload));
        router.push("/bookings/services");
      }
    }
  };

  const resolvePaymnet = (abrreviation) => {
    const chosen = paymentConfigs?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return chosen?.length > 0 ? chosen[0]?.name : ``;
  };

  const SingleJourneyItem = ({ journey, journeyIndex }) => {
    return journey?.Segments.map((_segment) => {
      return (
        <>
          <div className="mx-6">
            <h3 className="title-text">
              {journeyIndex === 0 ? "Departing" : "Returning"} on &nbsp;
              {format(new Date(_segment?.STD), "EEEE, LLLL dd yyyy")}
            </h3>
          </div>
          <section className="ibe__trip__item checkinView bordered mx-6 my-3">
            {_segment?.Fares.map((_fare) => {
              return (
                <p className="bg-primary-main text-green py-1 px-2  rounded-[4px] absolute left-6 top-3">
                  {_fare?.RuleNumber.toLowerCase() === "savr" && "gSaver"}
                  {_fare?.RuleNumber.toLowerCase() === "flex" && "gFlex"}
                  {_fare?.RuleNumber.toLowerCase() === "clsc" && "gClassic"}
                </p>
              );
            })}

            {locationLoading ? (
              <div className="p-4">
                <Spinner />
              </div>
            ) : data?.data?.items ? (
              <div className="basis-full lg:basis-[60%] w-full flex flex-col min-h-[54px] px-6 mb-10">
                <p className="tripType self-center">
                  {" "}
                  {_segment?.FlightDesignator?.CarrierCode}{" "}
                  {_segment?.FlightDesignator?.FlightNumber}
                </p>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h5 className="tripType">
                      {" "}
                      {format(new Date(_segment?.STD), "HH:mm")}
                    </h5>
                    <p className="tripCity">
                      {" "}
                      {_segment?.DepartureStation &&
                        resolveAbbreviation(_segment?.DepartureStation)}
                    </p>
                  </div>
                  <div className="tripIconPath">
                    <DottedLine className="dotted-svg" />
                    <AeroIcon className="aero-svg" />
                    <DottedLine className="dotted-svg" />
                  </div>
                  <div className="flex flex-col  items-end">
                    <h5 className="tripType right-text">
                      {" "}
                      {format(new Date(_segment?.STA), "HH:mm")}
                    </h5>
                    <p className="tripCity right-text">
                      {" "}
                      {_segment?.ArrivalStation &&
                        resolveAbbreviation(_segment?.ArrivalStation)}
                    </p>
                  </div>
                </div>
                <p className="tripTime self-center">
                  {" "}
                  {timeConvert(
                    differenceInMinutes(
                      new Date(_segment?.STA),
                      new Date(_segment?.STD)
                    )
                  )}
                </p>
              </div>
            ) : null}
          </section>
        </>
      );
    });
  };

  const goBackToHome = () => {
    window.location.assign("https://dev-website.gadevenv.com/");
  };

  const handlePayment = () => {
    router.push("/bookings/payment");
  };

  return (
    <Fragment>
      <BaseLayout>
        <nav className="top__bar logo-holder">
          <button onClick={goBackToHome}>
            <figure className="cursor-pointer">
              <LogoIcon />
            </figure>
          </button>
        </nav>

        {bookingResponse &&
          bookingResponse?.Booking &&
          parseInt(bookingResponse?.Booking?.BookingSum?.BalanceDue) > 0 &&
          parseInt(bookingResponse?.Booking?.BookingInfo?.BookingStatus) >=
            0 && (
            <nav className="manage-booking-bar">
              <p className="font-display text-base text-primary-main">
                Your booking is on hold. Please review the booking details and
                complete the payment
              </p>
              <button className="btn btn-primary" onClick={handlePayment}>
                Pay ₦
                {parseInt(
                  bookingResponse?.Booking?.BookingSum?.BalanceDue
                ).toLocaleString("NGN")}
              </button>
            </nav>
          )}

        <section className="w-full checkin">
          {bookingResponseLoading || isLoading ? (
            <div className="px-12 py-12">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          ) : (
            <section className="ga__section relative">
              {(verifyManageBookingResponse &&
                verifyManageBookingResponse?.pnr.toLowerCase() ===
                  statePNR.toLowerCase()) ||
              (managedPnrWithoutPayment &&
                managedPnrWithoutPayment?.toLowerCase() ===
                  statePNR.toLowerCase()) ? (
                <div className="flex text-center items-center justify-center bg-green absolute w-full p-3">
                  <p>Your booking has been confirmed</p>
                </div>
              ) : null}
              <div className="ga__section__main">
                <div className="mb-8 mt-16 xlg:mt-3">
                  {bookingResponse?.Booking ? (
                    <>
                      <h2 className="text-black font-bold text-2xl mb-2">
                        Booking
                      </h2>
                    </>
                  ) : null}
                </div>

                {bookingResponse?.Booking ? (
                  <section className="flex flex-col bg-white pb-24">
                    <TripHeader />
                    <TabContent />
                  </section>
                ) : (
                  <p className="errorText text-lg">Error occured flight</p>
                )}
              </div>

              <div className="ga__section__side">
                <IbeAdbar />
              </div>
            </section>
          )}
        </section>
      </BaseLayout>
    </Fragment>
  );
};

export default ManageBookings;

export async function getServerSideProps(context) {
  return {
    props: {
      pnr: context.query.pnr ? context.query.pnr : "",
    },
  };
}
