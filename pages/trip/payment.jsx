/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import PaymentMark from "assets/svgs/payment-mark.svg";
import PaymentOutline from "assets/svgs/payment-outline.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  PaymentToBooking,
  GetBookingCommit,
  sessionSelector,
} from "redux/reducers/session";
import {
  paymentSelector,
  FetchPaymentGateways,
  InitializeGatewayPayment,
} from "redux/reducers/payment";
import { useRouter } from "next/router";
import Spinner from "components/Spinner";

const TripPayment = () => {
  const dispatch = useDispatch();
  const [totalFare, setTotalFare] = useState();
  const [selected, setSelected] = useState(1);
  const {
    paymentBookingLoading,
    paymentBookingResponse,
    bookingCommitLoading,
    bookingCommitResponse,
    sessionContact,
    contactsResponse,
    sellSSRResponse,
  } = useSelector(sessionSelector);
  const { gatewaysLoading, gatewaysResponse } = useSelector(paymentSelector);
  const router = useRouter();

  // useEffect(() => {
  //   async function redirectFromGateway() {
  //     const payload = {
  //       ref: "BLJK136H9B5IYTAROAA",
  //     };
  //     dispatch(PaymentToBooking(payload));
  //   }
  //   redirectFromGateway();
  // }, []);

  useEffect(() => {
    async function _getBookingCommit() {
      if (sellSSRResponse || contactsResponse) {
        dispatch(GetBookingCommit());
      }
    }
    _getBookingCommit();
  }, [sellSSRResponse, contactsResponse]);

  useEffect(() => {
    async function fetchGateways() {
      dispatch(FetchPaymentGateways());
    }
    fetchGateways();
  }, []);

  useEffect(() => {
    async function computeTotalFare() {
      if (sellSSRResponse) {
        setTotalFare(
          parseInt(
            sellSSRResponse?.BookingUpdateResponseData?.Success?.PNRAmount
              ?.BalanceDue
          )
        );
      } else if (contactsResponse) {
        setTotalFare(
          parseInt(
            contactsResponse?.BookingUpdateResponseData?.Success?.PNRAmount
              ?.BalanceDue
          )
        );
      } else {
        notification.error({
          message: "Error",
          description: "Unable to fetch total flight cost",
        });
        // redirect away
      }
    }
    computeTotalFare();
  }, []);

  useEffect(() => {
    async function _redirectForComfirmation() {
      if (!bookingCommitResponse) {
        notification.error({
          message: "Error",
          description: "Unable to fetch PNR code",
        });
        // router.push("/trip/confirm");
      }
    }
    _redirectForComfirmation();
  }, [bookingCommitResponse]);

  const handlePayment = async () => {
    if (bookingCommitResponse) {
      const payload = {
        customer_name: sessionContact?.firstName,
        customer_email: sessionContact?.email,
        amount: totalFare * 100,
        pnr: "",
        gateway_type_id: selected,
      };
      dispatch(InitializeGatewayPayment(payload));
    } else {
      notification.error({
        message: "Error",
        description: "Unable to fetch PNR code",
      });
    }
  };

  return (
    <BaseLayout>
      <section className="w-full">
        {bookingCommitLoading && <p>Saving booking details...</p>}
        {/* {paymentBookingLoading ? ( */}
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
                              <h5> ₦26,501</h5>
                              <h5> ₦26,501</h5>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No Gateways</p>
                    )}
                    {/* <div
                      className={`payment-card ${
                        selected === 1 ? "active" : ""
                      } `}
                      onClick={() => setSelected(1)}
                    >
                      {selected === 1 ? (
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
                          <PaystackIcon />
                        </figure>
                        <h2 className="mb-3">Paystack</h2>
                        <p>
                          You will be redirected to our secure payment checkout.
                        </p>
                      </div>
                      <div className="flex flex-col items-end pointer-events-none">
                        <h6 className="mb-[10px]">AMOUNT DUE</h6>
                        <h5> ₦26,501</h5>
                      </div>
                    </div>
                    <div
                      className={`payment-card ${
                        selected === 2 ? "active" : ""
                      } `}
                      onClick={() => setSelected(2)}
                    >
                      {selected === 2 ? (
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
                          <FlutterwaveIcon />
                        </figure>
                        <h2 className="mb-3">Flutterwave</h2>
                        <p>
                          You will be redirected to our secure payment checkout.
                        </p>
                      </div>
                      <div className="flex flex-col items-end pointer-events-none">
                        <h6 className="mb-[10px]">AMOUNT DUE</h6>
                        <h5> ₦26,501</h5>
                      </div>
                    </div> */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handlePayment}
                        className="btn btn-primary"
                      >
                        Pay
                      </button>
                    </div>
                  </section>
                </>
              ) : (
                <p>NO response from gateway</p>
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
