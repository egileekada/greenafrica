/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import BaseLayout from "layouts/Base";
import {
  paymentSelector,
  FetchPaymentGateways,
  VerifyCreditShellPayment,
} from "redux/reducers/payment";
import { creditSelector } from "redux/reducers/credit";
import {
  retrieveBookingFromState,
  sessionSelector,
  FetchStateFromServer,
} from "redux/reducers/session";
import { useDispatch, useSelector } from "react-redux";
import SkeletonLoader from "components/SkeletonLoader";
import PaymentMark from "assets/svgs/payment-mark.svg";
import PaymentOutline from "assets/svgs/payment-outline.svg";
import { notification } from "antd";
import { useRouter } from "next/router";
import { usePaystackPayment } from "react-paystack";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useInitiatePaymentMutation } from "services/widgetApi";
import Popup from "components/Popup";
import BookingBar from "containers/IbeSidebar/BookingBar";

import { useFormik } from "formik";
import * as Yup from "yup";
import FormError from "components/formError";
import { useCheckCreditShellQuery } from "services/widgetApi";

const validationSchema = Yup.object().shape({
  pnr: Yup.string()
    .length(6, "Booking Reference must be exactly 6 values")
    .required("Required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Required"),
});

const CreditPayment = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(false);
  const [creditModal, setCreditModal] = useState(false);
  const [creditQuery, setCreditQuery] = useState(null);
  const [totalFare, setTotalFare] = useState();

  const { bookingState, bookingCommitLoading, signature } =
    useSelector(sessionSelector);
  const { gatewaysLoading, gatewaysResponse, verifyManageBookingLoading } =
    useSelector(paymentSelector);
  const { creditPnr } = useSelector(creditSelector);

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
  const initializePayment = usePaystackPayment(config);
  const handleFlutterPayment = useFlutterwave(config);

  const [initPayment] = useInitiatePaymentMutation();

  const onSuccess = (reference) => {
    if (
      reference?.status.toLowerCase() === "success" &&
      reference?.message.toLowerCase() === "approved"
    ) {
      dispatch(
        VerifyCreditShellPayment({
          ref: reference?.reference,
        })
      );
    }
  };

  const onClose = () => {
    console.log("closed");
  };

  useEffect(() => {
    if (data) {
      const isBalanceDue = data?.data?.isBalanceDue;
      const _balanceDue = data?.data?.balanceDue;
      7;

      if (isBalanceDue && _balanceDue > 0) {
        setTotalFare(data?.data?.balanceDue);
      } else {
        router.push(`/credit/confirm?pnr=${creditPnr}`);
      }
      setInitialValues({
        pnr: "",
        email: "",
      });
      setCreditQuery(null);
      setCreditModal(false);
    }
  }, [data]);

  useEffect(() => {
    async function fetchBookingDetails() {
      if (signature) {
        dispatch(FetchStateFromServer());
      }
    }
    fetchBookingDetails();
  }, [signature]);

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
      if (parseInt(selected) === 3) {
        setCreditModal(true);
      } else {
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
      }
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
            VerifyCreditShellPayment({
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

  const handleCreditModal = () => {
    setCreditModal(false);
  };

  const formik = useFormik({
    initialValues: {
      pnr:  bookingState?.RecordLocator,
      email: bookingState?.BookingContacts[0]?.EmailAddress,
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
    },
  });

 
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
                            className={`btn btn-primary ${
                              loading ? "disabled" : ""
                            }`}
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
          <div className="ga__section__side">
            <BookingBar />
          </div>
        </section>
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
                      disabled={isLoading}
                      className="btn btn-primary font-bold block w-full"
                    >
                      {isLoading ? "Processing.." : "Confirm"}
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

export default CreditPayment;
