/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/flightcircle.svg";
import AeroIcon from "assets/svgs/aero.svg";
import GreenCheck from "assets/svgs/green.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import ProfileIcon from "assets/svgs/profile.svg";
import CheckInCard from "components/Cards/checkin";
import IbeAdbar from "containers/IbeAdbar";

const CheckInDetails = () => {
  return (
    <BaseLayout>
      <section className="flex items-center justify-center bg-green px-3 py-3 pt-24 lg:pt-3">
        <p className="text-center">
          Boarding pass has been emailed to test@greenafrica.net
        </p>
      </section>
      <section className="w-full checkin">
        <section className="ga__section">
          <div className="ga__section__main">
            <div className="mb-8 mt-16 xlg:mt-0">
              <h2 className="text-black font-extrabold text-2xl mb-2">
                Check In
              </h2>
              <p>
                Kindly confirm that the information below is correct before
                checking in
              </p>
            </div>

            <section className="flex flex-col bg-white pb-24">
              {/* TripHeader */}
              <section className="ibe__flight__info__destination">
                <p>Booking Code: 9J78BG</p>
                {/* <figure className="absolute -left-6"> */}
                <figure className="flightCircle">
                  <FlightIcon />
                </figure>
              </section>
              {/* TripHeader*/}
              {/* Trip Itenary */}
              <div className="mx-6 mt-12 flex flex-col">
                <h3 className="title-text">PASSENGER DETAILS</h3>
                <div className="flex mb-6 mt-4">
                  <div className="flex flex-col w-[53px] mr-4">
                    <div className="bg-purple-light h-[50px] rounded-t-[3px] flex justify-center items-center">
                      <ProfileIcon />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-sm font-extrabold text-primary-main font-display mb-2">
                      Michael Johnson
                    </h5>
                    <h6 className="text-[12px] text-[#9692B8] font-title">
                      DOB: June 22, 1998
                    </h6>
                  </div>
                </div>
              </div>

              <div className="mx-6">
                <h3 className="title-text">DEPARTURE: JUNE 22, 2022</h3>
              </div>

              <section className="ibe__trip__item checkinView bordered mx-6 my-3">
                <p className="bg-primary-main text-green py-1 px-2  rounded-[4px] absolute left-6 top-3">
                  gSaver
                </p>
                <div className="basis-full lg:basis-[60%] w-full flex flex-col min-h-[54px] px-6 mb-10">
                  <p className="tripType self-center">Direct Flight</p>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h5 className="tripType">18:00</h5>
                      <p className="tripCity">Lagos (LOS)</p>
                    </div>
                    <div className="tripIconPath">
                      <DottedLine className="dotted-svg" />
                      <AeroIcon className="aero-svg" />
                      <DottedLine className="dotted-svg" />
                    </div>
                    <div className="flex flex-col  items-end">
                      <h5 className="tripType right-text">19:00</h5>
                      <p className="tripCity right-text">Abuja (ABJ)</p>
                    </div>
                  </div>
                  <p className="tripTime self-center">1h 35mins</p>
                </div>

                <div className="trip-details">
                  <div className="trip-details-item">
                    <h6>FLIGHT NUMBER</h6>
                    <h5>Q9 301</h5>
                  </div>
                  <div className="trip-details-item">
                    <h6>SEAT NUMBER</h6>
                    <h5 className="flex items-center">
                      <span>2A</span>
                    </h5>
                  </div>
                  <div className="trip-details-item">
                    <h6>BAGGAGES</h6>
                    <h5 className="flex items-center">
                      <span>0</span>
                    </h5>
                  </div>
                  <div className="trip-details-item">
                    <h6>MEALS</h6>
                    <h5 className="flex items-center">
                      <span>0</span>
                    </h5>
                  </div>
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between ml-auto">
                    <button className="btn btn-primary md:mr-1 basis-full md:basis-auto mb-3 md:mb-0">
                      Download Boarding Pass
                    </button>
                    <button className="btn btn-outline  basis-full md:basis-auto">
                      Email Boarding Pass
                    </button>
                  </div>
                </div>
              </section>
              {/* Trip Itenary */}
              {/* Checkin Info*/}
              <section className="flex items-center mx-6 my-3">
                <figure className="mr-1">
                  <GreenCheck />
                </figure>
                <p>You have been checked in successfully</p>
              </section>
              {/* Checkin Info*/}
            </section>
          </div>
          <div className="ga__section__side">
            <IbeAdbar />
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default CheckInDetails;
