/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import { Checkbox, Switch } from "antd";
import CaretDown from "assets/svgs/caretdown.svg"

const PassengerForm = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onChanges = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <BaseLayout>
      {/* <section className="w-full px-3.5 py-24 lg:fit-x-bleed"> */}
      <section className="w-full">
        <section className="flex">
          <div className="basis-[75%] flex flex-col greylike py-10 pl-28 pr-12">
            <h2 className="text-primary-main font-extrabold text-2xl mb-8">
              Passenger Details
            </h2>

            <section className="passenger__form">
              {/* Passenger Details */}
              <div className="passenger__form__box">
                <h3 className="font font-header  text-xxs mb-4">ADULT</h3>

                <div className="mb-6 flex flex-wrap">
                  <div className="form-group select-group mr-4">
                    <label>TITLE</label>
                    <select>
                      <option>Select</option>
                      <option>Mrs</option>
                      <option>Ms</option>
                    </select>
                    <div className="select-icon">
                      <svg
                        width="8"
                        height="5"
                        viewBox="0 0 8 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.70117 1.29532L4.42839 4.03432L7.1556 1.29532"
                          stroke="#261F5E"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="form-group mr-4">
                    <label>FIRST NAME</label>
                    <input type="text" placeholder="Enter first name" />
                  </div>
                  <div className="form-group mr-4">
                    <label>LAST NAME</label>
                    <input type="text" placeholder="Enter last name" />
                  </div>
                  <div className="form-group">
                    <label>DATE OF BIRTH</label>
                    <input type="date" placeholder="Enter last name" />
                  </div>
                </div>

                <div className="flex items-center mb-7">
                  <Switch
                    defaultChecked
                    onChange={onChanges}
                    className="mr-6"
                  />
                  <p className="text-[#101010] font-display text-sm">
                    {" "}
                    Need Special Assistance?
                  </p>
                </div>

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
                        <span>Visually Impaired</span> - Customer requires full
                        assistance to aircraft and escort inflight
                      </label>
                    </Checkbox>
                  </div>
                  <div className="flex items-center mb-5">
                    <Checkbox onChange={onChange}>
                      <label className="check-label">
                        <span> Hearing Impaired </span> - Customer requires full
                        assistance to aircraft and escort inflight
                      </label>
                    </Checkbox>
                  </div>
                </div>
              </div>

              {/* Passenger Details */}
              {/* Contact Details */}
              <div className="passenger__form__box">
                <h3 className="text-[#8F8CA4] font-header text-xxs mb-6">
                  CONTACT INFORMATION
                </h3>

                <div className="flex items-center checkbox-copy mb-6">
                  <Checkbox onChange={onChange}>
                    <label className="check-label">
                      Copy Passenger Information
                    </label>
                  </Checkbox>
                </div>

                <div className="mb-6 flex flex-wrap">
                  <div className="form-group mr-4">
                    <label>FIRST NAME</label>
                    <input type="text" placeholder="Enter first name" />
                  </div>
                  <div className="form-group mr-4">
                    <label>LAST NAME</label>
                    <input type="text" placeholder="Enter last name" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" placeholder="Enter your email" />
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="flex items-center">
                <button className="btn btn-outline mr-2 cta">Go Back</button>
                <button className="btn btn-primary cta">Continue</button>
              </div>
            </section>
          </div>
          <div className="basis-[25%] bg-white px-6 py-8">
            <IbeSidebar />
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default PassengerForm;
