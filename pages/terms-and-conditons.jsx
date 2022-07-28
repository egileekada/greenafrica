/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import TermsCard from "components/Cards/terms";

const PassengerDetails = () => {
  return (
    <BaseLayout>
      <section className="w-full">
        <section className="ga__section bg-normal">
          <div className="ga__section__main standalone">
            <div className="flex flex-col">
              <h2 className="text-primary-main font-extrabold text-2xl mb-3">
                Agree to Check In Terms & Conditions
              </h2>

              <p className="font-body text-sm ">
                Please note that the following items are prohibited
              </p>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <TermsCard />
                <TermsCard />
                <TermsCard />
              </section>

              {/* CTA */}
              <section className="flex flex-wrap md:flex-nowrap items-center my-4">
                <button className="basis-full md:basis-[30%] tab:basis-[20%] btn btn-outline mr-0 md:mr-2 mb-4 md:mb-0">
                  Go Back
                </button>
                <button className="basis-full md:basis-[30%] tab:basis-[20%] btn btn-primary mr-2 md:mr-2">
                  Accept Terms
                </button>
              </section>
              {/* CTA */}
            </div>
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default PassengerDetails;
