/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Popup from "components/Popup";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  MERGE1: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("First name is required"),
  MERGE2: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("Last name is required"),
  MERGE8: Yup.string().required("Country is required"),
  MERGE9: Yup.string().required("State is required"),
  MERGE0: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  "group[38698][1]": Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
});

const HomePopup = ({ show, setShow }) => {
  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: false,
    initialValues: {
      MERGE0: "",
      MERGE1: "",
      MERGE2: "",
      MERGE8: "",
      MERGE9: "",
      "group[38698][1]": false,
    },
    validationSchema,
    onSubmit: (values) => {},
  });
  const [phone, setPhone] = useState("");

  return (
    <Popup display={show} closeModal={() => setShow(false)}>
      <section className="w-full bg-white rounded-xl">
        <section className="flex flex-col lg:flex-row items-center items-stretch justify-between h-full">
          <div className="basis-full md:basis-1/3 lg:bg-[#26205E] rounded-l-xl px-7 py-5 lg:pt-24 lg:px-10 flex items-center">
            <div className="">
              <h1 className="text-primary-main lg:text-white font-semibold font-body text-xl lg:text-4xl mb-[18px]">
                Join Our Community
              </h1>
              <p className="text-sm leading-[29px] font-light text-dark lg:text-white mb-6">
                Join the gFlyer Community to enjoy exclusive benefits!
              </p>
            </div>
          </div>

          <div className="h-full">
            <form
              class="w-full max-w-lg px-6 py-5 lg:py-20"
              method="POST"
              action="https://greenafrica.us18.list-manage.com/subscribe/post?u=4d7476e759863fa778ec626a2&id=201d65e8c7"
              target="_blank"
            >
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div
                    className={`select__wrapper px-5 ${
                      formik.errors.MERGE1 && formik.touched.MERGE1
                        ? "!border-[#de0150]"
                        : ""
                    }`}
                  >
                    <p className="text-xs my-2">First Name</p>
                    <input
                      type="text"
                      placeholder=""
                      id="MERGE1"
                      name="MERGE1"
                      {...formik.getFieldProps("MERGE1")}
                      className="border-none pl-0 block w-full py-1"
                    />
                  </div>
                  {formik.touched.MERGE1 && formik.errors.MERGE1 && (
                    <span className="text-[#de0150] text-sm">
                      {formik.errors.MERGE1}
                    </span>
                  )}
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <div
                    className={`select__wrapper px-5 ${
                      formik.errors.MERGE2 && formik.touched.MERGE2
                        ? "!border-[#de0150]"
                        : ""
                    }`}
                  >
                    <p className="text-xs my-2">Last Name</p>
                    <input
                      type="text"
                      placeholder=""
                      id="MERGE2"
                      {...formik.getFieldProps("MERGE2")}
                      className="border-none pl-0 block w-full py-1"
                    />
                  </div>
                  {formik.touched.MERGE2 && formik.errors.MERGE2 && (
                    <span className="text-[#de0150] text-sm">
                      {formik.errors.MERGE2}
                    </span>
                  )}
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div
                    className={`select__wrapper px-5 ${
                      formik.errors.MERGE0 && formik.touched.MERGE0
                        ? "!border-[#de0150]"
                        : ""
                    }`}
                  >
                    <p className="text-xs my-2">Email Address</p>
                    <input
                      type="email"
                      placeholder=""
                      id="MERGE0"
                      {...formik.getFieldProps("MERGE0")}
                      className="border-none pl-0 block w-full py-1"
                    />
                  </div>
                  {formik.touched.MERGE0 && formik.errors.MERGE0 && (
                    <span className="text-[#de0150] text-sm">
                      {formik.errors.MERGE0}
                    </span>
                  )}{" "}
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <div className="select__wrapper px-5">
                    <p className="text-xs my-2">Phone Number</p>
                    <PhoneInput
                      country={"ng"}
                      className="w-full"
                      name="MERGE4"
                      id="MERGE4"
                      value={phone}
                      onChange={(phone) => setPhone(phone)}
                    />
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div
                    className={`select__wrapper px-5 ${
                      formik.errors.MERGE8 && formik.touched.MERGE8
                        ? "!border-[#de0150]"
                        : ""
                    }`}
                  >
                    <p className="text-xs text-uppercase my-2">Country</p>
                    <select
                      id="MERGE8"
                      {...formik.getFieldProps("MERGE8")}
                      className="border-none pl-0 block w-full"
                    >
                      <option disabled hidden></option>
                      <option value="Nigeria">Nigeria</option>
                    </select>
                  </div>
                  {formik.touched.MERGE8 && formik.errors.MERGE8 && (
                    <span className="text-[#de0150] text-sm">
                      {formik.errors.MERGE8}
                    </span>
                  )}{" "}
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <div
                    className={`select__wrapper px-5 ${
                      formik.errors.MERGE9 && formik.touched.MERGE9
                        ? "!border-[#de0150]"
                        : ""
                    }`}
                  >
                    <p className="text-xs text-uppercase my-2">MERGE9</p>
                    <select
                      id="MERGE9"
                      {...formik.getFieldProps("MERGE9")}
                      className="border-none pl-0 block w-full"
                    >
                      <option disabled hidden></option>
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                    </select>
                  </div>
                  {formik.touched.MERGE9 && formik.errors.MERGE9 && (
                    <span className="text-[#de0150] text-sm">
                      {formik.errors.MERGE9}
                    </span>
                  )}{" "}
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3 mb-6">
                  <label class="block">
                    <input
                      class={`${
                        formik.errors["group[38698][1]"] &&
                        formik.touched["group[38698][1]"]
                          ? "text-[#de0150]"
                          : ""
                      } mr-2 leading-tight`}
                      type="checkbox"
                      value={formik.values["group[38698][1]"] ? 1 : 0}
                      id="group_1"
                      {...formik.getFieldProps("group[38698][1]")}
                    />
                    <span class="text-sm font-light text-primary-main">
                      I agree to join the gFlyer Community by submitting my
                      details.
                    </span>
                  </label>{" "}
                  {formik.touched["group[38698][1]"] &&
                    formik.errors["group[38698][1]"] && (
                      <span className="text-[#de0150] text-sm">
                        {formik.errors["group[38698][1]"]}
                      </span>
                    )}
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <button
                    type="submit"
                    disabled={
                      formik.errors.firstName ||
                      formik.errors.lastName ||
                      formik.errors.email ||
                      formik.errors.consent ||
                      formik.errors.country ||
                      formik.errors.country ||
                      phone === ""
                    }
                    className="btn btn-primary w-[133px] font-semibold py-4 px-6"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </section>
    </Popup>
  );
};

export default HomePopup;
