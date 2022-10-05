/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import BaseLayout from "layouts/Base";
import {
  paymentSelector,
  FetchPaymentGateways,
  VerifyManageBookingPayment,
} from "redux/reducers/payment";
import {
  retrieveBookingFromState,
  sessionSelector,
  CommitBookingWithPNR,
} from "redux/reducers/session";
import { setTripModified } from "redux/reducers/booking";
import { useDispatch, useSelector } from "react-redux";
import SkeletonLoader from "components/SkeletonLoader";
import PaymentMark from "assets/svgs/payment-mark.svg";
import PaymentOutline from "assets/svgs/payment-outline.svg";

import { notification } from "antd";
import { useRouter } from "next/router";
import { usePaystackPayment } from "react-paystack";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useInitiatePaymentMutation } from "services/widgetApi";

const PassengerDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalFare, setTotalFare] = useState();

  const { bookingState, bookingCommitLoading, signature } =
    useSelector(sessionSelector);
  const { gatewaysLoading, gatewaysResponse, verifyManageBookingLoading } =
    useSelector(paymentSelector);

  const [config, setConfig] = useState({
    reference: "",
    email: "",
    amount: null,
    publicKey: "",
    text: "",
    payment_options: "",
  });
  const initializePayment = usePaystackPayment(config);
  const handleFlutterPayment = useFlutterwave(config);

  const [initPayment] = useInitiatePaymentMutation();

  const onSuccess = (reference) => {
    if (
      reference?.status.toLowerCase() === "success" &&
      reference?.message.toLowerCase() === "approved"
    ) {
      dispatch(
        VerifyManageBookingPayment({
          ref: reference?.reference,
        })
      );
    }
  };

  const onClose = () => {
    console.log("closed");
  };

  // useEffect(() => {
  //   async function _getBookingCommit() {
  //     if (bookingState) {
  //       dispatch(CommitBookingWithPNR(bookingState?.RecordLocator));
  //     }
  //   }
  //   _getBookingCommit();
  // }, [bookingState]);

  useEffect(() => {
    async function fetchGateways() {
      dispatch(FetchPaymentGateways());
      dispatch(retrieveBookingFromState());
    }
    fetchGateways();
  }, []);

  useEffect(() => {
    async function computeTotalFare() {
      setTotalFare(parseInt(bookingState?.BookingSum?.BalanceDue));
    }
    computeTotalFare();
  }, [bookingState]);

  const handlePayment = async () => {
    if (bookingState) {
      setLoading(true);
      const payload = {
        customer_name: `${bookingState.BookingContacts[0].Names[0].FirstName} ${bookingState?.BookingContacts[0].Names[0].LastName}`,
        customer_email: bookingState?.BookingContacts[0].EmailAddress,
        amount: totalFare * 100,
        pnr: bookingState?.RecordLocator,
        gateway_type_id: selected,
        payment_origin: "manage",
        signature,
      };

      // console.log("payload", payload);

      const gateway = gatewaysResponse?.data?.items.filter(
        (gate) => gate.id === selected
      );

      await initPayment(payload)
        .unwrap()
        .then((data) => {
          setConfig({
            ...config,
            tx_ref: data?.data?.reference,
            amount: gateway[0]?.code === "PS" ? totalFare * 100 : totalFare,
            email: bookingState?.BookingContacts[0].EmailAddress,
            publicKey: gateway[0].public_key,
            public_key: gateway[0].public_key,
            reference: data?.data?.reference,
            currency: "NGN",
            customer: {
              email: bookingState?.BookingContacts[0].EmailAddress,
              name: `${bookingState.BookingContacts[0].Names[0].FirstName} ${bookingState?.BookingContacts[0].Names[0].LastName}`,
            },
          });
        })
        .catch((error) => {
          console.log("error here", error?.data);
        });
      setLoading(false);
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

  const triggerPaystack = () => {
    const gateway = gatewaysResponse?.data?.items.filter(
      (gate) => gate.id === selected
    );

    if (gateway[0]?.code === "PS") {
      initializePayment(onSuccess, onClose);
    } else {
      handleFlutterPayment({
        callback: (response) => {
          dispatch(
            VerifyManageBookingPayment({
              ref: response?.tx_ref,
            })
          );

          closePaymentModal(); // this will close the modal programmatically
        },
        onClose: () => {},
      });
    }
  };

  let storageRef = useRef(true);

  useEffect(() => {
    if (!storageRef.current) {
      triggerPaystack();
    }
    return () => {
      storageRef.current = false;
    };
  }, [config]);

  return (
    <BaseLayout>
      <section className="w-full">
        <section className="ga__section bg-normal">
          <div className="ga__section__main standalone">
            <h2 className="text-primary-main font-extrabold text-2xl mb-8">
              Payment
            </h2>

            <section className="flex flex-col rounded-xl pb-12">
              {bookingCommitLoading && <p>Saving booking details...</p>}
              {gatewaysLoading || verifyManageBookingLoading ? (
                <section className="py-10 pl-12">
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </section>
              ) : (
                <div className="payment-section">
                  {gatewaysResponse ? (
                    <>
                      <section className="flex flex-col ">
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
                                <div className="flex flex-col items-end pointer-events-none basis-[40%]">
                                  <h6 className="mb-2 md:mb-[10px]">
                                    AMOUNT DUE
                                  </h6>
                                  <h5> ₦ {totalFare?.toLocaleString()}</h5>
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
                            {loading ? "Paying" : "Pay"}
                          </button>
                        </div>
                      </section>
                    </>
                  ) : (
                    <p>No response from gateway</p>
                  )}
                </div>
              )}
            </section>
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default PassengerDetails;
