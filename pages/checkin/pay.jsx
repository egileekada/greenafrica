/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import PaymentMark from "assets/svgs/payment-mark.svg";
import PaymentOutline from "assets/svgs/payment-outline.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  sessionSelector,
  retrieveBookingFromState,
} from "redux/reducers/session";
import { paymentSelector, FetchPaymentGateways } from "redux/reducers/payment";
import Spinner from "components/Spinner";
import { notification } from "antd";
import { useRouter } from "next/router";
import { usePaystackPayment } from "react-paystack";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useInitiatePaymentMutation } from "services/widgetApi";

const CheckinPayment = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { bookingCommitLoading, bookingState, signature } =
    useSelector(sessionSelector);

  const { gatewaysLoading, gatewaysResponse, paymentLoading } =
    useSelector(paymentSelector);

  const [config, setConfig] = useState({
    reference: "",
    email: "",
    amount: null,
    publicKey: "",
    text: "",
  });
  const initializePayment = usePaystackPayment(config);
  const handleFlutterPayment = useFlutterwave(config);

  const [initPayment] = useInitiatePaymentMutation();
  const [totalFare, setTotalFare] = useState();
  const [selected, setSelected] = useState(1);

  const onSuccess = (reference) => {
    window.location.assign(reference?.redirecturl);
  };

  const onClose = () => {
    console.log("closed");
  };

  useEffect(() => {
    async function fetchGateways() {
      setTotalFare(parseInt(bookingState?.BookingSum?.BalanceDue));
      dispatch(FetchPaymentGateways());
      dispatch(retrieveBookingFromState());
    }
    fetchGateways();
  }, []);

  const handlePayment = async () => {
    if (bookingState) {
      const payload = {
        customer_name: `${bookingState.BookingContacts[0].Names[0].FirstName} ${bookingState?.BookingContacts[0].Names[0].LastName}`,
        customer_email: bookingState?.BookingContacts[0].EmailAddress,
        amount: totalFare * 100,
        pnr: bookingState?.RecordLocator,
        gateway_type_id: selected,
        payment_origin: "checkin",
        signature,
      };

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
        .catch((error) => console.log(error));
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
          window.location.assign(
            `https://dev-ibe.gadevenv.com/checkin/confirm-payment?reference=${response.tx_ref}`
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
                            key={_i}
                            onClick={() => setSelected(_gateway.id)}
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

export default CheckinPayment;
