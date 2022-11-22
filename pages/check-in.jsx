import React from "react";
import BaseLayout from "layouts/Base";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";

const BookingReferenceSchema = Yup.object().shape({
  bookingReference: Yup.string()
    .required("Booking Reference must be exactly 6 values")
    .max(6, "Booking Reference must be exactly 6 values")
    .min(6, "Booking Reference must be exactly 6 values"),
  email: Yup.string().email().required("Email is required"),
});

const CheckIn = () => {
  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        bookingReference: "",
        email: "",
      },
      validationSchema: BookingReferenceSchema,
      onSubmit,
    });

  const onSubmit = async (values, actions) => {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  return (
    <BaseLayout>
      {/* <HomeHero /> */}
      <section className="w-full px-3.5 py-10 lg:fit-x-bleed bg-[#F4F4F4]">
        <div className="container mx-auto mb-10">
          <h1 className="text-primary-main font-bold text-2xl mb-4">
            Check in
          </h1>
          <p>
            Online check-in opens 48 hours to departure and closes 3 hours to
            departure for gClassic and gFlex Customers.
          </p>

          <p>
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
              <p className="text-primary-main font-bold text-base">
                Enter flight details to view your booking
              </p>

              <form onSubmit={handleSubmit}>
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-3">
                  <div class="my-3 col-span-2">
                    <div class="border-gray-300 relative select__wrapper rounded-md z-0  pt-4 px-4">
                      <input
                        type="text"
                        id="bookingReference"
                        class="block py-2.5 pt-3 px-0 w-full text-sm text-gray-900 bg-transparent border-transparent focus:border-transparent focus:ring-0 peer"
                        placeholder=" "
                        name="bookingReference"
                        value={values.bookingReference}
                        onChange={handleChange}
                      />

                      <label
                        for="bookingReference"
                        class="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 -z-10 origin-[0] peer-focus:left-4 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 uppercase"
                      >
                        Booking Reference
                      </label>
                    </div>
                    {errors.bookingReference && touched.bookingReference && (
                      <p className="small text-red-600 text-sm mb-0 mt-2">
                        {errors.bookingReference}
                      </p>
                    )}
                  </div>
                  <div class="my-3 col-span-2">
                    <div class="border-gray-300 relative select__wrapper rounded-md z-0 pt-4 px-4">
                      <input
                        type="email"
                        id="email"
                        class="block py-2.5 pt-3 px-0 w-full text-sm text-gray-900 bg-transparent border-transparent focus:border-transparent focus:ring-0 peer"
                        placeholder=" "
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />

                      <label
                        for="email"
                        class="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 -z-10 origin-[0] peer-focus:left-4 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 uppercase"
                      >
                        Email
                      </label>
                    </div>
                    {errors.email && touched.email && (
                      <p className=" text-red-600 text-sm mb-0 mt-2">
                        {errors.email}{" "}
                      </p>
                    )}
                  </div>
                  <div class="my-3 lg:ml-auto">
                    <button
                      type="submit"
                      class="btn btn-primary font-bold block w-full"
                      disabled={isSubmitting}
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
