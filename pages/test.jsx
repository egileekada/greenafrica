/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import IbeAdbar from "containers/IbeAdbar";

const TestPage = () => {
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
