/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import { Checkbox, Switch } from "antd";
import SelectIcon from "assets/svgs/select.svg";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  sessionSelector,
  updatePassengersDetails,
  updateContactsDetails,
} from "redux/reducers/session";
import { useRouter } from "next/router";

const PassengerForm = () => {
  const [specialNeed, setSpecialNeed] = useState(false);
  const dispatch = useDispatch();
  const { passengersResponse, contactsResponse, updatePassengersLoading } =
    useSelector(sessionSelector);
  const router = useRouter();

  useEffect(() => {
    async function redirectToPayment() {
      if (passengersResponse && contactsResponse) {
        router.push("/trip/payment");
      }
    }
    redirectToPayment();
  }, [passengersResponse, contactsResponse]);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const specialChanged = (checked) => {
    setSpecialNeed(checked);
  };

  const onCopyChange = (e) => {
    if (e.target.checked) {
      formik.setFieldValue("c_title", formik.values.title);
      formik.setFieldValue("c_firstName", formik.values.firstName);
      formik.setFieldValue("c_lastName", formik.values.lastName);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("formik values", values);
    const passengerDetails = {
      title: values.title,
      firstName: values.firstName,
      lastName: values.lastName,
      dob: values.dob,
    };

    const contactInfo = {
      title: values.c_title,
      firstName: values.c_firstName,
      lastName: values.c_lastName,
      phone: String(values.c_phone),
      email: values.c_email,
    };

    dispatch(updatePassengersDetails(passengerDetails));
    dispatch(updateContactsDetails(contactInfo));
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      title: "",
      dob: "",

      c_code: "+234",
      c_title: "",
      c_firstName: "",
      c_lastName: "",
      c_email: "",
      cc_email: "",
      c_phone: "",
    },
    validationSchema: PassengerDetailsSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const enableCopy =
    formik.values.title.length > 0 &&
    formik.values.firstName.length > 0 &&
    formik.values.lastName.length > 0;

  return (
    <BaseLayout>
      <section className="w-full">
        <section className="ga__section">
          {/* <div className="basis-[75%] flex flex-col greylike py-10 pl-28 pr-12"> */}
          <div className="ga__section__main">
            <h2 className="text-primary-main font-extrabold text-2xl mb-8">
              Passenger Details
            </h2>

            <form
              className="passenger__form"
              onSubmit={formik.handleSubmit}
              id="form"
            >
              {/* Passenger Details */}
              <div className="passenger__form__box">
                <h3 className="font font-header font-bold text-xxs mb-4">
                  ADULT
                </h3>

                <div className="mb-6 flex flex-wrap">
                  <div className="form-group select-group mr-0 md:mr-4">
                    <label>TITLE</label>
                    <select
                      id="title"
                      name="title"
                      {...formik.getFieldProps("title")}
                    >
                      <option value="">Select</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Mr">Mr</option>
                    </select>
                    <div className="select-icon">
                      <SelectIcon />
                    </div>
                    {formik.touched.title && formik.errors.title ? (
                      <p className="errorText mt-2">{formik.errors.title}</p>
                    ) : null}
                  </div>

                  <div className="form-group mr-0 md:mr-4">
                    <label>FIRST NAME</label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      id="firstName"
                      name="firstName"
                      {...formik.getFieldProps("firstName")}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <p className="errorText mt-2">
                        {formik.errors.firstName}
                      </p>
                    ) : null}
                  </div>
                  <div className="form-group mr-0 md:mr-4">
                    <label>LAST NAME</label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      id="lastName"
                      name="lastName"
                      {...formik.getFieldProps("lastName")}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <p className="errorText mt-2">{formik.errors.lastName}</p>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label>DATE OF BIRTH</label>
                    <input
                      type="date"
                      placeholder="Enter last name"
                      id="dob"
                      name="dob"
                      {...formik.getFieldProps("dob")}
                    />
                    {formik.touched.dob && formik.errors.dob ? (
                      <p className="errorText mt-2">{formik.errors.dob}</p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center mb-7">
                  <Switch
                    value={specialNeed}
                    onChange={specialChanged}
                    className="mr-6"
                  />
                  <p className="text-[#101010] font-display text-sm">
                    {" "}
                    Need Special Assistance?
                  </p>
                </div>

                {specialNeed && (
                  <div className="flex flex-col">
                    <h6 className="text-[#8F8CA4] text-xxs font-header mb-4">
                      SPECIAL ASSISTANCE
                    </h6>
                    <div className="flex items-center mb-5">
                      <Checkbox onChange={onChange}>
                        <label className="check-label">
                          <span>Wheelchair</span> - Customer can climb stairs,
                          Walk to & from seat but unable to walk long distances,
                          Requires Assistance To and From The Aircraft.
                        </label>
                      </Checkbox>
                    </div>
                    <div className="flex items-center mb-5">
                      <Checkbox onChange={onChange}>
                        <label className="check-label">
                          <span>Visually Impaired</span> - Customer requires
                          full assistance to aircraft and escort inflight
                        </label>
                      </Checkbox>
                    </div>
                    <div className="flex items-center mb-5">
                      <Checkbox onChange={onChange}>
                        <label className="check-label">
                          <span> Hearing Impaired </span> - Customer requires
                          full assistance to aircraft and escort inflight
                        </label>
                      </Checkbox>
                    </div>
                  </div>
                )}
              </div>

              {/* Passenger Details */}
              {/* Contact Details */}
              <div className="passenger__form__box">
                <h3 className="text-[#8F8CA4] font-header text-xxs mb-6">
                  CONTACT INFORMATION {enableCopy ? "copy" : "can't copy"}
                </h3>

                <div
                  className={`flex items-center checkbox-copy mb-6  ${
                    enableCopy ? "" : "grey__out"
                  }`}
                >
                  <Checkbox onChange={onCopyChange}>
                    <label className="check-label">
                      Copy Passenger Information
                    </label>
                  </Checkbox>
                </div>

                <div className="mb-6 flex flex-wrap">
                  <div className="form-group select-group mr-0 md:mr-4">
                    <label>TITLE</label>
                    <select name="c_title" {...formik.getFieldProps("c_title")}>
                      <option value="">Select</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                    </select>
                    <div className="select-icon">
                      <SelectIcon />
                    </div>
                    {formik.touched.c_title && formik.errors.c_title ? (
                      <p className="errorText mt-2">{formik.errors.c_title}</p>
                    ) : null}
                  </div>

                  <div className="form-group md:mr-4">
                    <label>FIRST NAME</label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      id="c_firstName"
                      name="c_firstName"
                      {...formik.getFieldProps("c_firstName")}
                    />
                    {formik.touched.c_firstName && formik.errors.c_firstName ? (
                      <p className="errorText mt-2">
                        {formik.errors.c_firstName}
                      </p>
                    ) : null}
                  </div>
                  <div className="form-group md:mr-4">
                    <label>LAST NAME</label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      id="c_lastName"
                      name="c_lastName"
                      {...formik.getFieldProps("c_lastName")}
                    />
                    {formik.touched.c_lastName && formik.errors.c_lastName ? (
                      <p className="errorText mt-2">
                        {formik.errors.c_lastName}
                      </p>
                    ) : null}
                  </div>
                  <div className="form-group md:mr-4">
                    <label>EMAIL</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      id="c_email"
                      name="c_email"
                      {...formik.getFieldProps("c_email")}
                    />
                    {formik.touched.c_email && formik.errors.c_email ? (
                      <p className="errorText mt-2">{formik.errors.c_email}</p>
                    ) : null}
                  </div>
                  <div className="form-group md:mr-4">
                    <label>CONFIRM EMAIL ADDRESS</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      id="cc_email"
                      name="cc_email"
                      {...formik.getFieldProps("cc_email")}
                    />
                    {formik.touched.cc_email && formik.errors.cc_email ? (
                      <p className="errorText mt-2">{formik.errors.cc_email}</p>
                    ) : null}
                  </div>

                  <div className="phone-group  mr-0 md:mr-4">
                    <label>PHONE NUMBER</label>
                    <div className="flex">
                      <div className="phone-select">
                        <select
                          name="c_code"
                          {...formik.getFieldProps("c_code")}
                        >
                          <option value="+234">+234</option>
                        </select>
                        <div className="select-icon">
                          <SelectIcon />
                        </div>
                      </div>
                      <div className="phone-input">
                        <input
                          type="number"
                          placeholder="Enter your number"
                          id="c_phone"
                          name="c_phone"
                          {...formik.getFieldProps("c_phone")}
                        />
                      </div>
                    </div>
                    {formik.touched.c_phone && formik.errors.c_phone ? (
                      <p className="errorText mt-2">{formik.errors.c_phone}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="flex flex-wrap md:flex-nowrap items-center">
                <button className="btn btn-outline mr-0 md:mr-2 mb-2 md:mb-0 cta basis-full md:basis-auto">
                  Go Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary cta basis-full md:basis-auto"
                >
                  {updatePassengersLoading ? "Saving....." : "Continue"}
                </button>
              </div>
            </form>
          </div>
          <div className="ga__section__side">
            <IbeSidebar />
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default PassengerForm;

const PassengerDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required("Firstname is Required"),
  lastName: Yup.string().required("Lastname is Required"),
  title: Yup.string().required(" Title is Required"),
  dob: Yup.date()
    .max(new Date(), "Date can't be later than today")
    .typeError("You must specify a valid date")
    .required("Date of Birth is required"),

  c_code: Yup.string().required("Country Code is Required"),
  c_title: Yup.string().required("Title is Required"),
  c_firstName: Yup.string().required("Firstname is Required"),
  c_lastName: Yup.string().required("Lastname is Required"),
  c_email: Yup.string()
    .email("Invalid email format")
    .required("Email is Required"),
  cc_email: Yup.string()
    .email("Invalid email format")
    .oneOf([Yup.ref("c_email"), null], "Emails must match")
    .required("Confirm Email is Required"),
  c_phone: Yup.number()
    .typeError("Please Input a valid phone number")
    .required("Phone is Required"),
});
