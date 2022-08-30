/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import PaymentMark from "assets/svgs/payment-mark.svg";
import PaymentOutline from "assets/svgs/payment-outline.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  GetBookingCommit,
  sessionSelector,
  FetchStateFromServer,
} from "redux/reducers/session";
import {
  paymentSelector,
  FetchPaymentGateways,
  InitializeGatewayPayment,
} from "redux/reducers/payment";

import { retrieveBookingFromState } from "redux/reducers/session";
import Spinner from "components/Spinner";
import { notification } from "antd";
import { useRouter } from "next/router";

const TripPayment = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const [totalFare, setTotalFare] = useState();
  const [selected, setSelected] = useState(1);
  const {
    bookingCommitLoading,
    bookingCommitResponse,
    sessionContact,
    contactsResponse,
    sellSSRResponse,
    bookingState,
  } = useSelector(sessionSelector);

  const { gatewaysLoading, gatewaysResponse, paymentLoading } =
    useSelector(paymentSelector);

  useEffect(() => {
    async function checkForSession() {
      if (bookingState) {
        if (
          bookingState?.Passengers.length < 1 ||
          bookingState?.Journeys.length < 1
        ) {
          window.location.assign("https://dev-website.gadevenv.com/");
        }
      } else {
        window.location.assign("https://dev-website.gadevenv.com/");
      }
    }
    checkForSession();
  }, [bookingState]);

  useEffect(() => {
    async function _getBookingCommit() {
      if (sellSSRResponse) {
        const _recordLocator =
          bookingCommitResponse?.BookingUpdateResponseData?.Success
            ?.RecordLocator;
        if (!_recordLocator || _recordLocator?.length < 1) {
          dispatch(GetBookingCommit());
        }
      }
    }
    _getBookingCommit();
  }, [sellSSRResponse]);

  useEffect(() => {
    async function fetchGateways() {
      dispatch(FetchPaymentGateways());
      dispatch(retrieveBookingFromState());
    }
    fetchGateways();
  }, []);

  useEffect(() => {
    async function fetchStateInfo() {
      dispatch(FetchStateFromServer());
    }
    fetchStateInfo();
  }, []);

  useEffect(() => {
    async function computeTotalFare() {
      setTotalFare(parseInt(bookingState?.BookingSum?.BalanceDue));
    }
    computeTotalFare();
  }, [bookingState]);

  const handlePayment = async () => {
    if (bookingCommitResponse) {
      const payload = {
        customer_name: sessionContact?.firstName,
        customer_email: sessionContact?.email,
        amount: totalFare * 100,
        pnr: bookingCommitResponse?.BookingUpdateResponseData?.Success
          ?.RecordLocator,
        gateway_type_id: selected,
        payment_origin: "booking",
      };
      dispatch(InitializeGatewayPayment(payload));
    } else {
      notification.error({
        message: "Error",
        description: "PNR Code Unavailable, Redirecting in 3s",
      });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  return (
    <BaseLayout>
      <section className="w-full">
        {bookingCommitLoading && <p>Saving booking details...</p>}
        {gatewaysLoading ? (
          <section className="py-10 pl-12">
            <Spinner />
          </section>
        ) : (
          <section className="ga__section">
            <div className="ga__section__main payment-section">
              {gatewaysResponse ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-black font-bold text-2xl mb-4">
                      Payment
                    </h2>
                    <p>Please choose your preferred payment method</p>
                  </div>

                  <section className="flex flex-col">
                    {gatewaysResponse?.data?.items?.length > 0 ? (
                      gatewaysResponse?.data?.items.map((_gateway, _i) => {
                        return (
                          <div
                            className={`payment-card ${
                              selected === _gateway?.id ? "active" : ""
                            } `}
                            onClick={() => setSelected(_gateway?.id)}
                          >
                            {selected === _gateway?.id ? (
                              <figure className="check-payment">
                                <PaymentMark />
                              </figure>
                            ) : (
                              <figure className="check-payment">
                                <PaymentOutline />
                              </figure>
                            )}
                            <div className="flex flex-col pointer-events-none">
                              <figure className="mb-2">
                                <img src={_gateway?.logo_url} alt="" />
                              </figure>
                              <h2 className="mb-3">{_gateway?.name}</h2>
                              <p>
                                You will be redirected to our secure payment
                                checkout.
                              </p>
                            </div>
                            <div className="flex flex-col items-end pointer-events-none">
                              <h6 className="mb-[10px]">AMOUNT DUE</h6>
                              <h5> {totalFare?.toLocaleString()}</h5>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No Gateways</p>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handlePayment}
                        className="btn btn-primary"
                      >
                        {paymentLoading ? "Paying" : "Pay"}
                      </button>
                    </div>
                  </section>
                </>
              ) : (
                <p>No response from gateway</p>
              )}
            </div>
            <div className="ga__section__side">
              <IbeSidebar />
            </div>
          </section>
        )}
      </section>
    </BaseLayout>
  );
};

export default TripPayment;
