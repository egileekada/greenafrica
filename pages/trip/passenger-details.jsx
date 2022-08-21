/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import PassengerDetailsItem from "containers/PassengerDetails/PassengerDetailsItem";
import { useSelector, useDispatch } from "react-redux";
import {
  sessionSelector,
  FetchSSRAvailabilityForBooking,
} from "redux/reducers/session";
import Spinner from "components/Spinner";

const PassengerDetails = () => {
  const [selectedSSRs, setSSRs] = useState([]);
  const dispatch = useDispatch();
  const { sessionPassengers, SSRAvailabilityLoading, SSRAvailabilityResponse } =
    useSelector(sessionSelector);

  useEffect(() => {
    async function checkSSRAvailability() {
      dispatch(FetchSSRAvailabilityForBooking());
    }
    checkSSRAvailability();
  }, []);

  return (
    <BaseLayout>
      <section className="w-full">
        <section className="ga__section">
          <div className="ga__section__main">
            <h2 className="text-primary-main font-extrabold text-2xl mb-8">
              Additional Services
            </h2>

            {SSRAvailabilityLoading ? (
              <section className="flex flex-col">
                <Spinner />
              </section>
            ) : SSRAvailabilityResponse ? (
              <>
                <section className="flex flex-col">
                  {sessionPassengers ? (
                    sessionPassengers.length > 0 ? (
                      sessionPassengers.map((_passenger) => {
                        return (
                          <PassengerDetailsItem
                            passenger={_passenger}
                            selectedSSRs={selectedSSRs}
                            setSSRs={setSSRs}
                          />
                        );
                      })
                    ) : (
                      <p className="errorText">No Passengers List</p>
                    )
                  ) : (
                    <p className="errorText">No Passengers</p>
                  )}
                </section>

                {sessionPassengers && sessionPassengers.length > 0 && (
                  <section className="flex items-center flex-wrap md:flex-nowrap">
                    <button className="btn btn-outline mr-0 md:mr-4 mb-3 md:mb-0 basis-full md:basis-auto">
                      Go Back
                    </button>
                    <button className="btn btn-primary basis-full md:basis-auto">
                      Continue
                    </button>
                  </section>
                )}
              </>
            ) : (
              <p className="errorText text-2xl">No SSR Available</p>
            )}
          </div>
          <div className="ga__section__side">
            <IbeSidebar />
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default PassengerDetails;
