import React, { useEffect } from "react";
import { useRouter } from "next/router";
import BaseLayout from "layouts/Base";
import { useFormik } from "formik";
import * as Yup from "yup";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { useFindBookingMutation } from "services/bookingApi";
import { startSession, retrieveBooking } from "redux/reducers/session";
import { resetStore } from "redux/store";

const validationSchema = Yup.object().shape({
  pnr: Yup.string().required("Required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Required"),
});

const ManageBooking = () => {
  const router = useRouter();
  const [findBooking, { isLoading }] = useFindBookingMutation();
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
          dispatch(retrieveBooking({ id: values.pnr }));
          router.push(
            {
              pathname: "/bookings/home",
              query: {
                pnr: values.pnr,
              },
            },
            "/bookings/home"
          );
        })
        .catch((error) => {
          notification.error({
            message: "Error",
            description: error?.data?.Error?.ErrorText,
          });

          // console.log(error);
        });
    },
  });

  return (
    <BaseLayout>
      <section className="w-full px-3.5 py-10 lg:fit-x-bleed">
        <div className="container mx-auto mb-10">
          <h1 className="text-primary-main text-2xl mb-4">Manage My Booking</h1>
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
                          : ""
                      } relative rounded-md z-0 border border-1 border-gray-300 pt-4 px-4`}
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
                  </div>

                  <div className="my-3 col-span-2">
                    <div
                      className={`${
                        formik.touched.email && formik.errors.email
                          ? "border border-[#de0150]"
                          : ""
                      } relative rounded-md z-0 border border-1 border-gray-300 pt-4 px-4`}
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
                  </div>

                  <div className="my-3 lg:ml-auto">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary font-bold h-full block w-full"
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
    </BaseLayout>
  );
};

export default ManageBooking;
