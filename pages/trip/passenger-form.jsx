/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  sessionSelector,
  updatePassengersDetails,
  updateContactsDetails,
  FetchStateFromServer,
} from "redux/reducers/session";
import { useRouter } from "next/router";
import { Checkbox, notification } from "antd";
import SelectIcon from "assets/svgs/select.svg";
import PassengerFormItem from "containers/PassengerForm/PassengerFormItem";
import LogoIcon from "assets/svgs/logo.svg";
import { useGetSalutationsQuery } from "services/widgetApi.js";

const PassengerForm = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetSalutationsQuery();
  const [totalPassengerCount, setCount] = useState(0);
  const [errorIds, setErrorIds] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const {
    passengersResponse,
    contactsResponse,
    updatePassengersLoading,
    flightParams,
  } = useSelector(sessionSelector);
  const router = useRouter();

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    ScrollToTop();
  }, []);

  useEffect(() => {
    async function sumPassengerCount() {
      if (flightParams) {
        const ADTS = new Array(parseInt(flightParams?.ADT)).fill("ADT");
        const CHDS = new Array(parseInt(flightParams?.CHD)).fill("CHD");
        const INFS = new Array(parseInt(flightParams?.INF)).fill("INF");

        const ALL_TYPES = [...ADTS, ...CHDS, ...INFS];

        const _totalPassengerCount =
          parseInt(flightParams?.ADT) +
          parseInt(flightParams?.CHD) +
          parseInt(flightParams?.INF);

        setCount(_totalPassengerCount);
        const _Passengers = [];

        new Array(_totalPassengerCount).fill(0).map(() => {
          let currType = ALL_TYPES.shift();
          if (_Passengers.length > 0) {
            let newID = parseInt(_Passengers[_Passengers.length - 1].id) + 1;
            let prevType = _Passengers[_Passengers.length - 1].type;
            let prevCount = parseInt(
              _Passengers[_Passengers.length - 1].typeCount
            );
            _Passengers.push({
              id: newID,
              firstName: "",
              lastName: "",
              title: "",
              dob: "",
              type: currType,
              typeCount: currType === prevType ? prevCount + 1 : 1,
            });
          } else {
            _Passengers.push({
              id: 0,
              firstName: "",
              lastName: "",
              title: "",
              dob: "",
              type: currType,
              typeCount: 1,
            });
          }
        });

        setPassengers([..._Passengers]);
      } else {
        router.push("/");
      }
    }
    sumPassengerCount();
  }, []);
  // TODO watch for this
  useEffect(() => {
    async function redirectToSSR() {
      if (passengersResponse && contactsResponse) {
        router.push("/trip/passenger-details");
      }
    }
    redirectToSSR();
  }, [passengersResponse, contactsResponse]);

  useEffect(() => {
    async function fetchStateInfo() {
      dispatch(FetchStateFromServer());
    }
    fetchStateInfo();
  }, []);

  const handleSubmit = async (values) => {
    const contactInfo = {
      title: values.c_title,
      firstName: values.c_firstName,
      lastName: values.c_lastName,
      phone: String(values.c_phone),
      email: values.c_email,
    };

    let _formIsInValid = false;
    passengers.map((_pax) => {
      for (const key in _pax) {
        if (_pax[key].length < 1) {
          _formIsInValid = true;
        }
      }
    });

    passengers.map((_pax) => {
      if (_pax?.type === "CHD" || _pax?.type === "INF") {
        if (_pax?.dob?.length < 1) {
          setErrorIds([...errorIds, _pax?.id]);
          _formIsInValid = true;
        }
      } else {
        if (_pax?.dob?.length < 1) {
          console.log("rreached here,", _pax?.type);
          _formIsInValid = false;
        }
      }
    });

    if (_formIsInValid) {
      notification.error({
        message: "Error",
        description:
          "Incomplete details, Please check through your form and fill-in appropriate details",
      });
    } else {
      console.log("disaptching");

      dispatch(updatePassengersDetails(passengers));
      dispatch(updateContactsDetails(contactInfo));
    }
  };

  const formik = useFormik({
    initialValues: {
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

  const onCopyChange = (e) => {
    if (e.target.checked) {
      formik.setFieldValue("c_title", passengers[0].title);
      formik.setFieldValue("c_firstName", passengers[0].firstName);
      formik.setFieldValue("c_lastName", passengers[0].lastName);
    }
  };

  const checkPassInfo = (obj) => {
    return (
      obj.title &&
      obj.title.length &&
      obj.firstName &&
      obj.firstName.length &&
      obj.lastName &&
      obj.lastName.length
    );
  };

  const goBackToHome = async () => {
    const query = `/?origin=${flightParams?.departureStation}&destination=${flightParams?.arrivalStation}&departure=${flightParams?.beginDate}&adt=${flightParams?.ADT}&chd=${flightParams?.CHD}&inf=${flightParams?.INF}`;
    router.push(query);
  };

  const enableCopy =
    passengers.length > 0 && checkPassInfo(passengers[0]) ? true : false;

  return (
    <BaseLayout>
      <nav className="top__bar logo-holder">
        {/* <button>
            <figure>
              <BackIcon />
            </figure>
            <span>SELECT FLIGHT</span>
          </button> */}
        <button onClick={goBackToHome}>
          <figure className="cursor-pointer">
            <LogoIcon />
          </figure>
        </button>
      </nav>
      <section className="w-full">
        <section className="ga__section">
          <div className="ga__section__main">
            <section className="pt-16 lg:pt-0">
              <h2 className="text-primary-main font-extrabold text-2xl mb-8">
                Passenger Details
              </h2>
              {totalPassengerCount > 0 ? (
                <form
                  className="passenger__form"
                  onSubmit={formik.handleSubmit}
                >
                  {/* <p>{JSON.stringify(passengers)}</p>
                  <p>{JSON.stringify(errorIds)}</p> */}
                  {passengers
                    .sort((a, b) => {
                      return a.id - b.id;
                    })
                    .map((_pass, _i) => {
                      return (
                        <PassengerFormItem
                          passenger={_pass}
                          passengers={passengers}
                          setPassengers={setPassengers}
                          errorIds={errorIds}
                          setErrorIds={setErrorIds}
                          salutations={!isLoading ? data?.data.items : []}
                        />
                      );
                    })}

                  {/* Contact Details */}
                  <div className="passenger__form__box">
                    <h3 className="text-[#8F8CA4] font-header text-xxs mb-6">
                      CONTACT INFORMATION
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
                      <div className="form-group select-group  mr-0 md:mr-4">
                        <label>TITLE</label>
                        <select
                          name="c_title"
                          {...formik.getFieldProps("c_title")}
                        >
                          <option value="">Select</option>
                          {!isLoading &&
                            data?.data.items.map((salutation, index) => (
                              <option value={salutation.title} key={index}>
                                {salutation.title}
                              </option>
                            ))}
                        </select>
                        <div className="select-icon">
                          <SelectIcon />
                        </div>
                        {formik.touched.c_title && formik.errors.c_title ? (
                          <p className="errorText mt-2">
                            {formik.errors.c_title}
                          </p>
                        ) : null}
                      </div>

                      <div className="form-group flex-grow md:mr-4">
                        <label>FIRST NAME</label>
                        <input
                          type="text"
                          placeholder="Enter first name"
                          id="c_firstName"
                          name="c_firstName"
                          {...formik.getFieldProps("c_firstName")}
                        />
                        {formik.touched.c_firstName &&
                        formik.errors.c_firstName ? (
                          <p className="errorText mt-2">
                            {formik.errors.c_firstName}
                          </p>
                        ) : null}
                      </div>
                      <div className="form-group flex-grow md:mr-4">
                        <label>LAST NAME</label>
                        <input
                          type="text"
                          placeholder="Enter last name"
                          id="c_lastName"
                          name="c_lastName"
                          {...formik.getFieldProps("c_lastName")}
                        />
                        {formik.touched.c_lastName &&
                        formik.errors.c_lastName ? (
                          <p className="errorText mt-2">
                            {formik.errors.c_lastName}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mb-6 flex flex-wrap">
                      <div className="phone-group flex-grow mr-0 md:mr-4">
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
                              type="tel"
                              pattern="[0-9]*"
                              id="c_phone"
                              name="c_phone"
                              placeholder="9056789087"
                              {...formik.getFieldProps("c_phone")}
                              onChange={(e) => {
                                e.preventDefault();
                                const { value } = e.target;
                                if (value.length > 0) {
                                  const regex =
                                    /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
                                  if (regex.test(value.toString())) {
                                    formik.setFieldValue("c_phone", value);
                                  }
                                } else {
                                  formik.setFieldValue("c_phone", "");
                                }
                              }}
                            />
                          </div>
                        </div>
                        {formik.touched.c_phone && formik.errors.c_phone ? (
                          <p className="errorText mt-2">
                            {formik.errors.c_phone}
                          </p>
                        ) : null}
                      </div>
                      <div className="form-group flex-grow md:mr-4">
                        <label>EMAIL</label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          id="c_email"
                          name="c_email"
                          {...formik.getFieldProps("c_email")}
                        />
                        {formik.touched.c_email && formik.errors.c_email ? (
                          <p className="errorText mt-2">
                            {formik.errors.c_email}
                          </p>
                        ) : null}
                      </div>
                      <div className="form-group flex-grow md:mr-4">
                        <label>CONFIRM EMAIL ADDRESS</label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          id="cc_email"
                          name="cc_email"
                          {...formik.getFieldProps("cc_email")}
                        />
                        {formik.touched.cc_email && formik.errors.cc_email ? (
                          <p className="errorText mt-2">
                            {formik.errors.cc_email}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {/* Contact Details */}
                  {/* CTA */}
                  <div className="flex flex-wrap md:flex-nowrap items-center">
                    <button
                      type="button"
                      className="btn btn-outline mr-0 md:mr-2 mb-2 md:mb-0 cta basis-full md:basis-auto mobile-order"
                      onClick={() => router.back()}
                    >
                      Go Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary cta basis-full md:basis-auto"
                    >
                      {updatePassengersLoading ? "Saving....." : "Continue"}
                    </button>
                  </div>
                  {/* CTA */}
                </form>
              ) : null}
            </section>
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
    .required("Phone is Required")
    .test("len", "Must be a minimum 11 characters", (val) => {
      if (val) return val.toString().length >= 10;
    }),
});
