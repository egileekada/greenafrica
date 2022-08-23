/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import ProfileIcon from "assets/svgs/profile.svg";
import CheckInCard from "components/Cards/checkin";
import IbeAdbar from "containers/IbeAdbar";

const CheckInDetails = () => {
  return (
    <BaseLayout>
      <section className="w-full checkin">
        <section className="ga__section">
          <div className="ga__section__main">
            <div className="mb-8 mt-16 xlg:mt-0">
              <h2 className="text-black font-bold text-2xl mb-2">
                Check In test page now
              </h2>
              <p>
                Kindly confirm that the information below is correct before
                checking in
              </p>
            </div>
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
