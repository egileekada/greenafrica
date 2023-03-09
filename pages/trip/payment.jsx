/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from "react";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import PaymentMark from "assets/svgs/payment-mark.svg";
import PaymentOutline from "assets/svgs/payment-outline.svg";
import { useDispatch, useSelector } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import {
  GetBookingCommit,
  sessionSelector,
  FetchStateFromServer,
} from "redux/reducers/session";
import { paymentSelector, FetchPaymentGateways } from "redux/reducers/payment";

import { retrieveBookingFromState } from "redux/reducers/session";
import SkeletonLoader from "components/SkeletonLoader";
import { notification } from "antd";
import { useRouter } from "next/router";
import { useInitiatePaymentMutation } from "services/widgetApi";
import LogoIcon from "assets/svgs/logo.svg";

import { useFormik } from "formik";
import * as Yup from "yup";
import FormError from "components/formError";
import { useCheckCreditShellQuery } from "services/widgetApi";
import toast from "react-hot-toast";
import Popup from "components/Popup";

const validationSchema = Yup.object().shape({
  pnr: Yup.string()
    .length(6, "Booking Reference must be exactly 6 values")
    .required("Required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Required"),
});

const TripPayment = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [totalFare, setTotalFare] = useState();
  const [selected, setSelected] = useState(1);
  const [checking, setChecking] = useState(false);
  const [creditModal, setCreditModal] = useState(false);
  const [creditQuery, setCreditQuery] = useState(null);

  const {
    bookingCommitLoading,
    bookingCommitResponse,
    sessionContact,
    sellSSRResponse,
    bookingState,
    signature,
  } = useSelector(sessionSelector);

  const { gatewaysLoading, gatewaysResponse, paymentLoading } =
    useSelector(paymentSelector);

  const { data, isLoading } = useCheckCreditShellQuery(creditQuery, {
    skip: creditQuery ? false : true,
  });

  const [config, setConfig] = useState({
    reference: "",
    email: "",
    amount: null,
    publicKey: "",
    text: "",
    payment_options: "",
  });

  const [initPayment] = useInitiatePaymentMutation();

  const initializePayment = usePaystackPayment(config);
  const handleFlutterPayment = useFlutterwave(config);

  const onSuccess = (reference) => {
    window.location.assign(reference?.redirecturl);
  };

  const onClose = () => {
    console.log("closed");
  };

  useEffect(() => {
    if (data) {
      const isBalanceDue = data?.data?.isBalanceDue;
      const _balanceDue = data?.data?.balanceDue;

      if (isBalanceDue && _balanceDue > 0) {
        toast.success(
          `You still have a balance of ₦${_balanceDue.toLocaleString()} to pay, kindly use any of our payment channels`
        );
        setTotalFare(data?.data?.balanceDue);
        setCreditQuery(null);
        setCreditModal(false);
        setChecking(false);
      } else {
        toast.success("Payment with credit shell succesful");
        setCreditQuery(null);
        setCreditModal(false);
        setChecking(false);
        const _recordLocator =
          bookingCommitResponse?.BookingUpdateResponseData?.Success
            ?.RecordLocator;
        router.push(`/trip/confirm-trip?pnr=${_recordLocator}`);
      }
    }
  }, [data]);

  useEffect(() => {
    async function checkForSession() {
      if (bookingState) {
        if (
          bookingState?.Passengers.length < 1 ||
          bookingState?.Journeys.length < 1
        ) {
          notification.error({
            message: "Error",
            description: "No Passenger and journey in state",
          });
        }
      } else {
        notification.error({
          message: "Error",
          description: "No Booking in state",
        });
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
      if (parseInt(selected) === 3) {
        setCreditModal(true);
      } else {
        const payload = {
          customer_name: sessionContact?.firstName,
          customer_email: sessionContact?.email,
          amount: totalFare * 100,
          pnr: bookingCommitResponse?.BookingUpdateResponseData?.Success
            ?.RecordLocator,
          gateway_type_id: selected,
          payment_origin: "booking",
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
                name: sessionContact?.firstName,
              },
            });
          })
          .catch((error) => console.log(error));
      }
    } else {
      notification.error({
        message: "Error",
        description: "System Error, Try agin after 15 seconds",
      });
    }
  };

  // flw_ref

  const goBackToHome = () => {
    window.location.assign("https://dev-website.gadevenv.com/");
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
          console.log(response);
          window.location.assign(
            `https://dev-ibe.gadevenv.com/trip/confirm-payment?reference=${response.tx_ref}`
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

  const handleCreditModal = () => {
    setCreditModal(false);
  };

  const formik = useFormik({
    initialValues: {
      pnr: "",
      email: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      formik.setSubmitting(true);

      const payload = {
        reference: values.pnr,
        email: values.email,
        creditShell: true,
        signature: signature,
      };

      setCreditQuery(payload);
      setChecking(true);
    },
  });

  return (
    <BaseLayout>
      <nav className="top__bar logo-holder">
        <button onClick={goBackToHome}>
          <figure className="cursor-pointer">
            <LogoIcon />
          </figure>
        </button>
      </nav>
      <section className="w-full">
        {/* {bookingCommitLoading && <p>Saving booking details...</p>} */}
        {bookingCommitLoading ? (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : bookingCommitResponse ? (
          gatewaysLoading ? (
            <section className="py-10 pl-12">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
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
          )
        ) : (
          <section className="py-10 pl-12">
            <p>Processsing Details........</p>
          </section>
        )}
      </section>
      <Popup
        display={creditModal}
        closeModal={handleCreditModal}
        top={true}
        width="w-[600px]"
      >
        <section className="w-full bg-white rounded-xl ">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full p-10">
              <p className="text-primary-main font-medium text-base mb-4 text-center">
                Provide your credit shell email & PNR
              </p>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-3">
                  <div className="my-3 col-span-2">
                    <div
                      className={`${
                        formik.touched.pnr && formik.errors.pnr
                          ? "border border-[#de0150]"
                          : "border-gray-300"
                      } relative rounded-md z-0 border-2 pt-4 px-4`}
                    >
                      <input
                        type="text"
                        id="pnr"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        name="pnr"
                        autoFocus
                        value={formik.values.pnr}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label
                        htmlFor="pnr"
                        className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 -z-10 origin-[0] peer-focus:left-4 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 uppercase"
                      >
                        Booking Reference
                      </label>
                    </div>
                    <FormError
                      touched={formik.touched.pnr}
                      message={formik.errors.pnr}
                    />
                  </div>

                  <div className="my-3 col-span-2">
                    <div
                      className={`${
                        formik.touched.email && formik.errors.email
                          ? "border border-[#de0150]"
                          : "border-gray-300"
                      } relative rounded-md z-0 border border-2 pt-4 px-4`}
                    >
                      <input
                        type="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      <label
                        htmlFor="email"
                        className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 -z-10 origin-[0] peer-focus:left-4 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 uppercase"
                      >
                        Email
                      </label>
                    </div>
                    <FormError
                      touched={formik.touched.email}
                      message={formik.errors.email}
                    />
                  </div>

                  <div className="my-3 lg:ml-auto">
                    <button
                      type="submit"
                      disabled={isLoading || checking}
                      className="btn btn-primary font-bold block w-full"
                    >
                      {isLoading || checking ? "Processing.." : "Confirm"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Popup>
    </BaseLayout>
  );
};

export default TripPayment;
