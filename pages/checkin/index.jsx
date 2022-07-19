/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/flightcircle.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import ProfileIcon from "assets/svgs/profile.svg";
import CheckInCard from "components/Cards/checkin";
import IbeAdbar from "containers/IbeAdbar";

const CheckInDetails = () => {
  return (
    <BaseLayout>
      <section className="w-full checkin">
        <section className="flex">
          <div className="basis-[80%] flex flex-col greylike py-10 pl-28 pr-12">
            <div className="mb-8">
              <h2 className="text-black font-extrabold text-2xl mb-2">
                Check In
              </h2>
              <p>
                Kindly confirm that the information below is correct before
                checking in
              </p>
            </div>

            <section className="bg-white py-11 px-8 flex-col mb-8 rounded-md">
              <h3 className="title-text mb-[6px]">PASSENGER DETAILS</h3>
              <p className="font-body text-black text-xs mb-7">
                Kindly confirm that the information below is correct before
                checking in
              </p>
              <div className="grid grid-cols-3 gap-8">
                <CheckInCard />
                <CheckInCard />
                <CheckInCard />
              </div>
            </section>

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
                <p className="bg-primary-main text-green py-1 px-2  rounded-[4px] absolute left-6 top-[18px]">
                  gSaver
                </p>
                <div className="basis-full w-full flex flex-col min-h-[54px] px-6 mb-10">
                  <p className="tripType self-center">Direct Flight</p>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h5 className="font-extrabold font-header  text-2xl text-primary-main">
                        18:00
                      </h5>
                      <p className="font-semibold font-body text-sm text-black">
                        Lagos (LOS)
                      </p>
                    </div>
                    <div className="flex items-center basis-[70%] justify-between">
                      <DottedLine />
                      <AeroIcon />
                      <DottedLine />
                    </div>
                    <div className="flex flex-col  items-end">
                      <h5 className="font-extrabold font-header text-2xl text-primary-main">
                        19:35
                      </h5>
                      <p className="font-semibold font-body text-sm text-black">
                        Akure (AKR)
                      </p>
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
                      <button className="btn btn-outline">Edit</button>
                    </h5>
                  </div>
                  <div className="trip-details-item">
                    <h6>BAGGAGES</h6>
                    <h5 className="flex items-center">
                      <span>0</span>
                      <button className="btn btn-outline">Edit</button>
                    </h5>
                  </div>
                </div>
              </section>
              {/* Trip Itenary */}
              {/* Checkin Info*/}
              <section className="checkin__info mx-6 my-3">
                <p>
                  You added some new services so your fare has been updated with
                  additional fees
                </p>
              </section>
              {/* heckin Info*/}
              <div className="flex mx-6">
                <button className="btn btn-primary">Check In</button>
              </div>
            </section>
          </div>
          <div className="basis-[20%] bg-white px-6 py-8">
            <IbeAdbar />
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default CheckInDetails;
