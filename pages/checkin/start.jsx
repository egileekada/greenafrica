import React, { useEffect } from "react";
import { useRouter } from "next/router";
import BaseLayout from "layouts/Base";
import { useFormik } from "formik";
import * as Yup from "yup";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { useFindBookingMutation } from "services/bookingApi";
import { startSession, retrieveBooking } from "redux/reducers/session";

const validationSchema = Yup.object().shape({
  pnr: Yup.string().required("Required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Required"),
});

const CheckIn = () => {
  const router = useRouter();
  const [findBooking] = useFindBookingMutation();
  const dispatch = useDispatch();

  useEffect(() => {
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
          router.push(`/checkin/${values.pnr}`);
        })
        .catch((error) => {
          notification.error({
            message: "Error",
            description: error?.data?.Error?.ErrorText,
          });

          console.log(error);
        });
    },
  });

  return (
    <BaseLayout>
      <section className="w-full px-3.5 py-10 lg:fit-x-bleed bg-[#F4F4F4]">
        <div className="container mx-auto mb-10">
          <h1 className="text-primary-main font-semibold text-3xl mb-4">
            Check in
          </h1>
          <p className="text-base font-light mb-2">
            Online check-in opens 48 hours to departure and closes 3 hours to
            departure for gClassic and gFlex Customers.
          </p>

          <p className="text-base font-lightF mb-2">
            Online check-in opens 24 hours to departure and closes 3 hours to
            departure for gSaver Customers.
          </p>

          <div className="bg-white rounded-lg my-14 border-2 border-[#9E9BBF33]">
            <div className="lg:px-20">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 md:gap-10 lg:text-center">
                <div className="p-4 lg:p-10 flex flex-row items-center gap-4 lg:flex-col">
                  <img
                    src="/images/check-in-1.svg"
                    alt="Access the online check-in service"
                    className="mx-auto my-8"
                  />
                  <p className="w-5/6 mx-auto">
                    Access the online check-in service by entering your booking
                    credentials in the fields indicated.
                  </p>
                </div>

                <div className="p-4 lg:p-10 flex flex-row items-center gap-4 lg:flex-col">
                  <img
                    src="/images/check-in-2.svg"
                    alt="download or print your boarding"
                    className="mx-auto my-8"
                  />
                  <p className="w-5/6 mx-auto">
                    Remember to download or print your boarding pass when you
                    have completed the online check-in process.
                  </p>
                </div>

                <div className="p-4 lg:p-10 flex flex-row items-center gap-4 lg:flex-col">
                  <img
                    src="/images/check-in-3.svg"
                    alt="check-in at the airport"
                    className="mx-auto my-8"
                  />
                  <p className="w-5/6 mx-auto">
                    You can also check-in at the airport 2 hours before
                    departure.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t mx-2 p-4 lg:p-8">
              <p className="text-primary-main font-medium text-base mb-4">
                Enter flight details to view your booking
              </p>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
                  <div className="my-3 col-span-2">
                    <div
                      class={`${
                        formik.touched.pnr && formik.errors.pnr
                          ? "border border-[#de0150]"
                          : ""
                      } relative rounded-md z-0 border border-2 border-b-2 border-gray-300 pt-4 px-4`}
                    >
                      <input
                        type="text"
                        id="pnr"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        name="pnr"
                        autoFocus
                        value={formik.values.pnr}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label
                        for="pnr"
                        class="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 -z-10 origin-[0] peer-focus:left-4 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 uppercase"
                      >
                        Booking Reference
                      </label>
                    </div>
                  </div>

                  <div className="my-3 col-span-2">
                    <div
                      class={`${
                        formik.touched.email && formik.errors.email
                          ? "border border-[#de0150]"
                          : ""
                      } relative rounded-md z-0 border border-2 border-b-2 border-gray-300 pt-4 px-4`}
                    >
                      <input
                        type="email"
                        id="email"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      <label
                        for="email"
                        class="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 -z-10 origin-[0] peer-focus:left-4 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 uppercase"
                      >
                        Email
                      </label>
                    </div>
                  </div>

                  <div className="my-3 lg:ml-auto">
                    <button
                      type="submit"
                      className="btn btn-primary font-bold h-full block w-full"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default CheckIn;
