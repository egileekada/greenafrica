import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BaseLayout from "layouts/Base";
import { useFormik } from "formik";
import * as Yup from "yup";
import { notification, Modal } from "antd";
import { useDispatch } from "react-redux";
import {
  useFindBookingMutation,
  useGetBookingMutation,
} from "services/bookingApi";
import { startSession } from "redux/reducers/session";
import { resetStore } from "redux/store";
import LogoIcon from "assets/svgs/logo.svg";

import FormError from "components/formError";

const validationSchema = Yup.object().shape({
  pnr: Yup.string()
    .length(6, "Booking Reference must be exactly 6 values")
    .required("Required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Required"),
});

const CreditIndex = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [findBooking, { isLoading }] = useFindBookingMutation();
  const [initGetBooking] = useGetBookingMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    resetStore();
    dispatch(startSession());
  }, []);

  const formik = useFormik({
    initialValues: {
      pnr: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);

      findBooking(values)
        .unwrap()
        .then((data) => {
          checkPnr(values.pnr);
        })
        .catch((error) => {
          notification.error({
            message: "Error",
            description: error?.data?.Error?.ErrorText,
          });
        });
    },
  });

  const checkPnr = (pnr) => {
    initGetBooking(pnr)
      .unwrap()
      .then((data) => {
        if (
          data.Booking.BookingQueueInfos.some(
            (booking) => booking.QueueCode === "NOFLY"
          )
        ) {
          setMessage(
            "Currently, the system is unable to handle your request. Please call 0700-GREEN-AFRICA (0700-47336-237422) or send an email to gcare@greenafrica.com if you need further information. You will receive a response from a dedicated gCare Specialist."
          );
          setIsModalOpen(true);
        } else {
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
      .catch((error) => console.log(error));
  };

  const goBackToHome = () => {
    window.location.assign("https://dev-website.gadevenv.com/");
  };

  return (
    <BaseLayout>
      <nav className="top__bar logo-holder">
        <button onClick={goBackToHome}>
          <figure className="cursor-pointer">
            <LogoIcon />
          </figure>
        </button>
      </nav>
      <section className="w-full px-3.5 pt-32 lg:py-10 lg:fit-x-bleed">
        <div className="container mx-auto mb-10">
          <h1 className="text-primary-main text-2xl mb-4">
            Manage Booking Credit
          </h1>
          <p>
            Please input your 6 digit Booking Reference and email address used
            on your booking to retrieve your current flight information.
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="bg-white rounded-lg my-14 border-2 border-[#9E9BBF33]">
              <div className="mx-2 p-4 lg:p-8">
                <p className="text-primary-main font-semibold text-base mb-4">
                  Enter flight details to view your booking
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
                  <div className="my-3 col-span-2">
                    <div
                      className={`${
                        formik.touched.pnr && formik.errors.pnr
                          ? "border border-[#de0150]"
                          : "border-gray-300"
                      } relative rounded-md z-0 border border-1 pt-4 px-4`}
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
                      } relative rounded-md z-0 border border-1 pt-4 px-4`}
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
              </div>
            </div>
          </form>
        </div>
      </section>

      <Modal className="modalStyle" visible={isModalOpen} footer={null}>
        <div className="px-5 pb-5 pt-10 text-center">
          <h1 className="text-lg font-normal">{message}</h1>

          <button
            onClick={() => setIsModalOpen(false)}
            className="btn btn-primary basis-full md:basis-auto my-10 md:mb-0 mx-auto"
          >
            Ok
          </button>
        </div>
      </Modal>
    </BaseLayout>
  );
};

export default CreditIndex;
