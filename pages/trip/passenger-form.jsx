/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import { Checkbox, Switch } from "antd";
import SelectIcon  from "assets/svgs/select.svg";

const PassengerForm = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onChanges = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <BaseLayout>
      <section className="w-full">
        <section className="ga__section">
          {/* <div className="basis-[75%] flex flex-col greylike py-10 pl-28 pr-12"> */}
          <div className="ga__section__main">
            <h2 className="text-primary-main font-extrabold text-2xl mb-8">
              Passenger Details
            </h2>

            <section className="passenger__form">
              {/* Passenger Details */}
              <div className="passenger__form__box">
                <h3 className="font font-header  text-xxs mb-4">ADULT</h3>

                <div className="mb-6 flex flex-wrap">
                  <div className="form-group select-group mr-0 md:mr-4">
                    <label>TITLE</label>
                    <select>
                      <option>Select</option>
                      <option>Mrs</option>
                      <option>Ms</option>
                    </select>
                    <div className="select-icon">
                      <SelectIcon />
                    </div>
                  </div>

                  <div className="form-group mr-0 md:mr-4">
                    <label>FIRST NAME</label>
                    <input type="text" placeholder="Enter first name" />
                  </div>
                  <div className="form-group mr-0 md:mr-4">
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
                  <div className="form-group md:mr-4">
                    <label>FIRST NAME</label>
                    <input type="text" placeholder="Enter first name" />
                  </div>
                  <div className="form-group md:mr-4">
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
              <div className="flex flex-wrap md:flex-nowrap items-center">
                <button className="btn btn-outline mr-2 md:mr-0 mb-2 md:mb-0 cta basis-full md:basis-auto">
                  Go Back
                </button>
                <button className="btn btn-primary cta basis-full md:basis-auto">
                  Continue
                </button>
              </div>
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
